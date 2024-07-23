
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

class UserTestsController < ApplicationController
  before_action :set_user_test, only: %i[ show edit update destroy ]

  ##############################################################################
  # GET /user_tests or /user_tests.json
  def index
    @user_tests = UserTest.where( user_id: session[:user_id] ).to_a
    test_sets = TestSet.where( user_id: session[:user_id] ).to_a
    @test_sets = {}
    test_sets.each do |test_set|
      @test_sets[ test_set.id ] = test_set
    end  # do

    # Check for Tests to score
    @user_tests.each do |user_test|
      correct, incorrect, unanswered, by_topic = user_test.score_test if user_test.number_correct.nil?
      user_test.number_correct = correct
      user_test.save
    end  # do
  end  # index

  ##############################################################################
  # GET /user_tests/1 or /user_tests/1.json
  def show
    @test_set = TestSet.where( id: @user_test.test_set_id ).take
    @correct, @incorrect, @unanswered, @by_topic =  @user_test.score_test 
    @user_test.number_correct = @correct
    @user_test.save
    @topics = Topic.where( test_set_id: @user_test.test_set_id ).to_a
  end  # show

  ##############################################################################
  # GET /user_tests/new
  def new
    @user_test = UserTest.new
  end

  ##############################################################################
  # GET /user_tests/1/edit
  def edit
  end

  ##############################################################################
  # POST /user_tests or /user_tests.json
  def create
    @user_test = UserTest.new(user_test_params)

    respond_to do |format|
      if @user_test.save
        format.html { redirect_to user_test_url(@user_test), notice: "User test was successfully created." }
        format.json { render :show, status: :created, location: @user_test }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @user_test.errors, status: :unprocessable_entity }
      end
    end
  end

  ##############################################################################
  # PATCH/PUT /user_tests/1 or /user_tests/1.json
  def update
    respond_to do |format|
      if @user_test.update(user_test_params)
        format.html { redirect_to user_test_url(@user_test), notice: "User test was successfully updated." }
        format.json { render :show, status: :ok, location: @user_test }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @user_test.errors, status: :unprocessable_entity }
      end
    end
  end

  ##############################################################################
  # DELETE /user_tests/1 or /user_tests/1.json
  def destroy
    @user_test.destroy

    respond_to do |format|
      format.html { redirect_to user_tests_url, notice: "User test was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  ##############################################################################
  private
  ##############################################################################
    # Use callbacks to share common setup or constraints between actions.
    def set_user_test
      @user_test = UserTest.find(params[:id])
    end

  ##############################################################################
    # Only allow a list of trusted parameters through.
    def user_test_params
      params.require(:user_test).permit(:user_id, :test_set_id, :number_correct, :created_at, :updated_at)
    end
  ##############################################################################
end
