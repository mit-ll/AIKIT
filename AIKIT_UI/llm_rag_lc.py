################################################################################ 
# Author: Darrell O. Ricke, Ph.D.  (email: Darrell.Ricke@ll.mit.edu) 
# 
# RAMS request ID 1028310 
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
# the Free Software Foundation, version 2.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
################################################################################

import json
import os
import os.path
from os import environ
import pandas as pd
import string
import sys
import time

import chromadb

from langchain_chroma import Chroma
from langchain_community.document_loaders import TextLoader
from langchain_community.embeddings.sentence_transformer import (
    SentenceTransformerEmbeddings,
)
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import FAISS
from langchain_community.chat_message_histories import ChatMessageHistory

import torch
from transformers import (
  AutoConfig,
  AutoTokenizer,
  AutoModelForCausalLM,
  BitsAndBytesConfig,
  GenerationConfig,
  pipeline
)

from langchain.prompts.chat import ( ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate, )

from transformers import BitsAndBytesConfig

from langchain_community.document_loaders import AsyncChromiumLoader
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.schema.runnable import RunnablePassthrough
from langchain_huggingface.llms import HuggingFacePipeline
# from langchain.schema import AIMessage

import nest_asyncio

from langchain_core.runnables.base import Runnable, Input, Output

from langchain_core.output_parsers import StrOutputParser
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langchain_core.runnables.history import RunnableWithMessageHistory

from langchain.memory import ConversationBufferMemory
from langchain.chains import LLMChain, SimpleSequentialChain, RetrievalQA, ConversationalRetrievalChain
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_history_aware_retriever

from langchain.prompts import PromptTemplate
from langchain_core.prompts import MessagesPlaceholder

from adapters import AutoAdapterModel
# from qdrant_client import QdrantClient

################################################################################
def create_collection( params ):
    vector_store = params["vector_store"]
    rag_params = params["rag_params"]
    emb_model_name = rag_params["emb_model_name"]
    collection = params["collection"]

    if vector_store == "FAISS":
        # db = FAISS.load_local(collection,
        db = FAISS.load_local("/io/FAISS_dbs/" + collection,
            HuggingFaceEmbeddings(model_name=emb_model_name),
            allow_dangerous_deserialization=True)

    # elif vector_store == "Qdrant":

    else:  # Chroma database
        embedding_function = SentenceTransformerEmbeddings(model_name=emb_model_name)
        # db = Chroma(persist_directory=collection, embedding_function=embedding_function)
        db = Chroma(persist_directory="/io/chroma_dbs/"+collection, embedding_function=embedding_function)
    
    return db

################################################################################
def format_docs(docs):
    return "\n\n".join([d.page_content for d in docs])

################################################################################
def find_question(question, answer):
    i = answer.find(question)
    if i == -1:
        return answer, answer
    qlen = len(question)
    return answer[i+qlen+1:].lstrip(), answer[i:]

################################################################################
def ascii_only(value: str) -> str:
    # return ''.join(i for i in value if i.isprintable())
    return ''.join(i for i in value if i.isascii())

################################################################################
def parse_ai_response( chain_order, question, answer, llm_results ):
    # print ("*******************************************************************")
    # print( "question: |" + question + "|")
    ans, context = find_question(question, ascii_only(answer))
    # print("ans: " + ans)

    i = ans.find("Answer: ")
    if i >= 0:
        ans = ans[i+8:]
        # context = ans
        # print( "**** Answer: " + ans )

    i = ans.find("AI: ")
    if i >= 0:
        ans = ans[i+4:]
        # context = ans
        # print( "**** AI: " + ans )

    i = ans.find("Document: ")
    if i > 0:
        # context = ans[i:]
        ans = ans[0:i-1].rstrip()
    if i == 0:
        # context = ans
        ans = ""

    # llm_results["chain"][chain_order]["AI_context"] = answer
    llm_results["chain"][chain_order]["AI_context"] = context
    llm_results["chain"][chain_order]["AI"] = ans
    # print("chain_order: " + chain_order)
    # print("parse_ai_response: " + ans )
    # print("context: " + context)
    # print("-------------------------------------------------------------")
    # print("answer: " + answer )
    return llm_results, ans

