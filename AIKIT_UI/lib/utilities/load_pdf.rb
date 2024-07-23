
################################################################################ 
# Author: Darrell O. Ricke, Ph.D.  (email: Darrell.Ricke@ll.mit.edu) 
# 
# RAMS request ID 1028809 
# RAMS title: Artificial Intelligence tools for Knowledge-Intensive Tasks (AIKIT) 
#
# DISTRIBUTION STATEMENT A. Approved for public release. Distribution is unlimited.
#
# This material is based upon work supported by the Department of the Air Force 
# under Air Force Contract No. FA8702-15-D-0001. Any opinions, findings, 
# conclusions or recommendations expressed in this material are those of the 
# author(s) and do not necessarily reflect the views of the Department of the Air Force.
#
# Copyright © 2024 Massachusetts Institute of Technology.
#
# Subject to FAR52.227-11 Patent Rights - Ownership by the contractor (May 2014)
#
# The software/firmware is provided to you on an As-Is basis
#
# Delivered to the U.S. Government with Unlimited Rights, as defined in DFARS 
# Part 252.227-7013 or 7014 (Feb 2014). Notwithstanding any copyright notice, 
# U.S. Government rights in this work are defined by DFARS 252.227-7013 or 
# DFARS 252.227-7014 as detailed above. Use of this work other than as 
# specifically authorized by the U.S. Government may violate any copyrights 
# that exist in this work.
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, version 2 of the License.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
################################################################################

require 'input_file.rb'

###############################################################################
def folder_setup()
  # Setup up the US Air Force user and group
  user = User.where(user_name: "USAF").take
  user = User.create(user_sid: "usaf", user_name: "USAF") if user.nil?

  group = Group.where(group_name: "USAF").take
  group = Group.create(parent_id: nil, group_name: "USAF") if group.nil?

  user_group = UserGroup.where(user_id: user.id, group_id: group.id).take
  user_group = UserGroup.create(user_id: user.id, group_id: group.id, user_role: "Owner") if user_group.nil?

  # Check for top level folder.
  top_folder = Folder.where(folder_name: "/").take
  top_folder = Folder.create(parent_id: nil, user_id: user.id, group_id: group.id, folder_name: "/", folder_level: 1, is_public: true, group_write: true, updated_at: Time::now) if top_folder.nil?

  folder = Folder.where(folder_name: "docs", user_id: user.id).take
  folder = Folder.create(parent_id: top_folder.id, user_id: user.id, group_id: group.id, folder_name: "docs", folder_level: 2, is_public: true, group_write: false, updated_at: Time::now) if folder.nil?

  return folder, user.id
end  # folder_setup

###############################################################################
# main method.
def load_pdf_main
  if ARGV.length >= 1
    pdfname = ARGV[0]
    txtname = Tools::clean_field( pdfname.sub(".pdf", ".txt") )
    totxt = "java -jar pdfbox-app-3.0.2.jar export:text -alwaysNext -encoding=UTF-8 -i=#{pdfname} -o=#{txtname}"
    `#{totxt}`
    puts "CMD: #{totxt}"

    # Read in the PDF file.
    pdffile = File.open(pdfname, "rb")
    pdfdata = pdffile.read
    pdffile.close

    # Read in the PDF text file.
    txtfile = InputFile.new(txtname)
    txtfile.open_file
    contents_ascii = txtfile.read_file
    txtfile.close_file

    pdf_name = Tools::clean_field( pdfname )
    if pdf_name.size > 120
      pdf_name = Tools::clip( pdf_name, 115) + ".pdf"
    end  # if

    folder, user_id = folder_setup()

    old_doc = Document.where(user_id: user_id, filename: pdfname).take
    if ! old_doc.nil?
      old_doc.is_current = false
      old_doc.save
    end  # if

    new_doc = Document.new
    new_doc.folder_id = folder.id
    new_doc.previous_id = old_doc.id if ! old_doc.nil?
    new_doc.user_id = user_id
    new_doc.filename = pdfname
    new_doc.file_type = "PDF"
    new_doc.document_type = "PDF"
    new_doc.content_type = "application/pdf"
    new_doc.is_parsed = true
    new_doc.is_public = true
    new_doc.contents_bytes = pdfdata.size
    new_doc.contents = pdfdata
    new_doc.contents_ascii = contents_ascii
    # new_doc.is_current = true
    # new_doc.updated_at = Time::now
    new_doc.save
  else
    puts "rails runner load_pdf.rb <PDF file>"
  end  # if
end  # method load_pdf_main

###############################################################################
load_pdf_main()

