
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

require 'input_file'
require 'json'
require 'net/http'
require 'open3'
require 'output_file'
require 'uri'

class Ask

  ##############################################################################
  def self.write_history( quest, llm, questions )
    quest_name = "Q#{quest.id}.txt"
    quest_file = OutputFile.new( "TEMP/#{quest_name}" )
    quest_file.open_file()
    hist_name = "H#{quest.id}.txt"
    hist_file = OutputFile.new( "TEMP/#{hist_name}" )
    hist_file.open_file()
    chain_gap = false
    questions.each do |q|
      if chain_gap || q.chain_id <= quest.chain_order
        resp = Response.where( question_id: q.id, llm_id: llm.id, chain_order: q.chain_order ).take
        if resp.nil?
          quest_file.write( "#{q.question_text}\n" )
          chain_gap = true
        else
          response = resp.response_text.gsub( "\n", " " )
          hist_file.write( "#{q.question_text}\t#{response}\n" )
        end  # if
      else
        quest_file.write( "#{q.question_text}\n" )
      end  # if
    end  # do
    quest_file.close_file()
    hist_file.close_file()
    return quest_name, hist_name
  end  # write_history

  ##############################################################################
  def self.write_template( quest )
    template = nil
    template = Template.where( id: quest.template_id ).take if ! quest.template_id.nil?
    template_name = "T#{quest.id}.txt"
    temp_file = OutputFile.new( "TEMP/#{template_name}" )
    temp_file.open_file()
    temp_file.write( "#{template.template_text}\n" ) if ! template.nil?
    temp_file.close_file()

    return template_name
  end  # write_template

  ##############################################################################
  def self.run_chain( quest, llm, questions )
    template_name = Ask::write_template( quest )
    quest_name, hist_name = Ask::write_history( quest, llm, questions )
    results_name = "R#{quest.id}.txt"

    cmd = "python3 lang_chain.py token.txt \"#{llm.llm_name}\" TEMP/#{template_name} TEMP/#{quest_name} TEMP/#{hist_name} TEMP/#{results_name}"
    puts "***** lang_chain command: #{cmd}"
    stdout, stderr, status = Open3.capture3("#{cmd}")
    str = Ask::clean_response( stdout )
    puts "**** stdout: #{stdout}"
    puts "**** stderr: #{stderr}"
    puts "**** status: #{status}"

    results = InputFile.new( "TEMP/#{results_name}" )
    results.open_file()
    pairs_text = results.read_lines()
    results.close_file()

    if status == 0
      return pairs_text
    else
      puts "**** Something went wrong" 
      return pairs_text
    end  # if
  end  # run_chain

  ##############################################################################
  def self.run_local( quest, llm )
    cmd = "python3 llms_cli.py \"#{llm.llm_name}\" \"#{quest.question_text}\""
    puts "***** Docker command: #{cmd}"
    stdout, stderr, status = Open3.capture3("#{cmd}")
    str = Ask::clean_response( stdout )
    puts "**** stdout: #{stdout}"
    puts "**** str: #{str}"
    puts "**** stderr: #{stderr}"
    puts "**** status: #{status}"
    if status == 0
      return stderr, str
    else
      puts "**** Something went wrong" 
      return stderr, str
    end  # if
  end  # run_local

  ##############################################################################
  def self.llm_params( query, llm, collection_id, parameter_set_id )
    puts "******Ask.llm_params**** collection_id: #{collection_id}, parameter_set_id: #{parameter_set_id}"
    template = Template.where( id: query.template_id ).take
    collection = Collection.where( id: collection_id ).take
    llm_params = {}
    llm_params[ "llm_model" ] = llm.llm_name
    llm_params[ "question" ] = query.question_text
    llm_params[ "collection" ] = collection.collection_name
    llm_params[ "vector_store" ] = collection.vector_name
    llm_params[ "prompt_template" ] = template.template_text
    llm_params[ "prompt_input" ]    = template.prompt_input
    llm_params[ "input_variables" ] = template.input_variables.split( " " )

    llm_params[ "llm_params" ] = {}
    llm_params[ "llm_params" ][ "do_sample" ] = "True"
    llm_params[ "llm_params" ][ "max_new_tokens" ] = "1024"
    llm_params[ "llm_params" ][ "repetition_penalty" ] = "1.15"
    llm_params[ "llm_params" ][ "temperature" ] = "0.0001"
    llm_params[ "llm_params" ][ "top_p" ] = "0.95"
    llm_parameters = Parameter.where( id: parameter_set_id ).to_a
    llm_parameters.each do |llm_parameter|
      llm_params[ "llm_params" ][ llm_parameter.parameter_name ] = llm_parameter.parameter_value
    end  # do

    llm_params[ "rag_params" ] = {}
    llm_params[ "rag_params" ][ "max_new_tokens" ] = "1024"
    llm_params[ "rag_params" ][ "repetition_penalty" ] = "1.15"
    llm_params[ "rag_params" ][ "chunk_size" ] = "1000"
    llm_params[ "rag_params" ][ "chunk_overlap" ] = "40"
    llm_params[ "rag_params" ][ "emb_model_name" ] = "sentence-transformers/all-mpnet-base-v2"
    rag_parameters = Parameter.where( id: collection.parameter_set_id ).to_a
    rag_parameters.each do |rag_parameter|
      llm_params[ "rag_params" ][ rag_parameter.parameter_name ] = rag_parameter.parameter_value
    end  # do

    return llm_params
  end  # llm_params

  ##############################################################################
  def self.run_llm_rag( temp_id, llm_rag_params )
    File.write( "TEMP/rag_#{temp_id}.json", llm_rag_params.to_json )
    
    stdout, stderr, status = Open3.capture3( "python3 llm_rag_query.py TEMP/rag_#{temp_id}.json > TEMP/O_#{temp_id}.txt" )
    puts ">>> stdout: #{stdout}"
    puts ">>> stderr: #{stderr}"
    puts ">>> status: #{status}"

    results = InputFile.new( "TEMP/O_#{temp_id}.txt" )
    results.open_file()
    rag_text = results.read_lines()
    results.close_file()

    if status == 0
      # File.unlink("TEMP/rag_#{temp_id}.json") if File.exists?("TEMP/rag_#{temp_id}.json")
    end  # if

    return stderr, rag_text.join( "\n" )
  end  # run_llm_rag

  ##############################################################################
  def self.ask_llm_question( query, llm, questions, collection_id, parameter_set_id, temp_id )
    puts "**** ask_llm_question called: collection_id: #{collection_id}, parameter_set_id: #{parameter_set_id} *****"
    if collection_id.nil?
      if ! query.chain_id.nil?
        return Ask::run_chain( query, llm, questions )
      else
        return Ask::run_local( query, llm )
      end  # if
    else
      llm_rag_params = Ask::llm_params( query, llm, collection_id, parameter_set_id )
      return Ask::run_llm_rag( temp_id, llm_rag_params )
    end  # if
  end  # ask_llm_question

  ##############################################################################
  def self.clean_response( str )
    str = str.gsub( "\n\n", "\n" )
    lines = []
    index = str.index( "\\" )
    x = str[ 0..-2 ]
    x = str[ (index+2)..-2 ] if ! index.nil? && index > 0
    index = x.index( "\\" )

    count = 0
    while (! index.nil? )
      line = x[ 0...index ]
      x = x[ (index+2)..-1 ]
      # puts "(#{count}) index: #{index}, line: #{line}"
      # puts "x: #{x}"
      index = x.index( "\\" )
      if line.size > 0
        lines << line 
        count += 1
      end  # if
      return lines.join( "\n" ) if count > 9
    end

    lines << x

    return lines.join( "\n" )
  end  # clean_response 

  ##############################################################################

end  # class
