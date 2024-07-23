
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
    ".gif" => "image/gif",
    ".gz" => "application/gzip",
    ".htm" => "text/html",
    ".html" => "text/html",
    ".jpeg" => "image/jpeg",
    ".jpg" => "image/jpeg",
    ".json" => "application/json",
    ".png"  => "image/png",
    ".ppt" => "application/vnd.ms-powerpoint",
    ".pptx" => "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ".rtf" => "application/rtf",
    ".tar" => "application/x-tar",
    ".tif" => "image/tiff", 
    ".tiff" => "image/tiff", 
    ".xhtml" => "application/xhtml+xml",
    ".xls" => "application/vnd.ms-excel",
    ".xlsx" => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ".xml" => "application/xml",
    ".zip" => "application/zip",
    ".7z" => "application/x-7z-compressed" }

TEXT_TYPES = {".csv" => true, ".htm" => true, ".html" => true, ".rtf" => true, ".xhtml" => true}

###############################################################################
def content_type( filename )
  MIME_TYPES.each do |k, v|
    return v, k if filename.end_with?( k )
  end  # do

  return "", ""
end  #  content_type

###############################################################################
def load_image( filename, test_set_id, legend )
  # Read in the file.
  filefile = File.open(filename, "rb")
  filedata = filefile.read
  filefile.close

  content_type, file_type = content_type( filename )
  file_name = Tools::clean_field( filename )

  image = Image.new
  image.test_set_id = test_set_id
  image.image_type = content_type
  image.legend = legend
  image.image_bytes = filedata.size
  image.image_data = filedata
  image.updated_at = Time::now
  image.save

  return image.id
end  # method load_image

###############################################################################
def parse_contents( contents, test_set_id )
  lines = contents.split( "\n" )
  lines.each do |line|
    tokens = line.split( "\t" )

    # Skip the header line.
    if tokens[0] != "Question"
      test_question = TestQuestion.where( question_number: tokens[0], test_set_id: test_set_id ).take
      if ! test_question.nil?
        legend = tokens[1].chomp
        test_question.image_text = legend
        test_question.image_id = load_image( tokens[2].chomp, test_set_id, legend )
        test_question.save
      end  # if
    end  # if
  end  # do
end  # parse_contents

###############################################################################
def read_text_file( filename )
  text_file = InputFile.new(filename)
  text_file.open_file
  contents = text_file.read_file
  text_file.close_file

  return contents
end  # read_text_file

###############################################################################
def load_figures_main()
  if ARGV.length >= 2
    figures_name = ARGV[0]
    mqf_name = ARGV[1]

    test_set = TestSet.where( mqf_name: mqf_name ).take
    if test_set.nil?
      puts "*Warning* unknown test MQF name: '#{mqf_name}'"
      return
    end  # if

    contents = Tools::clean_field( read_text_file( figures_name ) )
    parse_contents( contents, test_set.id )
  else
    puts "rails runner load_figures.rb <figures TSV file> <Test MQF name>"
  end  # if
end  # load_figures_main

###############################################################################
load_figures_main()
