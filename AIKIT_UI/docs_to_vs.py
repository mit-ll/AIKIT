
################################################################################
# Authors: Darrell O. Ricke, Ph.D.  (email: Darrell.Ricke@ll.mit.edu)
#          Danielle Sullivan (email: Danielle.Sullivan@ll.mit.edu)
#          Manasi Sharma (email: Manasi.Sharma@ll.mit.edu)
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
from pathlib import Path
import sys

import torch
import soundfile
from transformers import Speech2TextProcessor, Speech2TextForConditionalGeneration
from transformers import AutoModelForSpeechSeq2Seq, AutoProcessor, pipeline
from transformers import Wav2Vec2Processor, HubertForCTC, Wav2Vec2ForCTC

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
from langchain_core.documents import Document

from langchain.text_splitter import CharacterTextSplitter
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
# from langchain_huggingface import HuggingFaceEmbeddings     # causes pydantic etc. errors
from langchain_community.embeddings.sentence_transformer import ( SentenceTransformerEmbeddings,)

from InputFile import InputFile
from extracted_image_loader import ExtractedImageLoader
from image_captions import ImageCaptionLoader

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
def check_parameter( params, key, default ):
    value = default
    if key in params.keys():
        value = params[ key ]
    return value

################################################################################
def whisper(data, samplerate = None):
    device = "cuda:0" if torch.cuda.is_available() else "cpu"
    torch_dtype = torch.float16 if torch.cuda.is_available() else torch.float32

    model_id = "openai/whisper-small" #whisper-large-v3"

    model = AutoModelForSpeechSeq2Seq.from_pretrained(
        model_id, torch_dtype=torch_dtype, low_cpu_mem_usage=True, use_safetensors=True
    )
    model.to(device)

    processor = AutoProcessor.from_pretrained(model_id, samplerate=samplerate)

    pipe = pipeline(
        "automatic-speech-recognition",
        model=model,
        tokenizer=processor.tokenizer,
        feature_extractor=processor.feature_extractor,
        torch_dtype=torch_dtype,
        device=device,
        # language='en',
    )

    result = pipe(data, return_timestamps=True)

    return result["text"]

################################################################################
def hubert(data, samplerate = None):
    processor = Wav2Vec2Processor.from_pretrained("facebook/hubert-large-ls960-ft")
    model = HubertForCTC.from_pretrained("facebook/hubert-large-ls960-ft")

    input_values = processor(data, return_tensors="pt", sampling_rate=samplerate).input_values  # Batch size 1
    logits = model(input_values).logits
    predicted_ids = torch.argmax(logits, dim=-1)
    transcription = processor.decode(predicted_ids[0]).lower()

    return transcription

################################################################################
def wav2vec2(data, samplerate = None):
    processor = Wav2Vec2Processor.from_pretrained("facebook/wav2vec2-base-960h")
    model = Wav2Vec2ForCTC.from_pretrained("facebook/wav2vec2-base-960h")

    # tokenize
    input_values = processor(data, return_tensors="pt", padding="longest", sampling_rate=samplerate).input_values  # Batch size 1

    # retrieve logits
    logits = model(input_values).logits

    # take argmax and decode
    predicted_ids = torch.argmax(logits, dim=-1)
    transcription = processor.batch_decode(predicted_ids)[0].lower()

    return transcription

################################################################################
def create_vector_store( params ):
    extract_caption = True
    if "extract_captions" in params.keys():
        extract_caption = bool(params["extract_captions"])

    persist_images = True
    if "persist_images" in params.keys():
        persist_images = bool(params["persist_images"])

    image_dir = check_parameter( params, "image_dir", "temp" )
    Path(image_dir).mkdir(parents=True, exist_ok=True)

    doc_list = check_parameter( params, "documents", "test.list" )
    vector_store = check_parameter( params, "vector_store", "FAISS" )
    collection = check_parameter( params, "collection", "vs_default" )

    chunk_size = 1024
    chunk_overlap = 40
    emb_model_name = "sentence-transformers/all-mpnet-base-vs"
    if "rag_params" in params.keys():
        chunk_size = int( check_parameter( params["rag_params"], "chunk_size", chunk_size ) )
        chunk_overlap = int( check_parameter( params["rag_params"], "chunk_overlap", chunk_overlap ) )
        emb_model_name = check_parameter( params["rag_params"], "emb_model_name", emb_model_name )

    files = read_file_list( doc_list )
    print(f'Documents list name: {doc_list}' )
    print(f'Vector store name: {vector_store}')
    print(f'Collection name: {collection}' )
    documents = []
    txt_found = False
    for f in files:
        print( f'File name: {f}' )
        if f.endswith( ".pdf" ) or f.endswith( ".PDF" ):
            # Community PDF text loader
            loader = PyPDFLoader( f )
            doc = loader.load()
            documents.extend(doc)
            # Extract and load images
            # loader = ExtractedImageLoader(f, image_dir, extract_caption, persist_images )
            # doc = loader.load()
            # documents.extend(doc)

        if f.endswith( ".txt"):
            loader = TextLoader( f )
            doc = loader.load()
            documents.extend( doc )
            txt_found = True
        if f.endswith( ".jpg" ) or f.endswith( ".png" ) or f.endswith( ".JPG" ) or f.endswith( ".PNG" ):
            # OCR
            loader = UnstructuredImageLoader( f )
            doc = loader.load()
            documents.extend( doc )
            # BLIP Caption
            if extract_caption:
                loader = ImageCaptionLoader(f)
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
            # Extract and load images
            # loader = ExtractedImageLoader(f, image_dir, extract_caption, persist_images )
            # doc = loader.load()
            # documents.extend(doc)

        if f.endswith( ".xls" ) or f.endswith( ".xlsx" ) or f.endswith( ".XLS" ) or f.endswith( ".XLSX" ):
            loader = UnstructuredExcelLoader( f )
            doc = loader.load()
            documents.extend( doc )
        if f.endswith( ".xml" ) or f.endswith( ".XML" ):
            loader = UnstructuredXMLLoader( file_path=f, mode="elements"  )
            doc = loader.load()
            documents.extend( doc )
        if f.endswith( ".wav" ) or f.endswith( ".mp3" ):
            data, samplerate = soundfile.read(f)
            if audio_model == "hubert":
                transcription = hubert(data, samplerate)
            elif audio_model == "wav2vec2":
                transcription = wav2vec2(data, samplerate)
            else:
                transcription = whisper(data, samplerate)
            doc = Document(page_content=transcription, metadata={'source': f})
            documents.extend( [doc] )

    if txt_found:
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    else:
        text_splitter = CharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)

    chunked_documents = text_splitter.split_documents(documents)

    if vector_store == "FAISS":
        # Load chunked documents into the FAISS index
        db = FAISS.from_documents(chunked_documents,
            HuggingFaceEmbeddings(model_name=emb_model_name))

        db.save_local( "/io/FAISS_dbs/"+collection )

    else:    # chromadb
        embedding_function = SentenceTransformerEmbeddings(model_name=emb_model_name)
        db = Chroma(persist_directory="/io/chroma_dbs/"+collection, embedding_function=embedding_function)

################################################################################
arg_count = len(sys.argv)
if ( arg_count >= 2 ):
    with open( sys.argv[1] ) as json_file:
        params = json.load(json_file)

        create_vector_store( params )
else:
    print( 'python3 docs_to_vs.py <JSON parameters file>' )
