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

import chromadb

from langchain_chroma import Chroma
from langchain_community.document_loaders import TextLoader
from langchain_community.embeddings.sentence_transformer import (
    SentenceTransformerEmbeddings,
)
# from langchain_text_splitters import CharacterTextSplitter
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
# from langchain_community.embeddings import HuggingFaceEmbeddings
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
#from langchain.embeddings.huggingface import HuggingFaceEmbeddings
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.prompts import PromptTemplate
from langchain.schema.runnable import RunnablePassthrough
from langchain_community.llms import HuggingFacePipeline
from langchain.chains import LLMChain, SimpleSequentialChain, RetrievalQA, ConversationalRetrievalChain
from langchain.schema import AIMessage, HumanMessage
from langchain.memory import ConversationBufferMemory

import nest_asyncio

from langchain_core.output_parsers import StrOutputParser

def format_docs(docs):
    return "\n\n".join([d.page_content for d in docs])

from langchain_core.runnables.base import Runnable, Input, Output
from context_cite import ContextCiter

class ContextCiteRunnable(Runnable):
    def __init__(self, model, tokenizer):
        self.model = model
        self.tokenizer = tokenizer

    def invoke(self, context_and_query: Input, _: Input) -> Output:
        context = context_and_query["context"]
        query = context_and_query["query"]
        print(f'QUERY ---------- {query}')
        print(f'CONTEXT ------ {context}')
        cc = ContextCiter(self.model, self.tokenizer, context, query)
        dfs = []
        i = 0 

        # split reponse into paragraphs
        # attribution scores are more meaningful wit h smaller response granularity (shorter sections of response)
        for paragraph in cc.response.split('\n'):
            print(f'********* {i}')
            print(paragraph)
            if len(paragraph) > 0:
                df = cc.get_attributions(as_dataframe=True, top_k=5, start_idx=i, end_idx=i+len(paragraph))
                df = df.data
                df['p']=paragraph
                dfs.append(df)
                i += len(paragraph)
        df = pd.concat(dfs)
        
        return cc.response,df

