
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

class FoldersController < ApplicationController
  before_action :set_folder, only: %i[ show edit update destroy ]

  ##############################################################################
  # GET /folders or /folders.json
  def index
    @folders = Folder.all

    @folders_hash = {}
    @folders.each do |folder|
      @folders_hash[ folder.id ] = folder
    end  # do

    @parameter_sets = ParameterSet.where( user_id: session[:user_id], set_type: "RAG" ).to_a
  end  # index

  ##############################################################################
  # GET /folders/1 or /folders/1.json
  def show
    @documents = Document.where( folder_id: @folder.id ).to_a
    @folders = Folder.where( parent_id: @folder.id ).to_a
    favorites = Favorite.where( user_id: session[:user_id], folder_id: @folder.id ).to_a
    @favorites = {}
    favorites.each do |fav_doc|
      @favorites[ fav_doc.document_id ] = true
    end  # do
    @parameter_sets = ParameterSet.where( user_id: session[:user_id], set_type: "RAG" ).to_a
  end  # show

  ##############################################################################
  # GET /folders/new
  def new
    @folder = Folder.new
  end

  ##############################################################################
  # GET /folders/1/edit
  def edit
  end

  ##############################################################################
  # POST /folders or /folders.json
  def create
    @folder = Folder.new(folder_params)

    respond_to do |format|
      if @folder.save
        format.html { redirect_to folder_url(@folder), notice: "Folder was successfully created." }
        format.json { render :show, status: :created, location: @folder }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @folder.errors, status: :unprocessable_entity }
      end
    end
  end

  ##############################################################################
  # PATCH/PUT /folders/1 or /folders/1.json
  def update
    respond_to do |format|
      if @folder.update(folder_params)
        format.html { redirect_to folder_url(@folder), notice: "Folder was successfully updated." }
        format.json { render :show, status: :ok, location: @folder }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @folder.errors, status: :unprocessable_entity }
      end
    end
  end

  ##############################################################################
  def add_doc_collection
    puts "**** add_doc_collection"
    col_ids = params[:col_ids]
    col_name = params[:col_name]
    vec_name = params[:vec_name]
    rag_set_id = params[:parameter_set_id][:parameter_set_id] if ! params[:parameter_set_id].nil?
    Collection::add_documents( col_ids, col_name, vec_name, session[:user_id], rag_set_id )
    document = Document.where( id: col_ids[0] ).take
    folder = Folder.where( id: document.folder_id ).take
    respond_to do |format|
      format.html { redirect_to folder_url(folder), notice: "Collection created." }
    end  # do
  end  # add_doc_collection

  ##############################################################################
  def add_doc_favorites
    commit = params[:commit]
    if commit == "Create collection"
      add_doc_collection
    else
      doc_ids = params[:doc_ids]
      Favorite::add_documents( doc_ids, "default", session[:user_id] )
      document = Document.where( id: doc_ids[0] ).take
      folder = Folder.where( id: document.folder_id ).take
      respond_to do |format|
        format.html { redirect_to folder_url(folder), notice: "Favorites added." }
      end  # do
    end  # if
  end  # add_doc_favorites

  ##############################################################################
  # DELETE /folders/1 or /folders/1.json
  def destroy
    @folder.destroy

    respond_to do |format|
      format.html { redirect_to folders_url, notice: "Folder was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  ##############################################################################
  private
  ##############################################################################
    # Use callbacks to share common setup or constraints between actions.
    def set_folder
      @folder = Folder.find(params[:id])
    end

  ##############################################################################
    # Only allow a list of trusted parameters through.
    def folder_params
      params.require(:folder).permit(:parent_id, :user_id, :group_id, :path_name, :folder_name, :folder_level, :is_public, :group_write, :updated_at, :doc_ids, :col_ids, :col_name, :vec_name, :parameter_set_id, :commit)
    end
  ##############################################################################
end
