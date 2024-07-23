
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
# the Free Software Foundation, either version 2 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
################################################################################

class InitialData < ActiveRecord::Migration[7.0]
  def change
    mitll = User::create(user_name: "MIT Lincoln Laboratory", user_sid: "MITLL")
    ricke = User::create(user_name: "Darrell Ricke", user_sid: "ricke")
    guest = User::create(user_name: "Guest", user_sid: "guest")
    adam = User::create(user_name: "Adam Michaleas", user_sid: "adam")
    nora = User::create(user_name: "Nora Smith", user_sid: "nora")
    joe = User::create(user_name: "Joseph Campbell", user_sid: "campbell")
    allan = User::create(user_name: "Allan Wollaber", user_sid: "wollaber")
    sanjeev = User::create(user_name: "Sanjeev Mohindra", user_sid: "sanjeev")

    mitll_group = Group::create(group_name: "MITLL")
    # UserGroup::create(user_id: ricke.id, group_id: mitll_group.id)

    mistral3      = Llm::create(llm_name: "mistralai/Mistral-7B-v0.3")
#   mistral3i     = Llm::create(llm_name: "mistralai/Mistral-7B-Instruct-v0.3")

    mistral_8x7B  = Llm::create(llm_name: "mistralai/Mixtral-8x7B-v0.1")
#   mistral_8x7Bi = Llm::create(llm_name: "mistralai/Mixtral-8x7B-Instruct-v0.1")

    mixtral_8x22B = Llm::create(llm_name: "mistralai/Mixtral-8x22B-v0.1")
#   mixtral_8x22Bi = Llm::create(llm_name: "mistralai/Mixtral-8x22B-Instruct-v0.1")

    llama3_8b     = Llm::create(llm_name: "meta-llama/Meta-Llama-3-8B")
#   llama3_8bi    = Llm::create(llm_name: "meta-llama/Meta-Llama-3-8B-Instruct")

    llama3_70B    = Llm::create(llm_name: "meta-llama/Meta-Llama-3-70B")
