import json
import os
from os import environ
import sys
import torch
import transformers
from transformers import AutoTokenizer, AutoModelForCausalLM, TextStreamer

################################################################################
# Author: Darrell O. Ricke, Ph.D.  (email: Darrell.Ricke@ll.mit.edu)
#
# RAMS request ID  1026639
# 
# DISTRIBUTION STATEMENT A. Approved for public release. Distribution is unlimited.
# This material is based upon work supported by the Department of the Air Force 
# under Air Force Contract No. FA8702-15-D-0001. Any opinions, findings, 
# conclusions or recommendations expressed in this material are those of the 
# author(s) and do not necessarily reflect the views of the Department of the 
# Air Force.
# 
# © 2024 Massachusetts Institute of Technology.
# 
# The software/firmware is provided to you on an As-ls basis
# Delivered to the U.S. Government with Unlimited Rights, as defined in 
# DFARS Part 252.227-7013 or 7014 (Feb 2014). Notwithstanding any copyright 
# notice, U.S. Government rights in this work are defined by DFARS 252.227-7013 
# or DFARS 252.227-7014 as detailed above. Use of this work other than as 
# specifically authorized by the U.S. Government may violate any copyrights that 
# exist in this work.
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

environ["TRANSFORMERS_OFFLINE"] = "1"
environ["TRANSFORMERS_CACHE"] = "/io"

################################################################################
def call_llm(model_id, question):
    hf_token = "hf_Y..."
    tokenizer = AutoTokenizer.from_pretrained(model_id, token=hf_token, load_in_16bit=True, trust_remote_code=False, device_map="auto", )
    
    pipeline = transformers.pipeline(
        "text-generation",
        model=model_id,
        tokenizer=tokenizer,
        torch_dtype=torch.bfloat16,
        trust_remote_code=False,
        device_map="auto",
    )

    sequences = pipeline(
        question,
        max_length=1000,
        do_sample=True,
        top_k=10,
        num_return_sequences=1,
        eos_token_id=tokenizer.eos_token_id,
    )
    for seq in sequences:
        return seq['generated_text']

################################################################################
environ["HF_HUB_CACHE"] = "/io/hub"
# if 'HF_TOKEN' in environ.keys():
#   hf_token = environ["HF_TOKEN"]
# else:
#     print("Please set your Huggingface key in the environment variable 'HF_TOKEN'")

arg_count = len(sys.argv)
if ( arg_count >= 1 ):
    with open( sys.argv[1] ) as json_file:
        params = json.load(json_file)

        model_id = params["llm_model"]
        questions = params["questions"]
        params["chain"] = {}
        for i in range(len(questions)):
            result = call_llm(model_id, questions[i]) 
            params["chain"][str(i)] = {}
            params["chain"][str(i)]["input"] = questions[i].replace( '"', '' )
            params["chain"][str(i)]["AI"] = result.strip().replace( "'", "" ).replace( '"', '' )

        jsn = json.dumps(params, indent=4)
        print( jsn )
