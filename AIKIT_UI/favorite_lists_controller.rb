
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

class FavoriteListsController < ApplicationController
  before_action :set_favorite_list, only: %i[ show edit update destroy ]

  ##############################################################################
  # GET /favorite_lists or /favorite_lists.json
  def index
    @favorite_lists = FavoriteList.where(user_id: session[:user_id]).to_a
  end  # index

  ##############################################################################
  # GET /favorite_lists/1 or /favorite_lists/1.json
  def show
    @favorites = Favorite.where(favorite_list_id: @favorite_list.id).to_a
    @documents = []
    @favorites.each do |favorite|
      doc = Document.where(id: favorite.document_id).take
      @documents << doc
    end  # do
    @parameter_sets = ParameterSet.where( user_id: session[:user_id], set_type: "RAG" ).to_a
  end  # show

  ##############################################################################
  # GET /favorite_lists/new
  def new
    @favorite_list = FavoriteList.new
  end  # new

  ##############################################################################
  # GET /favorite_lists/1/edit
  def edit
  end  # edit

  ##############################################################################
  # POST /favorite_lists or /favorite_lists.json
  def create
    @favorite_list = FavoriteList.new(favorite_list_params)

    respond_to do |format|
      if @favorite_list.save
        format.html { redirect_to favorite_list_url(@favorite_list), notice: "Favorite list was successfully created." }
        format.json { render :show, status: :created, location: @favorite_list }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @favorite_list.errors, status: :unprocessable_entity }
      end
    end
  end  # create

  ##############################################################################
  # PATCH/PUT /favorite_lists/1 or /favorite_lists/1.json
  def update
    respond_to do |format|
      if @favorite_list.update(favorite_list_params)
        format.html { redirect_to favorite_list_url(@favorite_list), notice: "Favorite list was successfully updated." }
        format.json { render :show, status: :ok, location: @favorite_list }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @favorite_list.errors, status: :unprocessable_entity }
      end
    end
  end  # update

  ##############################################################################
  def drop_favorite
    puts "******* params: #{params}"
    commit = params["commit"]
    puts "****** commit: |#{commit}|"
    if commit == "Create collection"
      add_rag_collection
    else
      doc_ids = params[:doc_ids]
      if ! doc_ids.nil?
        doc_ids.each do |doc_id|
          favorite = Favorite.where( document_id: doc_id ).take
          favorite.destroy
        end  # do
      end  # if
      respond_to do |format|
        format.html { redirect_to favorite_lists_url, notice: "Favorite list updated." }
      end  # do
    end  # if
  end  # drop_favorite

  ##############################################################################
  # DELETE /favorite_lists/1 or /favorite_lists/1.json
  def destroy
    favorites = Favorite.where( favorite_list_id: @favorite_list.id ).to_a
    favorites.each do |favorite|
      favorite.destroy
    end  # do

    @favorite_list.destroy

    respond_to do |format|
      format.html { redirect_to favorite_lists_url, notice: "Favorite list was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  ##############################################################################
  def add_rag_collection
    doc_ids = params[:col_ids]
    col_name = params[:col_name]
    vec_name = params[:vec_name]
    rag_set_id = params[:parameter_set_id]
    Collection::add_documents( doc_ids, col_name, vec_name, session[:user_id], rag_set_id )
    document = Document.where( id: doc_ids[0] ).take
    folder = Folder.where( id: document.folder_id ).take
    respond_to do |format|
      format.html { redirect_to favorite_lists_url, notice: "Collection created." }
    end  # do
  end  # add_rag_collection

  ##############################################################################
  private
  ##############################################################################
    # Use callbacks to share common setup or constraints between actions.
    def set_favorite_list
      @favorite_list = FavoriteList.find(params[:id])
    end

  ##############################################################################
    # Only allow a list of trusted parameters through.
    def favorite_list_params
      params.require(:favorite_list).permit(:user_id, :folder_id, :list_name, :is_public, :doc_ids, :col_ids, :col_name, :vec_name, :parameter_set_id, :commit)
    end
  ##############################################################################
end
