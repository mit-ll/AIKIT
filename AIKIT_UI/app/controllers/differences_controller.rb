
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

class DifferencesController < ApplicationController
  before_action :set_difference, only: %i[ show edit update destroy ]

  # GET /differences or /differences.json
  def index
    @differences = Difference.all
  end

  # GET /differences/1 or /differences/1.json
  def show
  end

  # GET /differences/new
  def new
    @difference = Difference.new
  end

  # GET /differences/1/edit
  def edit
  end

  # POST /differences or /differences.json
  def create
    @difference = Difference.new(difference_params)

    respond_to do |format|
      if @difference.save
        format.html { redirect_to difference_url(@difference), notice: "Difference was successfully created." }
        format.json { render :show, status: :created, location: @difference }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @difference.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /differences/1 or /differences/1.json
  def update
    respond_to do |format|
      if @difference.update(difference_params)
        format.html { redirect_to difference_url(@difference), notice: "Difference was successfully updated." }
        format.json { render :show, status: :ok, location: @difference }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @difference.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /differences/1 or /differences/1.json
  def destroy
    @difference.destroy

    respond_to do |format|
      format.html { redirect_to differences_url, notice: "Difference was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_difference
      @difference = Difference.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def difference_params
      params.require(:difference).permit(:folder_id, :docuent1_id, :document2_id, :filename, :file_type, :is_parsed, :is_public, :contents_bytes, :contents, :contents_ascii, :document_type, :created_at)
    end
end
