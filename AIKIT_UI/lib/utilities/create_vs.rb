
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
# the Free Software Foundation, version 2 of the License.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
################################################################################

###############################################################################
def create_vs_main( collection_name, top_folder, vs_param_set )
  # Check if collection has been created already
  # collection = Collection.where( collection_name: collection_name ).take
  # return if ! collection.nil?

  user = User.where( user_sid: "guest" ).take

  # Get all of the document ids
  docs = Document.where( top_folder: top_folder ).to_a
  doc_ids = []
  docs.each do |doc|
    doc_ids << doc.id
  end  # do
  docs = nil

  vector_name = "FAISS"

  rag_param_set = ParameterSet.where( set_name: vs_param_set ).take

  stderr = Collection::add_documents( doc_ids, collection_name, vector_name, user.id, rag_param_set.id )
  puts "stderr: #{stderr}"
end  # create_vs_main

###############################################################################
create_vs_main( ARGV[0], ARGV[1], "LLM RAG FAISS set1" )
