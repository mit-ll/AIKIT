
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

###############################################################################
def ask_rag_questions_main( llm_model, llm_param_name, vs_name, vs_param_name )
  puts "#{llm_model}\n"
  llm_questions = LlmQuestion.all
  llm = Llm.where( llm_name: llm_model ).take
  if llm.nil?
    puts "LLM model not found: #{llm_model}"
    return
  end  # if
  llm_params_set = ParameterSet.where( set_name: llm_param_name ).take
  collection = Collection.where(collection_name: vs_name ).take
  rag_params_set = ParameterSet.where( set_name: vs_param_name ).take

  llm_questions.each do |llm_question|
    err_status, llm_response = Ask::ask_llm_question( llm_question, llm, llm_question, collection.id, llm_params_set.id, llm_question.id )

    response_rec = Response.create( user_id: llm_question.user_id,
        llm_question_id: llm_question.id,
        llm_id: llm.id,
        response_text: llm_response,
        collection_id: collection.id,
        collection_parameter_set_id: rag_params_set.id,
        llm_parameter_set_id: llm_params_set.id,
        created_at: Time::now )

    puts "#{llm_question.question_text}"
    puts "err_status: #{err_status}"
    puts "#{llm_response}"
    puts "---------------------------------------------------------------------"
  end  # do
end  # ask_rag_questions_main

###############################################################################
ask_rag_questions_main( "meta-llama/Meta-Llama-3-8B", "LLM set1", "GAINS_all",  "LLM RAG FAISS set1")
ask_rag_questions_main( "mistralai/Mistral-7B-v0.3", "LLM set1", "GAINS_all", "LLM RAG FAISS set1")
ask_rag_questions_main( "mistralai/Mixtral-8x7B-v0.1", "LLM set1", "GAINS_all", "LLM RAG FAISS set1")

ask_rag_questions_main( "meta-llama/Meta-Llama-3-70B", "LLM set1", "GAINS_all", "LLM RAG FAISS set1")
ask_rag_questions_main( "mistralai/Mixtral-8x22B-v0.1", "LLM set1", "GAINS_all", "LLM RAG FAISS set1")
ask_rag_questions_main( "Qwen/Qwen2-72B", "LLM set1", "GAINS_all", "LLM RAG FAISS set1")
# ask_rag_questions_main( "meta-llama/Meta-Llama-3-8B-Instruct", "LLM set1", "GAINS_all",  "LLM RAG FAISS set1")
# ask_rag_questions_main( "mistralai/Mistral-7B-Instruct-v0.3", "LLM set1", "GAINS_all", "LLM RAG FAISS set1")
# ask_rag_questions_main( "mistralai/Mixtral-8x7B-Instruct-v0.1", "LLM set1", "GAINS_all", "LLM RAG FAISS set1")
# ask_rag_questions_main( "meta-llama/Meta-Llama-3-70B-Instruct", "LLM set1", "GAINS_all", "LLM RAG FAISS set1")
# ask_rag_questions_main( "mistralai/Mixtral-8x22B-Instruct-v0.1", "LLM set1", "GAINS_all", "LLM RAG FAISS set1")
