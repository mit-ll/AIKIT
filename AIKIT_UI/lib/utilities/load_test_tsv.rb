
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
def lookup_or_create_topic( topic, topics, test_set_id )
  return nil, topics if topic.nil?

  # Seen already?
  x = topics[ topic ]
  return x.id, topics if ! x.nil?

  # Add this topic to the database.
  x = Topic.new
  x.topic_text = topic
  x.test_set_id = test_set_id
  x.save

  topics[ topic ] = x
  return x.id, topics
end  # lookup_or_create_topic

###############################################################################
def parse_contents( contents, test_set, document )
  lines = contents.split( "\n" )
  previous_id = nil
  previous_tq = nil
  first_tq = nil
  topics = {}
  lines.each do |line|
    tokens = line.split( "\t" )
    # Skip the header line.
    if tokens[0] != "num"
      test_question = TestQuestion.where( test_set_id: test_set.id, question: tokens[0] ).take
      test_question = TestQuestion.new if test_question.nil?
      test_question.test_set_id = test_set.id
      test_question.document_id = document.id
      test_question.previous_id = previous_id
      test_question.next_id = nil
      test_question.question_number = tokens[0]
      test_question.question = tokens[1]
      test_question.reference = tokens[2]
      test_question.paragraph = tokens[3]
      test_question.option_a = tokens[4]
      test_question.option_b = tokens[5] if ! tokens[5].nil?
      test_question.option_c = tokens[6] if ! tokens[6].nil?
      test_question.option_d = tokens[7] if ! tokens[7].nil?
      test_question.option_e = tokens[8] if ! tokens[8].nil?
      topic = tokens[9] if ! tokens[9].nil?
      test_question.topic_id, topics = lookup_or_create_topic( topic, topics, test_set.id )
      test_question.save

      if ! previous_tq.nil?
        previous_tq.next_id = test_question.id
        previous_tq.save
      end  # if

      previous_id = test_question.id
      previous_tq = test_question
      first_tq = test_question if first_tq.nil?
    end  # if
  end  # do

  # Link the order of the first and last questions.
  if ! first_tq.nil?
    first_tq.previous_id = previous_tq.id
    first_tq.save

    previous_tq.next_id = first_tq.id
    previous_tq.save
  end  # if
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
def find_document( document_name, updated_date )
  # Find the matching document.
  document = Document.where( filename: document_name, updated_at: updated_date ).take
  document = Document.where( filename: document_name ).take if document.nil?

  return document
end  # find_document

###############################################################################
def to_datetime( timestamp )
  tokens = timestamp.split( " " )
  day = tokens[0].to_i
  mon = Tools::month_int( tokens[1] )
  year = tokens[2].to_i
  parts = tokens[3].split( ":" )
  hour = parts[0].to_i
  min = parts[1].to_i
  ts = DateTime.new( year, mon, day, hour, min )
  return ts
end  # to_datetime

###############################################################################
def load_header( header_name, user )
  header = {}
  contents = Tools::clean_field( read_text_file( header_name ) )
  s1 = contents.split( "Squadron: " )
  s0 = s1[0].split( "Name: " )
  header[ :name ] = s0[1].chomp.rstrip
  s2 = s1[1].split( "Source: " )
  modified = s2[0].split( "Last Modified Date: " )
  header[ :last_modified ] = to_datetime( modified[1].chomp )

  created = modified[0].split( "Master Creation Date: " )
  header[ :squadron ] = created[0].chomp
  header[ :created ] = to_datetime( created[1].chomp )

  noq = s2[1].split( "Number of Questions: " )
  header[ :source ] = noq[0].chomp
  header[ :num_questions ] = noq[1].chomp

  test_set = TestSet.where( mqf_name: header[ :name ], updated_at: header[ :last_modified ] ).take
  if test_set.nil?
    test_set = TestSet.new
    test_set.user_id          = user.id if ! user.nil?
    test_set.mqf_name         = header[ :name ].chomp
    test_set.squadron         = header[ :squadron ].chomp
    test_set.source           = header[ :source ].chomp
    test_set.number_questions = header[ :num_questions ]
    test_set.created_at       = header[ :created ]
    test_set.updated_at       = header[ :last_modified ]
    test_set.save 
  end  # if

  return test_set
end  # load_header

###############################################################################
def load_qa_main
  if ARGV.length >= 3
    test_name = ARGV[0]
    header_name = ARGV[1]
    document_name = ARGV[2]

    user = User.where( user_name: ARGV[3] ).take

    test_set = load_header( header_name, user )

    document = find_document( document_name, test_set.updated_at )

    contents = Tools::clean_field( read_text_file( test_name ) )
    parse_contents( contents, test_set, document )
  else
    puts "rails runner load_qa.rb <test TSV file> <Test header> <document name> <user name>"
  end  # if
end  # method load_pdf_main

###############################################################################
load_qa_main()

