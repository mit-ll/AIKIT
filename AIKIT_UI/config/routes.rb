
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

Rails.application.routes.draw do
  resources :sources
  resources :user_tests
  resources :user_tests do
    member do
      get :resume_test
      get :score_test
    end  # do
  end  # do
  resources :topics
  resources :images
  resources :images do
    member do
      get :show_image
    end  # do
  end  # do

  resources :roles
  resources :user_roles
  resources :user_roles do
    member do
      get :select
    end  # do
  end  # do

  resources :templates
  resources :chains
  resources :user_qualifications
  resources :responses
  resources :qualifications
  resources :parameters
  resources :parameter_sets

  resources :collection_documents
  resources :collections
  resources :llms
  resources :user_reads
  resources :llm_evaluations
  resources :test_sets
  resources :test_sets do
    member do
      get :take_test
    end  # do
  end  # do

  resources :user_questions
  resources :test_questions
  resources :differences
  resources :llm_questions
  resources :llm_questions do
    member do
      post :all
      get :chain_download
      get :download
      get :level_plus
      get :level_minus
      get :level_set
      post :query
    end  # do
  end  # do

  get 'favorite_lists/drop_favorite', controller: 'favorite_lists', action: 'drop_favorite', as: :drop_favorite
  resources :favorite_lists

  get 'favorites/drop_favorites', controller: 'favorites', action: 'drop_favorites', as: :drop_favorites
  get 'favorites/add_rag_collection', controller: 'favorites', action: 'add_rag_collection', as: :add_rag_collection
  resources :favorites
  resources :user_groups
  resources :groups
  resources :users
  resources :users do
    member do
      get :select
    end  # do
  end  # do

  get 'documents/add_collection', controller: 'documents', action: 'add_collection', as: :add_collection
  get 'documents/add_favorites', controller: 'documents', action: 'add_favorites', as: :add_favorites
  resources :documents
  resources :documents do
    member do
      get :download
      get :see
      post :send_pdf
    end  # do
  end  # do

  get 'folders/add_doc_collection', controller: 'folders', action: 'add_doc_collection', as: :add_doc_collection
  get 'folders/add_doc_favorites', controller: 'folders', action: 'add_doc_favorites', as: :add_doc_favorites
  resources :folders
  resources :attachments, only: [:index, :create]
  resources :attachments do
    member do
      post :index
      get :download
    end  # do
  end  # do

  root :to => "llm_questions#index"
end
