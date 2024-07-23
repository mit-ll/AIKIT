
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
def load_qar( question, answer, reference, document, llm, previous_id, previous_question )
  test_question = TestQuestion.where( question: question, answer: answer, document_id: document.id ).take
  if test_question.nil?
    test_question = TestQuestion.new
    test_question.document_id = document.id
    test_question.llm_id = llm.id
    test_question.previous_id = previous_id  # Link to the previous question
    test_question.next_id = nil
    test_question.question = question
    test_question.reference = reference
    test_question.answer = answer
    test_question.created_at = Time::now
    test_question.updated_at = Time::now
    test_question.save

    # Link the previous question to this question
    if ! previous_question.nil?
      previous_question.next_id = test_question.id
      previous_question.save
    end  # if
  end  # if
end  # load_qar

###############################################################################
def parse_question( question, document, llm, previous_id, previous_question )
  return if question.length < 1
  parts = question.split( "Answer: " )
  refs = parts[1].split( "Reference: " )
  previous_id, previous_question = load_qar( parts[0], refs[0], refs[1].chomp, document, llm, previous_id, previous_question )
  return previous_id, previous_question
end  # parse_question 

###############################################################################
def parse_contents( contents, document, llm )
  questions = contents.split( "Question: " )
  prevous_id = nil
  test_question = nil  # No previous test question
  questions.each do |question|
    previous_id, test_question = parse_question( question, document, llm, previous_id, test_question )
  end  # do
end  # parse_contents

###############################################################################
def read_qa_file( filename )
  # Read in the LLM-RAG questions, answer, reference file.
  qa_file = InputFile.new(filename)
  qa_file.open_file
  contents = qa_file.read_file
  qa_file.close_file

  return contents
end  # read_qa_file

###############################################################################
def find_or_create_llm( llm_name )
  llm = Llm.where( llm_name: llm_name ).take
  llm = Llm.create( llm_name: llm_name, updated_at: Time::now ) if llm.nil?
  return llm
end  # find_or_create_llm

###############################################################################
def load_qa_main
  if ARGV.length >= 3
    doc_name = ARGV[0]
    document = Document.where( filename: doc_name ).take
    if document.nil?
      puts "*Error* document #{doc_name} not found."
    else
      qa_name = ARGV[1]
      llm_name = ARGV[2]
      llm = find_or_create_llm( llm_name )

      contents = read_qa_file( qa_name )
      parse_contents( contents, document, llm )
    end  # if
  else
    puts "rails runner load_qa.rb <reference file> <LLM-RAG QA file> <LLM name>"
  end  # if
end  # method load_pdf_main

###############################################################################
load_qa_main()