#   llama3_70Bi   = Llm::create(llm_name: "meta-llama/Meta-Llama-3-70B-Instruct")

    Llm::create(llm_name: "Qwen/Qwen2-7B-Instruct")
    Llm::create(llm_name: "Qwen/Qwen2-72B")

    admin = Role::create( role_name: "admin" )
    instructor = Role::create( role_name: "instructor" )
    user = Role::create( role_name: "user" )

    UserRole::create( user_id: ricke.id, role_name: "admin", role_id: admin.id )
    UserRole::create( user_id: ricke.id, role_name: "instructor", role_id: instructor.id )
    UserRole::create( user_id: ricke.id, role_name: "user", role_id: user.id )

    UserRole::create( user_id: adam.id, role_name: "user", role_id: user.id )

    llm_set = ParameterSet::create( user_id: guest.id, set_name: "LLM set1", set_type: "LLM" )
    Parameter::create( user_id: guest.id, parameter_set_id: llm_set.id, parameter_name: "temperature", parameter_value: "0.0001" )
    Parameter::create( user_id: guest.id, parameter_set_id: llm_set.id, parameter_name: "top_p", parameter_value: "0.95" )
    Parameter::create( user_id: guest.id, parameter_set_id: llm_set.id, parameter_name: "repetition_penalty", parameter_value: "1.15" )
    Parameter::create( user_id: guest.id, parameter_set_id: llm_set.id, parameter_name: "max_new_tokens", parameter_value: "1024" )
    Parameter::create( user_id: guest.id, parameter_set_id: llm_set.id, parameter_name: "do_sample", parameter_value: "True" )

    faiss_set = ParameterSet::create( user_id: guest.id,  set_name: "LLM RAG FAISS set1", set_type: "RAG" )
    Parameter::create( user_id: guest.id, parameter_set_id: faiss_set.id, parameter_name: "emb_model_name", parameter_value: "sentence-transformers/all-mpnet-base-v2" )
    Parameter::create( user_id: guest.id, parameter_set_id: faiss_set.id, parameter_name: "max_new_tokens", parameter_value: "1024" )
    Parameter::create( user_id: guest.id, parameter_set_id: faiss_set.id, parameter_name: "chunk_size", parameter_value: "1000" )
    Parameter::create( user_id: guest.id, parameter_set_id: faiss_set.id, parameter_name: "chunk_overlap", parameter_value: "10" )

    chroma_set = ParameterSet::create( user_id: guest.id,  set_name: "LLM RAG chroma set2", set_type: "RAG" )
    Parameter::create( user_id: guest.id, parameter_set_id: chroma_set.id, parameter_name: "emb_model_name", parameter_value: "all-MiniLM-L6-v2" )
    Parameter::create( user_id: guest.id, parameter_set_id: chroma_set.id, parameter_name: "max_new_tokens", parameter_value: "1024" )
    Parameter::create( user_id: guest.id, parameter_set_id: chroma_set.id, parameter_name: "chunk_size", parameter_value: "1000" )
    Parameter::create( user_id: guest.id, parameter_set_id: chroma_set.id, parameter_name: "chunk_overlap", parameter_value: "10" )

    Template::create( user_id: guest.id, template_text: "Answer the following question based only on the provided context: <context> {context} </context> Question: {question}", prompt_input: "You are a teacher assessing whether or not your student knows the material in the context provided. Generate a question and answer pair that tests the student on the provided context. Provide the answer in the following format:\nQuestion: Provide the question here.\nAnswer: Provide the answer here. Make the answer as concise as possible.", input_variables: "context question" )

    g_temp = Template::create( user_id: guest.id, template_text: "Answer the following question based only on the provided context: <context> {context} </context> Question: {question}", prompt_input: "Provide the answer in the following format:\nQuestion: Provide the question here.\nAnswer: Provide the answer here. Make the answer as concise as possible. List source document names here:\nSources:", input_variables: "context question" )


    LlmQuestion::create( user_id: guest.id, template_id: g_temp.id, question_text: "Provide an overview of how Generative AI is currently being utilized in national security applications.", question_name: "1.a", updated_at: Time::now)

    LlmQuestion::create( user_id: guest.id, template_id: g_temp.id, question_text: "What are the key areas within national security where Generative AI can have the most significant impact?", question_name: "1.b", updated_at: Time::now)

    LlmQuestion::create( user_id: guest.id, template_id: g_temp.id, question_text: "What are the current capabilities of Generative AI in the context of national security?", question_name: "2.a", updated_at: Time::now)
    LlmQuestion::create( user_id: guest.id, template_id: g_temp.id, question_text: "Identify the main challenges and limitations of implementing Generative AI in national security operations.", question_name: "2.b", updated_at: Time::now)

    LlmQuestion::create( user_id: guest.id, template_id: g_temp.id, question_text: "What are the essential components of a roadmap for advancing Generative AI capabilities in national security?", question_name: "3.a", updated_at: Time::now)
    LlmQuestion::create( user_id: guest.id, template_id: g_temp.id, question_text: "How should national security agencies prioritize their efforts in developing and deploying Generative AI technologies?", question_name: "3.b", updated_at: Time::now)

    LlmQuestion::create( user_id: guest.id, template_id: g_temp.id, question_text: "What strategic directions should MIT Lincoln Laboratory take to advance Generative AI for national security?", question_name: "4.a", updated_at: Time::now)
    LlmQuestion::create( user_id: guest.id, template_id: g_temp.id, question_text: "Recommend key areas for investment to enhance the effectiveness and resilience of Generative AI in national security contexts.", question_name: "4.b", updated_at: Time::now)

    LlmQuestion::create( user_id: guest.id, template_id: g_temp.id, question_text: "How can MIT Lincoln Laboratory's sponsors better leverage Generative AI to enhance their national security capabilities?", question_name: "5.a", updated_at: Time::now)
    LlmQuestion::create( user_id: guest.id, template_id: g_temp.id, question_text: "What specific applications of Generative AI can improve the defense mechanisms against adversarial threats?", question_name: "5.b", updated_at: Time::now)
    LlmQuestion::create( user_id: guest.id, template_id: g_temp.id, question_text: "What strategies should be adopted to defend against adversarial uses of Generative AI in national security?", question_name: "6.a", updated_at: Time::now)
    LlmQuestion::create( user_id: guest.id, template_id: g_temp.id, question_text: "Identify the potential threats posed by adversarial Generative AI and recommend countermeasures.", question_name: "6.b", updated_at: Time::now)
    LlmQuestion::create( user_id: guest.id, template_id: g_temp.id, question_text: "What are the policy implications of integrating Generative AI into national security frameworks?", question_name: "7.a", updated_at: Time::now)
    LlmQuestion::create( user_id: guest.id, template_id: g_temp.id, question_text: "Discuss the ethical considerations and potential risks associated with using Generative AI in national security.", question_name: "7.b", updated_at: Time::now)

    LlmQuestion::create( user_id: guest.id, template_id: g_temp.id, question_text: "Provide case studies or examples where Generative AI has been successfully applied in national security.", question_name: "8.a", updated_at: Time::now)
    LlmQuestion::create( user_id: guest.id, template_id: g_temp.id, question_text: "Analyze instances where adversarial Generative AI has posed significant threats to national security and the responses to those threats.", question_name: "8.b", updated_at: Time::now)

    LlmQuestion::create( user_id: guest.id, template_id: g_temp.id, question_text: "What role do collaborations and partnerships play in advancing Generative AI for national security?", question_name: "9.a", updated_at: Time::now)
    LlmQuestion::create( user_id: guest.id, template_id: g_temp.id, question_text: "Identify key stakeholders and potential partners for MIT Lincoln Laboratory in the field of Generative AI for national security.", question_name: "9.b", updated_at: Time::now)

    LlmQuestion::create( user_id: guest.id, template_id: g_temp.id, question_text: "What are the latest technological advancements in Generative AI that can benefit national security?", question_name: "10.a", updated_at: Time::now)
    LlmQuestion::create( user_id: guest.id, template_id: g_temp.id, question_text: "Discuss the emerging trends in Generative AI research and development that are relevant to national security applications.", question_name: "10.b", updated_at: Time::now)
    LlmQuestion::create( user_id: sanjeev.id, template_id: g_temp.id, question_text: "What are the uses in applying AI for battle management command and control?", question_name: "sm1", updated_at: Time::now)
  end
end
