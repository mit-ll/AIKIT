################################################################################ 
# Author: Darrell O. Ricke, Ph.D.  (email: Darrell.Ricke@ll.mit.edu) 
# #         Danielle Sullivan (email: Danielle.Sullivan@ll.mit.edu)
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

import json
import os
import os.path
from os import environ
import pandas as pd
import sys
import time

import chromadb

from langchain_chroma import Chroma
from langchain_community.document_loaders import TextLoader
from langchain_community.embeddings.sentence_transformer import (
    SentenceTransformerEmbeddings,
)
# from langchain_text_splitters import CharacterTextSplitter
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import FAISS

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
# from langchain.embeddings.huggingface import HuggingFaceEmbeddings
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.prompts import PromptTemplate
from langchain.schema.runnable import RunnablePassthrough
from langchain_community.llms import HuggingFacePipeline
# from langchain_huggingface.llms import HuggingFacePipeline
from langchain.chains import LLMChain, SimpleSequentialChain, RetrievalQA, ConversationalRetrievalChain
from langchain.schema import AIMessage, HumanMessage
from langchain.memory import ConversationBufferMemory

import nest_asyncio

from langchain_core.output_parsers import StrOutputParser

from langchain_core.runnables.base import Runnable, Input, Output

################################################################################
def create_collection( params ):
    vector_store = params["vector_store"]
    rag_params = params["rag_params"]
    # print(f'rag_params: {rag_params}')

    emb_model_name = rag_params["emb_model_name"]
    collection = params["collection"]

    if vector_store == "FAISS":
        db = FAISS.load_local("/io/FAISS_dbs/"+collection,
            HuggingFaceEmbeddings(model_name=emb_model_name),
            allow_dangerous_deserialization=True)

    else:  # Chroma database
        embedding_function = SentenceTransformerEmbeddings(model_name=emb_model_name)
        db = Chroma(persist_directory="/io/chroma_dbs/"+collection, embedding_function=embedding_function)
    
    return db

################################################################################
def format_docs(docs):
    return "\n\n".join([d.page_content for d in docs])

################################################################################
def run_llm_rag( params, hf_token, db ):
    llm_params = params["llm_params"]
    model_name = params["llm_model"] 
    questions = params["questions"]
    
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

    qa_chain = RetrievalQA.from_chain_type(
        llm=llm2,
        chain_type="stuff",
        retriever=db.as_retriever(search_kwargs={"k": 5}),
        return_source_documents=False,
        chain_type_kwargs={"prompt": prompt},
    )

    for question in questions:
        start_time = time.time()
        result = qa_chain.invoke( {"input": question, "query": question} )
        end_time = time.time()
        elapsed_time = end_time - start_time
        result1 = result["result"].strip()

        print(f'{result1}')

################################################################################
# environ["TRANSFORMERS_OFFLINE"] = "1"
environ["TRANSFORMERS_CACHE"] = "."

environ["HF_KEY"] = "hf_Y..."
hf_token = "hf_Y..."
# if 'HF_KEY' in environ.keys():
#   hf_token = environ["HF_KEY"]
# else:
#     print("Please set your Huggingface key in the environment variable 'HF_KEY'")

arg_count = len(sys.argv)
if ( arg_count >= 2 ) and 'HF_KEY' in environ.keys():
    with open( sys.argv[1] ) as json_file:
        params = json.load(json_file)

        # Create the LLM RAG vector store document embedding collection
        db = create_collection( params )

        # Query the LLM RAG collection
        run_llm_rag( params, hf_token, db )
else:
    print( 'python3 llm_rag_auery.py <JSON parameters>' )

