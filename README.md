# AIKIT
**Artificial Intelligence Tools for Knowledge-Intensive Tasks (AIKIT)**

################################################################################
Author:		Darrell O. Ricke, Ph.D. (mailto: Darrell.Ricke@ll.mit.edu)
Copyright:	Copyright (c) 2024 Massachusetts Institute of Technology
License:	GNU GPL license (http://www.gnu.org/licenses/gpl.html)

RAMS request ID  1028809

DISTRIBUTION STATEMENT A. Approved for public release. Distribution is unlimited.
This material is based upon work supported by the Department of the Air Force 
under Air Force Contract No. FA8702-15-D-0001. Any opinions, findings, 
conclusions or recommendations expressed in this material are those of the 
author(s) and do not necessarily reflect the views of the Department of the 
Air Force.

© 2024 Massachusetts Institute of Technology.

Subject to FAR52.227-11 Patent Rights - Ownership by the contractor (May 2014)

The software/firmware is provided to you on an As-ls basis
Delivered to the U.S. Government with Unlimited Rights, as defined in 
DFARS Part 252.227-7013 or 7014 (Feb 2014). Notwithstanding any copyright 
notice, U.S. Government rights in this work are defined by DFARS 252.227-7013 
or DFARS 252.227-7014 as detailed above. Use of this work other than as 
specifically authorized by the U.S. Government may violate any copyrights that 
exist in this work.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, version 2 of the License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
################################################################################

**Summary**

  This is the Artificial Intelligence Tools for Knoledge-Intensive Tasks (AIKIT)
system.  AIKIT is packaged as both Docker and Singularity continers.  AIKIT 
includes Large Language Models (LLM), LangChain, Jupyter notebooks, 
Retrieval-Augmented Generation (RAG), and Ruby-on-Rails web interface.

**Setup**

  Customize AIKIT_UI/config/database.yml for your choice of relational database

  tar -cf AIKIT_UI.tar AIKIT_UI				# Note builds AIKIT_UI.tar file for the Ruby on Rails GUI

**Conda setup**

  cd aikit_conda

  sh < aikit_conda.cmds

**Singularity**

**To build:**

  singularity build aikit.sif aikit.def

  singularity build --sandbox aikit_box aikit.def			Note: builds Singularity sandbox

**To run:**

    singularity run --nv -B io/:/io/ -B <squashfs>:/io/hub/<model>:image-src=/ aikit.sif <Your program details>

**Example LLM Python application:**

    singularity run --nv -B io/:/io/ -B Llama-2-7b-chat-hf.sqsh:/io/hub/models--meta-llama--Llama-2-7b-chat-hf:image-src=/ aikit.sif python /io/llama2_cli.py "How to cook fish?"

**Jupyter notebook example:**

  singularity run --nv -B io/:/io/ -B falcon-7b.sqsh:/io/hub/models--tiiuae--falcon-7b:image-src=/ aikit_box jupyter notebook --allow-root --ip='*' --NotebookApp.token='' --NotebookApp.password=''

**Singularity AIKIT Rails interface example:**

  Place LLM models in io/hub

  singularity run --nv -B io/:/io/ aikit.sif "rails s -b 0.0.0.0"
  
  AIKIT web interface on port 3000 on hosting server

**Docker**

**To build:**

  docker build . -t aikit:latest 

**To run:**

  Note that Docker will accidently collide with the bridge network port, so the following file is highly recommended for running:

  ./docker_up.cmds

**Docker LLM Python example:**

  docker run --gpus all -v /data/da23452/llm/aikit/io:/io -v /data/da23452/llm/llama2/models--meta-llama--Llama-2-7b-chat-hf:/io/hub/models--meta-llama--Llama-2-7b-chat-hf aikit:latest python llama2_cli.py "How to cook pasta?"

**Example Jupyter notebook using LangChain:**

  LangChain_example.ipynb

**Docker AIKIT Rails interface example:**

  Place LLM models in io/hub

  docker run --gpus all -v ${PWD}/io:/io aikit:latest rails s -b 0.0.0.0

or

  docker volume create --name io -o type=none -o o=bind -o device=${PWD}/io

  ./docker_up.cmds
  
  AIKIT web interface on port 3000 on hosting server

**REST API Documentation:**

  The AIKIT REST API is a standard Ruby on Rails REST API.

  GET /<table>.json returns all records for a table
  GET /<table>/<id>.json returns the record with primary key <id>
  POST /<table>/<id>.json creates a new record from JSON parameters supplied
  PATCH/PUT /<table>/<id>.json updates an existing record with data from JSON parameters supplied

  Examples:
  POST /books/1.json  {"authenticity_token"=>"[FILTERED]", "book"=>{"title"=>"Book title", "pages"=>"12"}, "commit"=>"Create Book"}
  PATCH /books/1.json  {"authenticity_token"=>"[FILTERED]", "book"=>{"title"=>"Book title 2", "pages"=>"14"}, "commit"=>"Update Book", "id"=>"1"}

  Creating a vector store collection:
  GET /documents/add_favorites  {"utf8"=>"✓", "example_length"=>"10", "col_ids"=>["1", "2", "3", "4", "5", "6"], "fav_list_name"=>"", "list_name"=>"default", "col_name"=>"demo", "vec_name"=>"FAISS", "parameter_set_id"=>{"parameter_set_id"=>"2"}, "commit"=>"Create collection"}

  Running LLM RAG question(s):
  POST "/llm_questions/1/query  {"utf8"=>"✓", "authenticity_token"=>"JYaf...", "llm_id"=>{"llm_id"=>"4"}, "parameter_set_id"=>{"parameter_set_id"=>"1"}, "collection_id"=>{"collection_id"=>"1"}, "controller"=>"llm_questions", "action"=>"query", "id"=>"1"}

  AIKIT Table names are:
    chains                  groups             qualifications       user_groups
    collection_documents    images             responses            user_qualifications
    collections             layouts            roles                user_questions
    differences             llm_evaluations    sources              user_reads
    documents               llm_questions      templates            user_roles
    favorite_lists          llms               test_questions       user_tests
    favorites               parameter_sets     test_sets            users
    folders                 parameters         topics
    
