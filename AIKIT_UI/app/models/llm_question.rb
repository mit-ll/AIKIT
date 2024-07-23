
###############################################################################
# **Author:**  Darrell O. Ricke, Ph.D.  (mailto: Darrell.Ricke@ll.mit.edu)
#  Copyright:  Copyright (c) 2024 Massachusetts Institute of Technology 
#  License:    GNU GPL license (http://www.gnu.org/licenses/gpl.html)  
# 
# **RAMS request ID 1028809** 
# **RAMS title: Artificial Intelligence tools for Knowledge-Intensive Tasks (AIKIT)
# 
# **Overview:**
# Artificial Intelligence tools for Knowledge-Intensive Tasks (AIKIT) including
# Large Language Models (LLM), LangChain, and Retrieval-Augmented Generation (RAG).
# 
# **Citation:** None
# 
# **Disclaimer:**
# DISTRIBUTION STATEMENT A. Approved for public release. Distribution is unlimited.
#
# This material is based upon work supported by the Department of the Air Force 
# under Air Force Contract No. FA8702-15-D-0001. Any opinions, findings, 
# conclusions or recommendations expressed in this material are those of the 
# author(s) and do not necessarily reflect the views of the Department of the Air Force. 
# 
# © 2024 Massachusetts Institute of Technology
#
# Subject to FAR52.227-11 Patent Rights - Ownership by the contractor (May 2014)
#
# The software/firmware is provided to you on an As-Is basis
# 
# Delivered to the U.S. Government with Unlimited Rights, as defined in DFARS
# Part 252.227-7013 or 7014 (Feb 2014). Notwithstanding any copyright notice,
# U.S. Government rights in this work are defined by DFARS 252.227-7013 or
# DFARS 252.227-7014 as detailed above. Use of this work other than as specifically
# authorized by the U.S. Government may violate any copyrights that exist in this work.
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, version 2 of the License.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
###############################################################################

class LlmQuestion < ApplicationRecord
  belongs_to :user

  # validates :user_id, presence: true

  ##############################################################################
  def self.add_collection( collection_id )
    resp = ""
    if ! collection_id.nil?
      collection = Collection.where( id: collection_id ).take
      resp += "Vector store: #{collection.vector_name}\n"
      resp += "Collection: #{collection.collection_name}\n"
    end  # if

    return resp
  end  # if

  ##############################################################################
  def self.add_parameters( parameter_set_id, tag )
    resp = ""
    parameters = Parameter.where( parameter_set_id: parameter_set_id ).to_a
    parameters.each do |parameter|
      resp += "#{tag} #{parameter.parameter_name}: #{parameter.parameter_value}\n"
    end  # do
    return resp
  end  # add_parameters

  ##############################################################################
  def self.details( q )
    resp = "LlmQuestion: #{q.question_text}\n"

    ai_responses = Response.where(llm_question_id: q.id).to_a
    template = nil
    template = Template.where(id: q.template_id).take if ! q.template_id.nil?
    if ! template.nil?
      resp += "Template: #{template.template_text}\n" 
      resp += "Prompt input: #{template.prompt_input}\n" if ! template.prompt_input.nil?
      resp += "Input variables: #{template.input_variables}\n" if ! template.input_variables.nil?
    end  # if

    ai_responses.each do |ai_response|
      llm = Llm.where(id: ai_response.llm_id).take
      resp += "Model: #{llm.llm_name}\n"
      resp += self.add_parameters( ai_response.llm_parameter_set_id, "LLM" ) if ! ai_response.llm_parameter_set_id.nil?
      resp += self.add_collection( ai_response.collection_id ) if ! ai_response.collection_id.nil?
      resp += self.add_parameters( ai_response.collection_parameter_set_id, "RAG" ) if ! ai_response.collection_parameter_set_id.nil?
      resp += "AI: #{ai_response.response_text}\n"
    end  # do

    return resp
  end  # details

  ##############################################################################
  def self.all_details( user_id )
    llm_questions = LlmQuestion.where( user_id: user_id ).order(:id).to_a
    all_response = ""
    llm_questions.each do |llm_question|
      all_response += LlmQuestion.details( llm_question ) + "\n"
    end  # do
    return all_response
  end  # all_details

  ##############################################################################
  def self.chain_details( q )
    if ! q.chain_id.nil?
      llm_questions = LlmQuestion.where( chain_id: q.chain_id ).order(:chain_order).to_a 
      chain_response = ""
      llm_questions.each do |llm_question|
        chain_response += LlmQuestion.details( llm_question ) + "\n"
      end  # do
      return chain_response
    else
      return ""
    end  # if
  end  # chain_details

  ##############################################################################
  def self.default_llm_parameters()
    params = {}
    Parameter::LLM_PARAMS.each do |k, v|
      params[ k ] = v
    end  # do

    return params
  end  # default_llm_parameters

  ##############################################################################
  def self.llm_rag_question( collection_id, llm_parameter_set_id, llm_id )
    collection = Collection.where( id: collection_id ).take
    rag_params = {}

    # Default LLM parameters
    rag_params = self.default_llm_parameters()

    rag_params["vector_store"] = collection.vector_name
    rag_params["collection"]   = collection.collection_name
    parameters = Parameter.where( parameter_set_id: llm_parameter_set_id ).to_a
    parameters.each do |k, v|
      rag_params[k] = v
    end  # do

    rag_params["question"] = self.question_text
    template = Template.where( id: self.template_id ).take
    rag_params["prompt_template"] = template.template_text
    rag_params["prompt_input"] = template.prompt_input
    rag_params["input_variables"] = template.input_variables
    llm = Llm.where( id: llm_id ).take
    rag_params["llm_model"] = llm.llm_name

    # Write the parameters to JSON file.
    json_file = File.open("TEMP/llm_#{self.id}.json", "w")
    json_file.write( rag_params )
    json_file.close

    # Run the LLM RAG question on the LLM plus collection.

  end  # llm_rag_question

  ##############################################################################

end  # class