################################################################################
def old_parse_ai_response( chain_order, question, answer, llm_results, flag_text ):
    llm_results["chain"][chain_order]["AI_context"] = answer

    index = answer.find( question )
    result = answer
    if index > -1:
      result = answer[index + len(question):]

      j = result.find( "Human: " )
      if j > -1:
        result = result[0:j]

    ai = result

    flag = "Answer: "
    index = result.find( flag )
    if index > -1:
      response = result[index + len(flag):]
      ai = response
      doc_i = response.find( "Document: " )
      if doc_i > -1:
        ai = response[0:doc_i-1]
      llm_results["chain"][chain_order]["AI"] = ai

    else:
      llm_results["chain"][chain_order]["AI"] = answer

    return llm_results, ai

################################################################################
def parse_chat_response( chain_order, question, chat_history, llm_results ):
    human_msg = ''
    for item in chat_history:
        # if type(item) == SystemMessage:
            # print("SystemMessage found")
            # print(item.content)
        if type(item) == AIMessage:
            # print("AIMessage found")
            txt = item.content
            # print(item.content)
            llm_results = parse_ai_content( chain_order, question, txt, llm_results )
        if type(item) == HumanMessage:
            # print("HumanMessage found")
            # print(item.content)
            human_msg = item.content
    return llm_results

################################################################################
def parse_context( chain_order, context, llm_results ):
    i = 1
    if "context" not in llm_results["chain"][chain_order]:
        llm_results["chain"][chain_order]["context"] = {}

    for item in context:
        llm_results["chain"][chain_order]["context"][str(i)] = {}
        llm_results["chain"][chain_order]["context"][str(i)]["page_content"] = ascii_only(item.page_content)
        llm_results["chain"][chain_order]["context"][str(i)]["source"] = item.metadata["source"]
        if "page" in item.metadata:
            llm_results["chain"][chain_order]["context"][str(i)]["page"] = item.metadata["page"]
        i += 1
    return llm_results

################################################################################
def split_answer( response, flag_text ): 
    if len(flag_text) == 0: 
      flag_text = "</context>"
    index = response.rfind(flag_text)
    if index == -1:
      flag_text = "<|assistant|>"
      index = response.rfind(flag_text) 

    if index == -1:
      return response[0:index], response[index+len(flag_text):]

    return "", response   # flag_text not found

