# AIKIT
**Artificial Intelligence Tools for Knowledge-Intensive Tasks (AIKIT)**

################################################################################
Author:		Darrell O. Ricke, Ph.D. (mailto: Darrell.Ricke@ll.mit.edu)
Copyright:	Copyright (c) 2024 Massachusetts Institute of Technology
License:	GNU GPL license (http://www.gnu.org/licenses/gpl.html)

RAMS request ID  1028310

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
the Free Software Foundation, either version 2 of the License, or
(at your option) any later version.

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

**Singularity Crystal LLM Rails interface example:**

  Place LLM models in io/hub

  singularity run --nv -B io/:/io/ --writable aikit_box "rails s -b 0.0.0.0"
  
  AIKIT web interface on port 3000 on hosting server

**Docker**

**To build:**

  docker build . -t aikit:latest 

**To run:**

  docker run -it aikit:latest bash

**Docker LLM Python example:**

  docker run --gpus all -v /data/da23452/llm/aikit/io:/io -v /data/da23452/llm/llama2/models--meta-llama--Llama-2-7b-chat-hf:/io/hub/models--meta-llama--Llama-2-7b-chat-hf aikit:latest python llama2_cli.py "How to cook pasta?"

**Example Jupyter notebook using LangChain:**

  LangChain_example.ipynb

**Docker Crystal LLM Rails interface example:**

  Place LLM models in io/hub

  docker run --gpus all -v ${PWD}/io:/io aikit:latest rails s -b 0.0.0.0

or

  docker volume create --name io -o type=none -o o=bind -o device=${PWD}/io

  docker-compose up
  
  AIKIT web interface on port 3000 on hosting server
