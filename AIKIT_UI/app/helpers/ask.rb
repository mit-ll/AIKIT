
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

# require 'input_file'
require 'json'
require 'net/http'
require 'open3'
# require 'output_file'
require 'uri'

class Ask

  ##############################################################################
  def self.write_chain( quest, llm, questions, llm_params )
    llm_params["llm_model"] = llm.llm_name
    llm_params["chain"] = {}
    questions.each do |q|
      llm_params["chain"][q.chain_order] = {}
      llm_params["chain"][q.chain_order]["input"] = "\"#{q.question_text}\""
      resp = Response.where( question_id: q.id, llm_id: llm.id, chain_order: q.chain_order ).take
      if ! resp.nil?
        resp_text = response.response_text.gsub( "\n", " " ) 
        llm_params["chain"][q.chain_order]["AI"] = "\"#{resp_text}\""
      end  # if
    end  # do
    return llm_params
  end  # write_chain

  ##############################################################################
  def self.write_template( quest, llm_params )
    template = nil
    template = Template.where( id: quest.template_id ).take if ! quest.template_id.nil?
    llm_params["template"] = template.template_text if ! template.nil?
  end  # write_template

  ##############################################################################
  def self.run_chain( quest, llm, questions )
    llm_params = {}
    llm_params["llm_model"] = llm.llm_name
    Ask::write_template( quest, llm_params )
    llm_params = Ask::write_history( quest, llm, questions, llm_params )

    results_name = "R#{quest.id}.txt"

    File.write( "TEMP/llm_#{quest.id}.json", llm_params.to_json )
    cmd = "python3 llms_json.py TEMP/llm_#{quest.id}.json > TEMP/O_#{quest.id}.json"
    puts "***** lang_chain command: #{cmd}"
    stdout, stderr, status = Open3.capture3("#{cmd}")
    puts "**** stdout: #{stdout}"
    puts "**** stderr: #{stderr}"
    puts "**** status: #{status}"

    results = File.open( "TEMP/O_#{quest.id}.json" )
    llm_results = JSON.load results
    results.close

    if status == 0
      return stderr, llm_results
    else
      puts "**** Something went wrong" 
      return stderr, llm_results
    end  # if
  end  # run_chain

  ##############################################################################
  def self.run_local( quest, llm )
    # Note: JSON input file
    llm_params = {}
    llm_params["llm_model"] = llm.llm_name
    llm_params["questions"] = ["\"#{quest.question_text}\""]
    Ask::write_template( quest, llm_params )
    File.write( "TEMP/llm_#{quest.id}.json", llm_params.to_json )
    cmd = "python3 llms_json.py TEMP/llm_#{quest.id}.json > TEMP/O_#{quest.id}.json"
    puts "***** Docker command: #{cmd}"
    stdout, stderr, status = Open3.capture3("#{cmd}")
    # str = Ask::clean_response( stdout )
    puts "**** stdout: #{stdout}"
    puts "**** stderr: #{stderr}"
    puts "**** status: #{status}"

    results = File.open( "TEMP/O_#{quest.id}.json" )
    llm_results = JSON.load results
    results.close

    if status == 0
      return stderr, llm_results
    else
      puts "**** Something went wrong" 
      return stderr, llm_results
    end  # if
  end  # run_local

  ##############################################################################
  def self.llm_params( query, llm, collection_id, parameter_set_id )
    puts "******Ask.llm_params**** collection_id: #{collection_id}, parameter_set_id: #{parameter_set_id}"
    template = Template.where( id: query.template_id ).take
    collection = Collection.where( id: collection_id ).take
    llm_params = {}
    llm_params[ "llm_model" ] = llm.llm_name

    if query.chain_id.nil?
      llm_params[ "questions" ] = ["\"#{query.question_text}\""]
    else
      # Write out the questions chain and any responses for this LLM.
      questions_chain = LlmQuestion.where(chain_id: query.chain_id).order(:chain_order).to_a
      llm_params["chain"] = {}
      questions_chain.each do |question_chain|
        llm_params["chain"][question_chain.chain_order] = {}
        llm_params["chain"][question_chain.chain_order]["question"] =  question_chain.question_text
      end  # do

      responses_chain = Response.where(chain_id: query.chain_id, llm_id: llm.id).order(:chain_order).to_a
      responses_chain.each do |response_chain|
        llm_params["chain"][response_chain.chain_order]["AI"] = "\"#{response_chain.response_text}\""
      end  # do
    end  # if

    llm_params[ "collection" ] = collection.collection_name
    llm_params[ "vector_store" ] = collection.vector_name
    if ! template.nil?
      llm_params[ "prompt_template" ] = template.template_text
      llm_params[ "prompt_input" ]    = template.prompt_input
      llm_params[ "input_variables" ] = template.input_variables.split( " " )
    end  # if

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
    
    stdout, stderr, status = Open3.capture3( "python3 llm_rag_lc.py TEMP/rag_#{temp_id}.json > TEMP/O_#{temp_id}.json" )
    puts ">>> stdout: #{stdout}"
    puts ">>> stderr: #{stderr}"
    puts ">>> status: #{status}"

    results = File.open( "TEMP/O_#{temp_id}.json" )
    rag_results = JSON.load results
    results.close
    puts "**** rag_results: #{rag_results}"

    # if status == 0
      # File.unlink("TEMP/rag_#{temp_id}.json") if File.exists?("TEMP/rag_#{temp_id}.json")
    # end  # if

    return stderr, rag_results
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
      if query.template_id.nil?
        return Ask::run_local( query, llm )
      else
        llm_rag_params = Ask::llm_params( query, llm, collection_id, parameter_set_id )
        return Ask::run_llm_rag( temp_id, llm_rag_params )
      end  # if
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
