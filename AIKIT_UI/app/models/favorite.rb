
###############################################################################
# **Author:**  Darrell O. Ricke, Ph.D.  (mailto: Darrell.Ricke@ll.mit.edu)
#  Copyright:  Copyright (c) 2024 Massachusetts Institute of Technology 
#  License:    GNU GPL license (http://www.gnu.org/licenses/gpl.html)  
# 
# **RAMS request ID 1028809** 
# **RAMS title: Artificial Intelligence tools for Knowledge-Intensive Tasks (AIKIT)
# 
# **Overview:**
# Artificial Intelligence tools for Knowledge-Intensive Tasks (AIKIT) including
# Large Language Models (LLM), LangChain, and Retrieval-Augmented Generation (RAG).
# 
# **Citation:** None
# 
# **Disclaimer:**
# DISTRIBUTION STATEMENT A. Approved for public release. Distribution is unlimited.
#
# This material is based upon work supported by the Department of the Air Force 
# under Air Force Contract No. FA8702-15-D-0001. Any opinions, findings, 
# conclusions or recommendations expressed in this material are those of the 
# author(s) and do not necessarily reflect the views of the Department of the Air Force. 
# 
# © 2024 Massachusetts Institute of Technology
#
# Subject to FAR52.227-11 Patent Rights - Ownership by the contractor (May 2014)
#
# The software/firmware is provided to you on an As-Is basis
# 
# Delivered to the U.S. Government with Unlimited Rights, as defined in DFARS
# Part 252.227-7013 or 7014 (Feb 2014). Notwithstanding any copyright notice,
# U.S. Government rights in this work are defined by DFARS 252.227-7013 or
# DFARS 252.227-7014 as detailed above. Use of this work other than as specifically
# authorized by the U.S. Government may violate any copyrights that exist in this work.
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, version 2 of the License.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
###############################################################################

class Favorite < ApplicationRecord

  ##############################################################################
  def self.add_documents( doc_ids, list_name, user_id )
    # Find or create the favorite list.
    favorite_list = FavoriteList.where( user_id: user_id, list_name: list_name ).take
    if favorite_list.nil?
      favorite_list = FavoriteList.new
      favorite_list.user_id = user_id
      favorite_list.list_name = list_name
      favorite_list.is_public = false
      favorite_list.save
    end  # if

    # Identify existing favorite documents.
    favorites = Favorite.where( user_id: user_id, favorite_list_id: favorite_list.id ).to_a
    fav_docs = {}
    favorites.each do |favorite|
      fav_docs[ favorite.document_id ] = favorite
    end  # do

    # Add new favorites.
    return if doc_ids.nil?
    doc_ids.each do |doc_id|
      if fav_docs[ doc_id.to_i ].nil?
        document = Document.where( id: doc_id ).take

        favorite = Favorite.new
        favorite.user_id = user_id
        favorite.favorite_list_id = favorite_list.id
        favorite.folder_id = document.folder_id
        favorite.document_id = doc_id
        favorite.user_notified = true
        favorite.save
      end  # if
    end  # do
  end  # add_documents

  ##############################################################################

end
