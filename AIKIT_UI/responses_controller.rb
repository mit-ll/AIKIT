
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

class ResponsesController < ApplicationController
  before_action :set_response, only: %i[ show edit update destroy ]

  ##############################################################################
  def get_data
    @user = User.where( id: @response.user_id ).take
    @llm_question = LlmQuestion.where( id: @response.llm_question_id ).take
    @llm = Llm.where( id: @response.llm_id ).take
    @collection = Collection.where( id: @response.collection_id ).take if ! @response.collection_id.nil?
  end  # get_data

  ##############################################################################
  def get_lists
    if session[:level] >= 5
      question_list = LlmQuestion.where( user_id: session[:user_id] ).to_a
      collections = Collection.where( user_id: session[:user_id] ).to_a
    else
      question_list = LlmQuestion.all
      collections = Collection.all
    end  # if
    llm_list = Llm.all

    @llm_questions = {}
    question_list.each do |llm_question|
      @llm_questions[ llm_question.id ] = llm_question.question_text
    end  # do

    @llms = {}
    llm_list.each do |llm|
      @llms[ llm.id ] = llm.llm_name
    end  # do

    @collections = {}
    collections.each do |collection|
      @collections[ collection.id ] = collection
    end  # do
  end  # get_lists

  ##############################################################################
  # GET /responses or /responses.json
  def index
    if session[:level] >= 5
      @responses = Response.where( user_id: session[:user_id] ).to_a
    else
      @responses = Response.all
    end  # if
    get_lists
  end

  ##############################################################################
  # GET /responses/1 or /responses/1.json
  def show
    get_data
  end

  ##############################################################################
  # GET /responses/1 or /responses/1.json
  def query
    puts "**** Responses_controller.query called *****"
    puts "params: #{params}"
  end

  ##############################################################################
  # GET /responses/new
  def new
    @response = Response.new
  end

  ##############################################################################
  # GET /responses/1/edit
  def edit
  end

  ##############################################################################
  # POST /responses or /responses.json
  def create
    @response = Response.new(response_params)
    @response.user_id = session[:user_id]

    respond_to do |format|
      if @response.save
        format.html { redirect_to response_url(@response), notice: "Response was successfully created." }
        format.json { render :show, status: :created, location: @response }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @response.errors, status: :unprocessable_entity }
      end
    end
  end

  ##############################################################################
  # PATCH/PUT /responses/1 or /responses/1.json
  def update
    respond_to do |format|
      if @response.update(response_params)
        format.html { redirect_to response_url(@response), notice: "Response was successfully updated." }
        format.json { render :show, status: :ok, location: @response }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @response.errors, status: :unprocessable_entity }
      end
    end
  end

  ##############################################################################
  # DELETE /responses/1 or /responses/1.json
  def destroy
    # Delete all Document sources linked to this LLM RAG response
    sources = Source.where( response_id: @response.id ).to_a
    sources.each do |source|
      source.destroy
    end  # do

    @response.destroy!

    respond_to do |format|
      format.html { redirect_to responses_url, notice: "Response was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  ##############################################################################
  private
  ##############################################################################
    # Use callbacks to share common setup or constraints between actions.
    def set_response
      @response = Response.find(params[:id])
    end

  ##############################################################################
    # Only allow a list of trusted parameters through.
    def response_params
      params.require(:response).permit(:user_id, :llm_question_id, :llm_id, :chain_id, :collection_id, :collection_parameter_set_id, :llm_parameter_set_id, :chain_order, :response_text, :runtime, :created_at)
    end
  ##############################################################################
end
