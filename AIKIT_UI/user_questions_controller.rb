
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

class UserQuestionsController < ApplicationController
  before_action :set_user_question, only: %i[ show edit update destroy ]

  ##############################################################################
  # GET /user_questions or /user_questions.json
  def index
    @test_set = TestSet.where(id: session[:test_set_id]).take
    @test_questions = TestQuestion.where(test_set_id: session[:test_set_id]).to_a
    user_questions = UserQuestion.where(test_set_id: session[:test_set_id]).to_a
    @user_questions = {}
    user_questions.each do |user_question|
      @user_questions[ user_question.id ] = user_question
    end  # do
  end  # index

  ##############################################################################
  # GET /user_questions/1 or /user_questions/1.json
  def show
    @test_set = TestSet.where(id: @user_question.test_set_id).take
    @test_question = TestQuestion.where(id: @user_question.test_question_id).take
    @topic = Topic.where(id: @test_question.topic_id).take if ! @test_question.nil?
  end  # show

  ##############################################################################
  # GET /user_questions/new
  def new
    @user_question = UserQuestion.new
  end

  ##############################################################################
  # GET /user_questions/1/edit
  def edit
    @test_set = TestSet.where(id: @user_question.test_set_id).take
    @test_question = TestQuestion.where(id: @user_question.test_question_id).take
    @topic = Topic.where(id: @test_question.topic_id).take if ! @test_question.nil?
  end  # edit

  ##############################################################################
  # POST /user_questions or /user_questions.json
  def create
    @user_question = UserQuestion.new(user_question_params)

    respond_to do |format|
      if @user_question.save
        format.html { redirect_to user_question_url(@user_question), notice: "User question was successfully created." }
        format.json { render :show, status: :created, location: @user_question }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @user_question.errors, status: :unprocessable_entity }
      end
    end
  end

  ##############################################################################
  # PATCH/PUT /user_questions/1 or /user_questions/1.json
  def update
    respond_to do |format|
      if @user_question.update(user_question_params)
        format.html { 
          # Check for the last question
          if @user_question.next_id.nil?
            redirect_to user_questions_path
          else
            redirect_to edit_user_question_url(id: @user_question.next_id) 
          end  # if
        }
        format.json { render :show, status: :ok, location: @user_question }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @user_question.errors, status: :unprocessable_entity }
      end
    end
  end

  ##############################################################################
  # DELETE /user_questions/1 or /user_questions/1.json
  def destroy
    @user_question.destroy

    respond_to do |format|
      format.html { redirect_to user_questions_url, notice: "User question was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  ##############################################################################
  private
  ##############################################################################
    # Use callbacks to share common setup or constraints between actions.
    def set_user_question
      @user_question = UserQuestion.find(params[:id])
    end

  ##############################################################################
    # Only allow a list of trusted parameters through.
    def user_question_params
      params.require(:user_question).permit(:user_id, :test_set_id, :test_question_id, :user_test_id, :next_id, :user_answer, :is_correct, :question_score, :user_comment, :test_date)
    end
  ##############################################################################
end