################################################################################
def run_llm_rag( params, hf_token, db ) -> str:
    llm_params = params["llm_params"]
    model_name = params["llm_model"] 
    
    model_config = AutoConfig.from_pretrained( model_name, token=hf_token )
    
    tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True, token=hf_token)
    tokenizer.pad_token = tokenizer.eos_token
    tokenizer.padding_side = "right"
    
    #################################################################
    # bitsandbytes parameters
    #################################################################
    
    # Activate 4-bit precision base model loading
    use_4bit = True
    
    # Compute dtype for 4-bit base models
    bnb_4bit_compute_dtype = "float16"
    
    # Quantization type (fp4 or nf4)
    bnb_4bit_quant_type = "nf4"
    
    # Activate nested quantization for 4-bit base models (double quantization)
    use_nested_quant = False
    
    #################################################################
    # Set up quantization config
    #################################################################
    compute_dtype = getattr(torch, bnb_4bit_compute_dtype)
    
    bnb_config = BitsAndBytesConfig(
        load_in_4bit=use_4bit,
        bnb_4bit_quant_type=bnb_4bit_quant_type,
        bnb_4bit_compute_dtype=compute_dtype,
        bnb_4bit_use_double_quant=use_nested_quant,
    )
    
    quantization_config = BitsAndBytesConfig(
        load_in_4bit=True,
        bnb_4bit_compute_dtype=torch.float16,
        bnb_4bit_quant_type="nf4",
        bnb_4bit_use_double_quant=True,
    )

    model = AutoModelForCausalLM.from_pretrained(
        model_name,
        quantization_config=bnb_config,
        token=hf_token
    )
    if "adapter_model" in params:
      model = AutoAdapterModel.from_pretrained(
          model_name,
          quantization_config=bnb_config,
          token=hf_token
      )
      adapter_name = model.load_adapter(params["adapter_model"])
      model.active_adapters = adapter_name
   
    max_new_tokens = int(llm_params["max_new_tokens"])
    repetition_penalty = float(llm_params["repetition_penalty"])
    temperature = float(llm_params["temperature"])
    top_p = float(llm_params["top_p"])

    text_generation_pipeline = pipeline(
        model=model,
        tokenizer=tokenizer,
        task="text-generation",
        do_sample=True,
        repetition_penalty=repetition_penalty,
        return_full_text=True,
        max_new_tokens=max_new_tokens,
    )
    
    generation_config = GenerationConfig.from_pretrained(model_name)
    generation_config.max_new_tokens = max_new_tokens
    generation_config.temperature = temperature
    generation_config.top_p = top_p
    generation_config.do_sample = True
    generation_config.repetition_penalty = repetition_penalty
    
    pipeline2 = pipeline(
        "text-generation",
        model=model,
        tokenizer=tokenizer,
        return_full_text=True,
        generation_config=generation_config,
    )
    
    llm2 = HuggingFacePipeline(pipeline=pipeline2)
    retriever = db.as_retriever(search_kwargs={"k": 5})

    # Create prompt from prompt template
    prompt = PromptTemplate(
        input_variables=params["input_variables"],
        template=params["prompt_template"],
    )

    c_prompt = (
        "Given a chat history and the latest user question "
        "which might reference context in the chat history, "
        "formulate a standalone question which can be understood "
        "without the chat history. Do NOT answer the question, "
        "just reformulate it if needed and otherwise return it as is." )
    if "chat_prompt" in params:
      c_prompt = params["chat_prompt"]

    qa_system_prompt = """You are an assistant for question-answering tasks. \
        Use the following pieces of retrieved context to answer the question. \
        If you don't know the answer, just say that you don't know. \
        Use three sentences maximum and keep the answer concise.\
        {context}"""
    if "system_prompt" in params:
      qa_system_prompt = params["system_prompt"]

    similarity_k = 3
    if "similarity_K" in params:
      similarity_k = params["similarity_K"]

    flag_text = "</context>"
    if "flag_text" in params:
        flag_text = params["flag_text"]

    # Check for questions chain
    if "chain" in params:
      cbm_memory = ConversationBufferMemory(memory_key="memory", input_key="question", return_messages=True, ai_prefix='AI', human_prefix="Human" )
  
      # Load in past chat questions and answers.
      chains = params["chain"]
      chains_keys = chains.keys()
      ai_response = True
      for chain_order in chains_keys:
        qr = chains[chain_order]
        # print("qr:")
        # print(qr)
        question = qr["question"]
        # print( "chain_order: " + chain_order + ", question: " + question )

        if "AI" in qr and ai_response:
          response = qr["AI"]
          cbm_memory.chat_memory.add_user_message( question )
          cbm_memory.chat_memory.add_ai_message( response )
        else:
          ai_response = False

      retriever = db.as_retriever(search_kwargs={"k": 5})

      cq_prompt = ChatPromptTemplate.from_messages(
          [ ("system", c_prompt),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}"),
          ] )

      history_retriever = create_history_aware_retriever( llm2, retriever, cq_prompt )

      qa_prompt = ChatPromptTemplate.from_messages( 
          [ ("system", qa_system_prompt),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}"),
          ] )
      
      question_answer_chain = create_stuff_documents_chain(llm2, qa_prompt)

      rag_chain = create_retrieval_chain(history_retriever, question_answer_chain)

      store = {}

      def get_session_history(session_id: str) -> BaseChatMessageHistory:
          if session_id not in store:
              store[session_id] = ChatMessageHistory()
          return store[session_id]

      conversational_rag_chain = RunnableWithMessageHistory(
          rag_chain,
          get_session_history,
          input_messages_key="input",
          history_messages_key="chat_history",
          output_messages_key="answer", )

      chat_history = []

      for chain_order in chains_keys:
          # print( "Chain order: " + chain_order )

          qr = chains[chain_order]
          question = qr["question"].replace( '"', '' )
          # print("****** Question:" + question )

          result = conversational_rag_chain.invoke({"input": question, "chat_history": chat_history},
              config={"configurable": {"session_id": "abc123"} })

          # print( "-----------RESULT-----------------------" )
          # print( result )
          
          # params["chain"][chain_order]["AI"] = result["answer"]  
          # params["chain"][chain_order]["context"] = ''
          # params["chain"][chain_order]["context"] = ''.join(result["context"])     # Document list 
          # params["chain"][chain_order]["chat_history"] = ''.join(result["chat_history"])  # HumanMessage, AIMessage
          # print("answer:")
          # print( result["answer"] )
          # print( "----------------------------------" )
          params, ai = parse_ai_response( str(chain_order), question, result["answer"], params )
          # print("Answer: " + ai)
          chat_history.extend([HumanMessage(content=question), ai])
          params = parse_context( str(chain_order), result["context"], params )

      jsn = json.dumps(params, indent=4)
      print( jsn )
      return 

    else:
      # No chaining of questions
      questions = params["questions"]
      qa_chain = RetrievalQA.from_chain_type(
          llm=llm2,
          chain_type="stuff",
          retriever=db.as_retriever(search_kwargs={"k": 5}),
          return_source_documents=False,
          chain_type_kwargs={"prompt": prompt},
      )
 
      # for question in questions:
      params["chain"] = {}
      for i in range(len(questions)):
          params["chain"][str(i)] = {}
          params["chain"][str(i)]["question"] = questions[i]
          question = questions[i].replace( '"', '' )
          retriever = db.as_retriever(search_kwargs={"k": 5})
          question_answer_chain = create_stuff_documents_chain(llm2, prompt)
          rag_chain = create_retrieval_chain(retriever, question_answer_chain)
          result = rag_chain.invoke({"input": question, "query": question})
          # result = rag_chain.invoke({"query": question})
          params["chain"][str(i)]["AI"] = result["answer"].strip().replace( "'", "" ).replace( '"', '' )
          ai_context, ai_response = split_answer( result["answer"].strip(), flag_text )
          if "chain" not in params:
              params["chain"] = {}
          if i not in params["chain"]:
              params["chain"][i] = {}
          params["chain"][i]["AI"] = ai_response
          params["chain"][i]["AI_context"] = ai_context

          params = parse_context( str(i), result["context"], params)
          # ai = params["chain"][str(i)]["AI"]
          # print(f'Question: {question}')
          # print(f'Answer: {ai}')
          # print(type(ai))
          # context = result["context"]
          # print(f'Context: {context}')

          # docs = db.similarity_search(question, k=similarity_k)
          # docnames = [Path(doc.metadata["source"]).stem.strip("doc_") for doc in docs]
          # params["chain"][i]["similarity"] = "\n".join(docs)

      jsn = json.dumps(params, indent=4)
      print( jsn )
      return 

################################################################################
# environ["TRANSFORMERS_OFFLINE"] = "1"
environ["TRANSFORMERS_CACHE"] = "."
hf_token = "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"
arg_count = len(sys.argv)
if ( arg_count >= 2 ):
    with open( sys.argv[1] ) as json_file:
        params = json.load(json_file)

        # Create the LLM RAG vector store document embedding collection
        db = create_collection( params )

        # Query the LLM RAG collection
        run_llm_rag( params, hf_token, db ) 
else:
    print( 'python3 llm_rag_lc.py <JSON parameters>' )

