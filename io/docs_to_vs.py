
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
# the Free Software Foundation, version 2 of the License.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
################################################################################

import json
import os
import os.path
import sys

from langchain_community.vectorstores import FAISS
from langchain_community.vectorstores import Chroma

from langchain_community.document_loaders import PyPDFLoader
from langchain_community.document_loaders import TextLoader
from langchain_community.document_loaders import UnstructuredExcelLoader
from langchain_community.document_loaders import UnstructuredImageLoader
# https://python.langchain.com/v0.1/docs/integrations/document_loaders/image_captions/
# from langchain_community.document_loaders import UnstructuredImageCaptionLoader
from langchain_community.document_loaders import UnstructuredPowerPointLoader
from langchain_community.document_loaders import UnstructuredTSVLoader
from langchain_community.document_loaders import UnstructuredWordDocumentLoader
from langchain_community.document_loaders import UnstructuredXMLLoader
# https://python.langchain.com/v0.1/docs/integrations/document_loaders/aws_s3_file/
from langchain_community.document_loaders import S3FileLoader
# https://python.langchain.com/v0.1/docs/integrations/document_loaders/aws_s3_directory/
from langchain_community.document_loaders import S3DirectoryLoader

from langchain.text_splitter import CharacterTextSplitter
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.embeddings.sentence_transformer import ( SentenceTransformerEmbeddings,)

from InputFile import InputFile

################################################################################
def read_file( filename ):
    doc_file = InputFile()
    doc_file.setFileName( filename )
    doc_file.openFile()
    contents = ""
    while doc_file.isEndOfFile() == 0:
        line = doc_file.nextLine()
        if ( line != "" ):
            contents += line + "\n"
    return contents

################################################################################
def read_file_list( filename ):
    names = []
    list_file = InputFile()
    list_file.setFileName( filename )
    list_file.openFile()
    while list_file.isEndOfFile() == 0:
        line = list_file.nextLine()
        if line != "":
            names.append( line )
    list_file.closeFile()
    return names

################################################################################
def create_vector_store( params ):
    doc_list = params["documents"]
    vector_store = params["vector_store"]
    collection = params["collection"]
    chunk_size = int(params["rag_params"]["chunk_size"])
    chunk_overlap = int(params["rag_params"]["chunk_overlap"])
    emb_model_name = params["rag_params"]["emb_model_name"]   # 'sentence-transformers/all-mpnet-base-v2'

    files = read_file_list( doc_list )
    print(f'Documents list name: {doc_list}' )
    print(f'Vector store name: {vector_store}')
    print(f'Collection name: {collection}' )
    documents = []
    txt_found = False
    for f in files:
        print( f'File name: {f}' )
        if f.endswith( ".pdf" ) or f.endswith( ".PDF" ):
            loader = PyPDFLoader( f )
            doc = loader.load()
            documents.extend(loader.load())
        if f.endswith( ".txt"):
            loader = TextLoader( f )
            doc = loader.load()
            documents.extend( doc )
            txt_found = True
        if f.endswith( ".jpg" ) or f.endswith( ".png" ) or f.endswith( ".JPG" ) or f.endswith( ".PNG" ):
            loader = UnstructuredImageLoader( f )
            doc = loader.load()
            documents.extend( doc )
        if f.endswith( ".doc" ) or f.endswith( ".docx" ) or f.endswith( ".DOC" ) or f.endswith( ".DOCX" ):
            loader = UnstructuredWordDocumentLoader( f )
            doc = loader.load()
            documents.extend( doc )
        if f.endswith( ".tsv" ) or f.endswith( ".TSV" ):
            loader = UnstructuredTSVLoader( file_path=f, mode="elements"  )
            doc = loader.load()
            documents.extend( doc )
        if f.endswith( ".ppt" ) or f.endswith( ".pptx" ) or f.endswith( ".PPT" ) or f.endswith( ".PPTX" ):
            loader = UnstructuredPowerPointLoader( f )
            doc = loader.load()
            documents.extend( doc )
        if f.endswith( ".xls" ) or f.endswith( ".xlsx" ) or f.endswith( ".XLS" ) or f.endswith( ".XLSX" ):
            loader = UnstructuredExcelLoader( f )
            doc = loader.load()
            documents.extend( doc )
        if f.endswith( ".xml" ) or f.endswith( ".XML" ):
            loader = UnstructuredXMLLoader( file_path=f, mode="elements"  )
            doc = loader.load()
            documents.extend( doc )

    if txt_found:
        text_splitter = RecursiveCharacterTextSplitter()
    else:
        text_splitter = CharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)

    chunked_documents = text_splitter.split_documents(documents)

    if vector_store == "FAISS":
        # Load chunked documents into the FAISS index
        db = FAISS.from_documents(chunked_documents,
            HuggingFaceEmbeddings(model_name=emb_model_name))

        db.save_local( collection )

    else:    # chromadb
        # emb_model_name = "all-MiniLM-L6-v2"
        embedding_function = SentenceTransformerEmbeddings(model_name=emb_model_name)
        # db = Chroma(persist_directory="/io/"+collection, embedding_function=embedding_function)
        db = Chroma(persist_directory="chroma_dbs/"+collection, embedding_function=embedding_function)

################################################################################
arg_count = len(sys.argv)
if ( arg_count >= 2 ):
    with open( sys.argv[1] ) as json_file:
        params = json.load(json_file)

        create_vector_store( params )
else:
    print( 'python3 docs_to_vs.py <JSON parameters file>' )
