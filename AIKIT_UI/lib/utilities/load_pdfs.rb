
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
MIME_TYPES = {".csv" => "text/csv",
    ".doc" => "application/msword",
    ".docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".gz" => "application/gzip",
    ".htm" => "text/html",
    ".html" => "text/html",
    ".ppt" => "application/vnd.ms-powerpoint",
    ".pptx" => "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ".rtf" => "application/rtf",
    ".tar" => "application/x-tar",
    ".xhtml" => "application/xhtml+xml",
    ".xls" => "application/vnd.ms-excel",
    ".xlsx" => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ".zip" => "application/zip" }

TEXT_TYPES = {".csv" => true, ".htm" => true, ".html" => true, ".rtf" => true, ".xhtml" => true}

###############################################################################
def folder_setup()
  # Setup up the US Air Force user and group
  user = User.where(user_name: "MITLL").take

  group = Group.where(group_name: "MITLL").take
  group = Group.create(parent_id: nil, group_name: "MITLL") if group.nil?

  user_group = UserGroup.where(user_id: user.id, group_id: group.id).take
  user_group = UserGroup.create(user_id: user.id, group_id: group.id, user_role: "Owner") if user_group.nil?

  # Check for top level folder.
  top_folder = Folder.where(folder_name: "/").take
  top_folder = Folder.create(parent_id: nil, user_id: user.id, group_id: group.id, path_name: "", folder_name: "/", folder_level: 1, is_public: true, group_write: true, updated_at: Time::now) if top_folder.nil?

  return folder, user.id
end  # folder_setup

###############################################################################
def load_file( user_id, folder_id, file_path, filename )
  if filename.end_with?( ".pdf" )
    doc_id = load_pdf( user_id, folder_id, file_path, filename )
  else
    doc_id = load_other( user_id, folder_id, file_path, filename )
  end  # if

  # Copy the file to public for viewing
  dup_file( file_path, filename, doc_id )
end  # load_file

###############################################################################
def dup_file( file_path, filename, doc_id )
  tokens = filename.split( "." )
  extension = tokens[-1]
  source_name = File.join(file_path, filename)
  datafile = InputFile.new( source_name )
  datafile.open_file
  contents = datafile.read_binary
  datafile.close_file

  # Write out the file in the public folder
  clean_name = Tools::clean_name( filename )
  docname = "public/doc#{doc_id}_#{clean_name}"
  outfile = OutputFile.new( docname )
  outfile.open_file()
  outfile.zap( contents )
  outfile.close_file()
end  # dup_file

###############################################################################
def load_pdf( user_id, folder_id, pdf_path, filename )
  puts "#{pdf_path}/#{filename}"

  pdfname = File.join(pdf_path, filename)
  # txtname = Tools::clean_field( filename.sub(".pdf", ".txt") )
  # txtpath = File.join(pdf_path, txtname)
  # totxt = "java -jar pdfbox-app-3.0.2.jar export:text -alwaysNext -encoding=UTF-8 -i=#{pdfname} -o=#{txtpath}"
  # `#{totxt}`
  # puts "CMD: #{# totxt}"

  # Read in the PDF file.
  pdfname = File.join(pdf_path, filename)
  pdffile = File.open(pdfname, "rb")
  pdfdata = pdffile.read
  pdffile.close

  # Read in the PDF text file.
  # txtfile = InputFile.new(txtpath)
  # txtfile.open_file
  # contents_ascii = txtfile.read_file
  # txtfile.close_file

  pdf_name = Tools::clean_field( filename )
  if pdf_name.size > 120
    pdf_name = Tools::clip( pdf_name, 115) + ".pdf"
  end  # if

  old_doc = Document.where(user_id: user_id, filename: filename).take
  if ! old_doc.nil?
    old_doc.is_current = false
    old_doc.save
  end  # if

  new_doc = Document.new
  new_doc.folder_id = folder_id
  new_doc.previous_id = old_doc.id if ! old_doc.nil?
  new_doc.user_id = user_id
  new_doc.filename = filename
  new_doc.file_type = "PDF"
  new_doc.document_type = "PDF"
  new_doc.content_type = "application/pdf"
  new_doc.is_parsed = true
  new_doc.is_public = true
  new_doc.contents_bytes = pdfdata.size
  # new_doc.contents = pdfdata
  new_doc.contents = ""
  # new_doc.contents_ascii = contents_ascii
  new_doc.contents_ascii = ""
  # new_doc.is_current = true
  # new_doc.updated_at = Time::now
  new_doc.save

  return new_doc.id
