
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

class TestSetsController < ApplicationController
  before_action :set_test_set, only: %i[ show edit update take_test destroy ]

  ##############################################################################
  # GET /test_sets or /test_sets.json
  def index
    @test_sets = TestSet.all
  end

  ##############################################################################
  # GET /test_sets/1 or /test_sets/1.json
  def show
    @user = User.where( id: @test_set.user_id ).take
  end

  ##############################################################################
  # GET /test_sets/new
  def new
    @test_set = TestSet.new
  end

  ##############################################################################
  # GET /test_sets/1/edit
  def edit
    @user = User.where( id: @test_set.user_id ).take
  end

  ##############################################################################
  # POST /test_sets or /test_sets.json
  def create
    @test_set = TestSet.new(test_set_params)

    respond_to do |format|
      if @test_set.save
        format.html { redirect_to test_set_url(@test_set), notice: "Test set was successfully created." }
        format.json { render :show, status: :created, location: @test_set }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @test_set.errors, status: :unprocessable_entity }
      end
    end
  end

  ##############################################################################
  # PATCH/PUT /test_sets/1 or /test_sets/1.json
  def update
    respond_to do |format|
      if @test_set.update(test_set_params)
        format.html { redirect_to test_set_url(@test_set), notice: "Test set was successfully updated." }
        format.json { render :show, status: :ok, location: @test_set }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @test_set.errors, status: :unprocessable_entity }
      end
    end
  end

  ##############################################################################
  # POST
  def take_test
    user_test = UserTest.new
    user_test.user_id = session[:user_id]
    user_test.test_set_id = @test_set.id
    user_test.created_at = Time::now
    user_test.updated_at = Time::now
    user_test.save
    session[:user_test_id] = user_test.id
    session[:test_set_id] = @test_set.id

    # Generate template answers for each test question.
    questions = TestQuestion.where( test_set_id: @test_set.id ).to_a
    uq1 = nil
    previous = nil
    questions.each do |question|
      uq = UserQuestion.new
      uq.user_id = session[:user_id]
      uq.test_set_id = @test_set.id
      uq.user_test_id = user_test.id
      uq.test_question_id = question.id
      uq.test_date = user_test.created_at
      uq.save
      uq1 = uq if uq1.nil?

      if ! previous.nil?
        previous.next_id = uq.id
        previous.save
      end  # if
      previous = uq
    end  # do

    respond_to do |format|
      format.html { redirect_to edit_user_question_path(uq1), notice: "Starting #{@test_set.mqf_name}" }
      format.json { head :no_content }
    end
  end  # take_test

  ##############################################################################
  # DELETE /test_sets/1 or /test_sets/1.json
  def destroy
    @test_set.destroy

    respond_to do |format|
      format.html { redirect_to test_sets_url, notice: "Test set was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  ##############################################################################
  private
  ##############################################################################
    # Use callbacks to share common setup or constraints between actions.
    def set_test_set
      @test_set = TestSet.find(params[:id])
    end

  ##############################################################################
    # Only allow a list of trusted parameters through.
    def test_set_params
      params.require(:test_set).permit(:user_id, :mqf_name, :squadron, :source, :number_questions, :created_at, :updated_at)
    end
  ##############################################################################
end
