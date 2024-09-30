
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

class ParametersController < ApplicationController
  before_action :set_parameter, only: %i[ show edit update destroy ]

  #############################################################################
  # GET /parameters or /parameters.json
  def index
    @parameters = Parameter.where( user_id: session[:user_id] ).to_a
  end

  #############################################################################
  # GET /parameters/1 or /parameters/1.json
  def show
  end

  #############################################################################
  # GET /parameters/new
  def new
    @parameter = Parameter.new
  end

  #############################################################################
  # GET /parameters/1/edit
  def edit
  end

  #############################################################################
  # POST /parameters or /parameters.json
  def create
    @parameter = Parameter.new(parameter_params)

    respond_to do |format|
      if @parameter.save
        format.html { redirect_to parameter_url(@parameter), notice: "Parameter was successfully created." }
        format.json { render :show, status: :created, location: @parameter }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @parameter.errors, status: :unprocessable_entity }
      end
    end
  end

  #############################################################################
  # PATCH/PUT /parameters/1 or /parameters/1.json
  def update
    respond_to do |format|
      if @parameter.update(parameter_params)
        format.html { redirect_to parameter_set_url(id: @parameter.parameter_set_id), notice: "Parameter was successfully updated." }
        format.json { render :show, status: :ok, location: @parameter }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @parameter.errors, status: :unprocessable_entity }
      end
    end
  end

  #############################################################################
  # DELETE /parameters/1 or /parameters/1.json
  def destroy
    @parameter.destroy

    respond_to do |format|
      format.html { redirect_to parameters_url, notice: "Parameter was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  #############################################################################
  private
  #############################################################################
    # Use callbacks to share common setup or constraints between actions.
    def set_parameter
      @parameter = Parameter.find(params[:id])
    end

  #############################################################################
    # Only allow a list of trusted parameters through.
    def parameter_params
      params.require(:parameter).permit(:user_id, :parameter_set_id, :parameter_name, :parameter_value)
    end
  #############################################################################
end