end  # method load_pdf

###############################################################################
def content_type( filename )
  MIME_TYPES.each do |k, v|
    return v, k if filename.end_with?( k )
  end  # do

  return "", ""
end  #  content_type

###############################################################################
def load_other( user_id, folder_id, pathfile, filename )
  puts "#{pathfile} :: #{filename}"

  txtname = Tools::clean_field( filename.sub(".file", ".txt") )

  # Read in the file.
  filepath = File.join(pathfile, filename)
  filefile = File.open(filepath, "rb")
  filedata = filefile.read
  filefile.close

  content_type, file_type = content_type( filename )

  file_name = Tools::clean_field( filename )
  if file_name.size > 120
    file_name = Tools::clip( file_name, 115) + ".file"
  end  # if

  # Check for a previous version of this filename
  old_doc = Document.where(user_id: user_id, filename: filename).take
  if ! old_doc.nil?
    old_doc.is_current = false
    old_doc.save
  end  # if

  new_doc = Document.new
  new_doc.folder_id = folder_id
  new_doc.previous_id = old_doc.id if ! old_doc.nil?
  new_doc.user_id = user_id
  new_doc.filename = filename
  if file_type.length > 0
    new_doc.file_type = file_type[1..-1]
    new_doc.document_type = file_type[1..-1]
  end  # if
  new_doc.content_type = content_type
  new_doc.is_parsed = true
  new_doc.is_public = true
  new_doc.contents_bytes = filedata.size
  # new_doc.contents = filedata
  new_doc.contents = ""

  # Check for text file
  if TEXT_TYPES[ file_type ]
    # Read in the text file.
    txtpath = File.join(pathfile, txtname)
    txtfile = InputFile.new(txtpath)
    txtfile.open_file
    contents_ascii = txtfile.read_file
    txtfile.close_file
    # new_doc.contents_ascii = contents_ascii
    new_doc.contents_ascii = ""
  end  # if
 
  # new_doc.is_current = true
  # new_doc.updated_at = Time::now
  new_doc.save
  return new_doc.id
end  # method load_other

###############################################################################
def find_or_create( user_id, parent_folder_id, folder_name, folder_level, path_name )
  folder = Folder.where( parent_id: parent_folder_id, folder_name: folder_name ).take
  if folder.nil?
    folder = Folder.create
    folder.parent_id = parent_folder_id
    folder.user_id = user_id
    folder.path_name = path_name
    folder.folder_name = folder_name
    folder.folder_level = folder_level 
    folder.is_public = true
    folder.group_write = true
    folder.updated_at = Time::now
    folder.save
    # puts "Level: #{folder_level}, Folder: #{folder_name}"
  end  # if
  return folder.id
end  # find_or_create

###############################################################################
def load_dir( user_id, parent_folder_id, dir_path, start, folder_level )
  Dir.foreach( start ) do |x|
    path = File.join(start, x)
    if x == "." or x == ".." or x == ".DS_Store"
      next
    elsif File.directory?(path)
      # puts "Dir:: " + path + "/"
      folder_id = find_or_create( user_id, parent_folder_id, x, folder_level+1, dir_path )
      sub_dir_path = dir_path + "/" + x
      load_dir( user_id, folder_id, sub_dir_path, path, folder_level+1 )
    else
      load_file( user_id, parent_folder_id, start, x )
      # puts "#{dir_path} :: #{x}"
    end  # if
  end  # foreach
end  # load_dir

###############################################################################
def load_pdfs_main()
  user_sid = ARGV[0]
  user = User.where( user_sid: user_sid ).take
  if user.nil?
    puts "*Warning* unknown user name #{user_sid}"
    return
  end  # if

  folder_name = ARGV[1]
  folder_level = 0
  parent_folder_id = find_or_create( user.id, nil, "/", folder_level, "" )
  folder_level += 1
  top_folder_id = find_or_create( user.id, parent_folder_id, folder_name, folder_level, "/" )
  load_dir( user.id, top_folder_id, "/#{folder_name}", folder_name, folder_level )
end  # load_pdfs_main

###############################################################################
load_pdfs_main()
