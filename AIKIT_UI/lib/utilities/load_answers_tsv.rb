
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

require 'date'
require 'input_file.rb'

###############################################################################
def parse_contents( contents, test_set_id )
  lines = contents.split( "\n" )
  lines.each do |line|
    tokens = line.split( "\t" )
    
    # Skip the header line.
    if tokens[0] != "Question"
      test_question = TestQuestion.where( question_number: tokens[0], test_set_id: test_set_id ).take
      if ! test_question.nil?
        test_question.answer_option = tokens[1].chomp
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
def load_answers_main
  if ARGV.length >= 2
    answers_name = ARGV[0]
    mqf_name = ARGV[1]

    test_set = TestSet.where( mqf_name: mqf_name ).take
    if test_set.nil?
      puts "*Warning* unknown test MQF name: '#{mqf_name}'"
      return
    end  # if

    contents = Tools::clean_field( read_text_file( answers_name ) )
    parse_contents( contents, test_set.id )
  else
    puts "rails runner load_answers_tsv.rb <answers TSV file> <Test MQF name>"
  end  # if
end  # method load_answers_main

###############################################################################
load_answers_main()

