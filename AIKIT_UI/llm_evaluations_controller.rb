
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

class LlmEvaluationsController < ApplicationController
  before_action :set_llm_evaluation, only: %i[ show edit update destroy ]

  # GET /llm_evaluations or /llm_evaluations.json
  def index
    @llm_evaluations = LlmEvaluation.all
  end

  # GET /llm_evaluations/1 or /llm_evaluations/1.json
  def show
  end

  # GET /llm_evaluations/new
  def new
    @llm_evaluation = LlmEvaluation.new
  end

  # GET /llm_evaluations/1/edit
  def edit
  end

  # POST /llm_evaluations or /llm_evaluations.json
  def create
    @llm_evaluation = LlmEvaluation.new(llm_evaluation_params)

    respond_to do |format|
      if @llm_evaluation.save
        format.html { redirect_to llm_evaluation_url(@llm_evaluation), notice: "Llm evaluation was successfully created." }
        format.json { render :show, status: :created, location: @llm_evaluation }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @llm_evaluation.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /llm_evaluations/1 or /llm_evaluations/1.json
  def update
    respond_to do |format|
      if @llm_evaluation.update(llm_evaluation_params)
        format.html { redirect_to llm_evaluation_url(@llm_evaluation), notice: "Llm evaluation was successfully updated." }
        format.json { render :show, status: :ok, location: @llm_evaluation }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @llm_evaluation.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /llm_evaluations/1 or /llm_evaluations/1.json
  def destroy
    @llm_evaluation.destroy

    respond_to do |format|
      format.html { redirect_to llm_evaluations_url, notice: "Llm evaluation was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_llm_evaluation
      @llm_evaluation = LlmEvaluation.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def llm_evaluation_params
      params.require(:llm_evaluation).permit(:llm_id, :test_set_id, :test_question_id, :question_number, :is_valid, :is_modified, :is_missing, :llm_text, :utility, :accuracy, :clarity)
    end
end