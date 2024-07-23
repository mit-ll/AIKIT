
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

class ParameterSetsController < ApplicationController
  before_action :set_parameter_set, only: %i[ show edit update destroy ]

  #############################################################################
  # GET /parameter_sets or /parameter_sets.json
  def index
    @parameter_sets = ParameterSet.where( user_id: session[:user_id] ).to_a
  end

  #############################################################################
  # GET /parameter_sets/1 or /parameter_sets/1.json
  def show
    @parameters = Parameter.where( parameter_set_id: @parameter_set.id ).to_a
  end  # show

  #############################################################################
  # GET /parameter_sets/new
  def new
    @parameter_set = ParameterSet.new
  end

  #############################################################################
  # GET /parameter_sets/1/edit
  def edit
  end

  #############################################################################
  def set_parameters( parameter_set, tag, keys, vals )
    puts "**** set_parameters: keys: #{keys}"
    puts "**** set_parameters: vals: #{vals}"
    for i in 0...keys.size do
      # Skip blank keys
      if keys[i].size > 0
        parameter = Parameter.new
        parameter.user_id = session[:user_id]
        parameter.parameter_set_id = parameter_set.id
        parameter.parameter_name = keys[i]
        parameter.parameter_value = vals[i] if i < vals.size
        parameter.save
      end  # if
    end  # for
  end  # set_parameters

  #############################################################################
  # POST /parameter_sets or /parameter_sets.json
  def create
    puts "****** parameter_set.create params: #{params}"

    @parameter_set = ParameterSet.new(parameter_set_params)
    @parameter_set.user_id = session[:user_id]
    @parameter_set.set_type = "LLM"

    respond_to do |format|
      if @parameter_set.save
        set_parameters( @parameter_set, "LLM", params[:llm_key], params[:llm_val] )
        @rag_parameter_set = ParameterSet.new
        @rag_parameter_set.user_id = session[:user_id]
        @rag_parameter_set.set_name = @parameter_set.set_name
        @rag_parameter_set.set_type = "RAG"
        @rag_parameter_set.save
        set_parameters( @rag_parameter_set, "RAG", params[:rag_key], params[:rag_val] )
        format.html { redirect_to parameter_set_url(@parameter_set), notice: "Parameter set was successfully created." }
        format.json { render :show, status: :created, location: @parameter_set }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @parameter_set.errors, status: :unprocessable_entity }
      end
    end
  end

  #############################################################################
  # PATCH/PUT /parameter_sets/1 or /parameter_sets/1.json
  def update
    respond_to do |format|
      if @parameter_set.update(parameter_set_params)
        format.html { redirect_to parameter_set_url(@parameter_set), notice: "Parameter set was successfully updated." }
        format.json { render :show, status: :ok, location: @parameter_set }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @parameter_set.errors, status: :unprocessable_entity }
      end
    end
  end

  #############################################################################
  # DELETE /parameter_sets/1 or /parameter_sets/1.json
  def destroy
    @parameter_set.destroy

    respond_to do |format|
      format.html { redirect_to parameter_sets_url, notice: "Parameter set was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  #############################################################################
  private
  #############################################################################
    # Use callbacks to share common setup or constraints between actions.
    def set_parameter_set
      @parameter_set = ParameterSet.find(params[:id])
    end

  #############################################################################
    # Only allow a list of trusted parameters through.
    def parameter_set_params
      params.require(:parameter_set).permit(:user_id, :set_name, :set_type, :llm_key, :llm_val, :rag_key, :rag_val)
    end
  #############################################################################
end
