
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

class TestQuestionsController < ApplicationController
  before_action :set_test_question, only: %i[ show edit update destroy ]

  ##############################################################################3
  # GET /test_questions or /test_questions.json
  def index
    @test_questions = TestQuestion.all
    doc_ids = {}
    @test_questions.each do |tq|
      doc_ids[ tq.document_id ] = tq.document_id
    end  # do
    @documents = {}
    doc_ids.each do |doc_id|
      doc = Document.where( id: doc_id ).take
      @documents[ doc.id ] = doc if ! doc.nil?
    end  # do
  end  # index

  ##############################################################################3
  # GET /test_questions/1 or /test_questions/1.json
  def show
    @llm = Llm.where( id: @test_question.llm_id ).take if ! @test_question.llm_id.nil?
    @document = Document.where( id: @test_question.document_id ).take if ! @test_question.document_id.nil?
    @test_set = TestSet.where( id: @test_question.test_set_id ).take if ! @test_question.test_set_id.nil?
  end  # show

  ##############################################################################3
  # GET /test_questions/new
  def new
    @test_question = TestQuestion.new
  end

  ##############################################################################3
  # GET /test_questions/1/edit
  def edit
  end

  ##############################################################################3
  # POST /test_questions or /test_questions.json
  def create
    @test_question = TestQuestion.new(test_question_params)

    respond_to do |format|
      if @test_question.save
        format.html { redirect_to test_question_url(@test_question), notice: "Test question was successfully created." }
        format.json { render :show, status: :created, location: @test_question }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @test_question.errors, status: :unprocessable_entity }
      end
    end
  end

  ##############################################################################3
  # PATCH/PUT /test_questions/1 or /test_questions/1.json
  def update
    respond_to do |format|
      if @test_question.update(test_question_params)
        format.html { redirect_to test_question_url(@test_question), notice: "Test question was successfully updated." }
        format.json { render :show, status: :ok, location: @test_question }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @test_question.errors, status: :unprocessable_entity }
      end
    end
  end

  ##############################################################################3
  # DELETE /test_questions/1 or /test_questions/1.json
  def destroy
    @test_question.destroy

    respond_to do |format|
      format.html { redirect_to test_questions_url, notice: "Test question was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  ##############################################################################3
  private
  ##############################################################################3
    # Use callbacks to share common setup or constraints between actions.
    def set_test_question
      @test_question = TestQuestion.find(params[:id])
    end

  ##############################################################################3
    # Only allow a list of trusted parameters through.
    def test_question_params
      params.require(:test_question).permit(:test_set_id, :document_id, :llm_id, :topic_id, :previous_id, :next_id, :image_id, :image_text, :question, :question_number, :reference, :paragraph, :option_a, :option_b, :option_c, :option_d, :option_e, :option_f, :answer, :answer_option, :created_at, :updated_at)
    end
  ##############################################################################3
end
