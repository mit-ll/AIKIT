
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

class FavoritesController < ApplicationController
  before_action :set_favorite, only: %i[ show edit update destroy ]

  ##############################################################################
  # GET /favorites or /favorites.json
  def index
    @favorites = Favorite.where( user_id: session[:user_id] ).to_a
    @documents = {}
    @favorites.each do |favorite|
      document = Document.where( id: favorite.document_id ).take
      @documents[ document.id ] = document
    end  # do
    @parameter_sets = ParameterSet.where( user_id: session[:user_id], set_type: "RAG" ).to_a
  end  # index

  ##############################################################################
  def drop_favorites
    puts "******** drop_favorites: params: #{params}"
    commit = params[:commit]
    puts "******** drop_favorites: commit: #{commit}"
    if commit == "Create collection"
      add_rag_collection
    else
      doc_ids = params[:doc_ids]
      doc_ids.each do |doc_id|
        favorite = Favorite.where( document_id: doc_id ).take
        favorite.destroy
      end  # do
      respond_to do |format|
        format.html { redirect_to favorites_url, notice: "Favorites list updated." }
      end  # do 
    end  # if
  end  # drop_favorites

  ##############################################################################
  # GET /favorites/1 or /favorites/1.json
  def show
    @parameter_sets = ParameterSet.where( user_id: session[:user_id], set_type: "RAG" ).to_a
  end  # show

  ##############################################################################
  # GET /favorites/new
  def new
    @favorite = Favorite.new
  end

  ##############################################################################
  # GET /favorites/1/edit
  def edit
  end

  ##############################################################################
  # POST /favorites or /favorites.json
  def create
    @favorite = Favorite.new(favorite_params)

    respond_to do |format|
      if @favorite.save
        format.html { redirect_to favorite_url(@favorite), notice: "Favorite was successfully created." }
        format.json { render :show, status: :created, location: @favorite }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @favorite.errors, status: :unprocessable_entity }
      end
    end
  end

  ##############################################################################
  # PATCH/PUT /favorites/1 or /favorites/1.json
  def update
    respond_to do |format|
      if @favorite.update(favorite_params)
        format.html { redirect_to favorite_url(@favorite), notice: "Favorite was successfully updated." }
        format.json { render :show, status: :ok, location: @favorite }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @favorite.errors, status: :unprocessable_entity }
      end
    end
  end

  ##############################################################################
  # DELETE /favorites/1 or /favorites/1.json
  def destroy
    @favorite.destroy

    respond_to do |format|
      format.html { redirect_to favorites_url, notice: "Favorite was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  ##############################################################################
  def add_rag_collection
    doc_ids = params[:doc_ids]
    col_name = params[:col_name]
    vec_name = params[:vec_name]
    rag_set_id = params[:parameter_set_id][:parameter_set_id] if ! params[:parameter_set_id].nil?
    Collection::add_documents( doc_ids, col_name, vec_name, session[:user_id], rag_set_id )
    document = Document.where( id: doc_ids[0] ).take
    folder = Folder.where( id: document.folder_id ).take
    respond_to do |format|
      format.html { redirect_to favorites_url, notice: "Collection created." }
    end  # do
  end  # add_rag_collection

  ##############################################################################
  private
  ##############################################################################
    # Use callbacks to share common setup or constraints between actions.
    def set_favorite
      @favorite = Favorite.find(params[:id])
    end

  ##############################################################################
    # Only allow a list of trusted parameters through.
    def favorite_params
      params.require(:favorite).permit(:user_id, :folder_id, :document_id, :favorite_list_id, :user_notified, :doc_ids, :col_ids, :col_name, :vec_name, :parameter_set_id, :commit)
    end
  ##############################################################################
end
