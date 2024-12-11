FROM ubuntu:23.10

MAINTAINER Darrell Ricke <Darrell.Ricke@ll.mit.edu>

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

ENV http_proxy="http://llproxy.llan.ll.mit.edu:8080"
ENV https_proxy="http://llproxy.llan.ll.mit.edu:8080"
ENV ftp_proxy="http://llproxy.llan.ll.mit.edu:8080"
ENV no_proxy=.ll.mit.edu,.mit.edu,localhost,127.0.0.1
COPY dependencies/apt.conf /etc/apt/apt.conf

ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8

# libcurl4-openssl-dev \
RUN apt-get update && apt-get install -y build-essential coreutils \
    wget bzip2 git g++ gfortran libreadline6-dev libncurses5-dev xorg-dev libpng-dev libbz2-dev \
    liblzma-dev libpcre3-dev make libcairo2-dev libgtk2.0-dev \
    locales libcurl4-nss-dev \
    language-pack-en language-pack-en-base \
    git curl unzip bc tabix \
    libssl-dev libgit2-dev libssh2-1-dev \
    gcc zip \
    python3.11 gcc zip python3-dev \
    zlib1g-dev libbz2-dev liblzma-dev pigz libncurses5-dev \
    libreadline-dev \
    openssl \
    gnupg2 \
    libmysqlclient-dev \
    nodejs \
    sqlite3 \
    ruby-full rubygems vim libyaml-dev libsqlite3-dev default-jre
RUN apt-get install -y libleptonica-dev tesseract-ocr libtesseract-dev python3-pil tesseract-ocr-eng tesseract-ocr-script-latn

RUN mkdir /S

RUN gem install bundler \
    && gem install mysql2 \
    && gem install sqlite3 \
    && gem install rake \
    && gem install tzinfo-data \
    && gem install rails

WORKDIR /S
RUN curl https://bootstrap.pypa.io/pip/3.6/get-pip.py -o get-pip.py \
    && python3 get-pip.py

COPY dependencies/wgetrc /etc
WORKDIR /S
# RUN cd /S && wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O /S/miniconda.sh
# RUN bash /S/miniconda.sh -b -p /S/miniconda/
# ENV PATH="/S/miniconda/bin/:$PATH"
# RUN export PATH="/S/miniconda/bin/:$PATH"

RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs > sh.rustup.rs \
    && chmod +x sh.rustup.rs \
    && ./sh.rustup.rs -y
ENV PATH=~/.cargo/bin:$PATH

# RUN conda create -n llama2
# RUN conda init bash
# RUN conda activate llama2
COPY dependencies/llms_requirements.txt /S
RUN pip install -r llms_requirements.txt 
RUN pip install ninja \
    && pip install llama-cpp-python \
    && pip install fastapi uvicorn sse-starlette requests 
RUN pip install numba

RUN pip install transformers \
    && pip install gradio \
    # && pip install langchain-community==0.2.1 langchain-core==0.2.2 \
    && pip install langchain-community langchain-core \
    && pip install langchain \
    && pip install "langserve[all]" \
    && pip install langchain_openai \
    && pip install langchainhub \
    && pip install langchain_huggingface \
    && pip install langgraph \
    && pip install scipy \
    && pip install einops \
    && pip install bitsandbytes \
    && pip install accelerate

RUN git clone https://github.com/facebookresearch/llama.git
WORKDIR /S/llama
RUN pip install .
WORKDIR /S
RUN curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | gpg --dearmor --no-tty -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
  && curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
    sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
    tee /etc/apt/sources.list.d/nvidia-container-toolkit.list \
  && \
    apt-get update
RUN apt-get install -y nvidia-container-toolkit

RUN pip install build \
    && pip install chromadb \
    && pip install datasets \
    && pip install faiss-cpu \
    && pip install langchain-chroma \
    && pip install langchain_mistralai \
    && pip install peft \
    && pip install pettingzoo \
    && pip install pypdf \
    && pip install pypdf[crypto]  

RUN pip install sentence-transformers \
    && pip install tensorflow \
    && pip install tokenizers \
    && pip install torch \
    && pip install tqdm \
    && pip install trl \
    && pip install "unstructured[all-docs]" \
    && pip install docx \
    && pip install "transformers[sentencepiece]" \
    && pip install langchain-huggingface \
    && pip install pytesseract \
    && pip install tf-keras \
    && pip install tensorrt

RUN pip install frontend \
    && pip install pymupdf \
    && pip install soundfile \
    && pip install speechbrain \
    && pip install librosa 

RUN pip install vllm \
    && pip install adapters \
    && pip install qdrant-client \
    && pip install langchain_core \
    && pip install langchain_experimental \
    && pip install langsmith

# RUN pip install tensorflow-gpu 

ENV HF_HOME=/io
ENV HF_HUB_CACHE=/io/hub
ENV HF_ASSETS_CACHE=/io/assets

COPY AIKIT_UI.tar /S
RUN tar -xf AIKIT_UI.tar
WORKDIR /S/AIKIT_UI
RUN bundle update
RUN rails db:migrate VERSION=0
RUN rails db:migrate

RUN rake assets:precompile RAILS_ENV=production
RUN rake assets:precompile RAILS_ENV=development

# ENV TRANSFORMERS_OFFLINE="1"
# ENV HF_DATASETS_OFFLINE="1"
# ENV HF_HUB_OFFLINE="1"
ENV SENTENCE_TRANSFORMERS_HOME=/io/Sentences

COPY dependencies/entrypoint.sh /usr/bin
RUN chmod +x /usr/bin/entrypoint.sh
RUN ln -s /usr/bin /usr/local/bin
# COPY dependencies/entrypoint.sh /usr/local/bin
# RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000
EXPOSE 7860
EXPOSE 8888
