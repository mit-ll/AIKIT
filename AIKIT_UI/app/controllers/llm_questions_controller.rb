
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

MAX_LEVEL = 7   # AIKIT interface level

class LlmQuestionsController < ApplicationController
  before_action :set_llm_question, only: %i[ show edit query update destroy results download chain_download ]

  ##############################################################################
  # GET /llm_questions or /llm_questions.json
  def index
    if session[:level] >= 5 
      @llm_questions = LlmQuestion.where( user_id: session[:user_id] ).to_a
    else
      @llm_questions = LlmQuestion.all
    end  # if
  end  # index

  ##############################################################################
  # GET /llm_questions/1 or /llm_questions/1.json
  def show
    if ! @llm_question.chain_id.nil?
      @llm_questions = LlmQuestion.where( chain_id: @llm_question.chain_id ).order(:chain_order).to_a if ! @llm_question.chain_id.nil?
    else
      @llm_questions = [@llm_question]
    end  # if

    # Setup the hash of LLM models
    @llms = Llm.all
    @llm_names = {}
    @llms.each do |llm|
      @llm_names[ llm.id ] = llm.llm_name
    end  # do

    # Setup the hash of LLM (chain) responses by llm.id and llm_question.id
    @llm_responses = {}
    @llm_questions.each do |llm_question|
      responses = Response.where( llm_question_id: llm_question.id ).to_a
      responses.each do |response|
        @llm_responses[ response.llm_id ] = {} if @llm_responses[ response.llm_id ].nil?
        @llm_responses[ response.llm_id ][ response.llm_question_id ] = response
      end  # do
    end  # do 

    if session[:level] >= 5 
      @collections = Collection.where( user_id: session[:user_id] ).to_a
      @templates = Template.where( user_id: session[:user_id] ).to_a
      @parameter_sets = ParameterSet.where( user_id: session[:user_id], set_type: "LLM" ).to_a
    else
      @collections = Collection.all
      @templates = Template.all
      @parameter_sets = ParameterSet.all
    end  # if
 
    @template = Template.where(id: @llm_question.template_id).take if ! @llm_question.template_id.nil?

    @collections_hash = {}
    @collections.each do |collection|
      @collections_hash[ collection.id ] = collection
    end  # do
    @responses = Response.where( llm_question_id: @llm_question.id ).to_a
    @add_llm_questions = LlmQuestion.new
  end  # show

  ##############################################################################
  def query
    puts "******** query; params #{params}"
    llm_question_id = params[:id].to_i
    collection_id = params[:collection_id][:collection_id] if ! params[:collection_id].nil?
    # puts "****** collection_id: #{collection_id}"
    llm_id = params[:llm_id][:llm_id] if ! params[:llm_id].nil?
    parameter_set_id = params[:parameter_set_id][:parameter_set_id] if ! params[:parameter_set_id].nil?

    @llm_question = LlmQuestion.where(id: llm_question_id ).take
    @llm = Llm.where(id: llm_id).take if ! llm_id.nil?

    if llm_id.nil? || llm_id.size < 1
      puts "****** No LLM model selected"
      extend_chain( @llm_question )
      respond_to do |format|
        format.html { redirect_to llm_question_url(@llm_question), notice: "LlmQuestion(s) added." }
        format.json { render :show, status: :llm_question, location: @llm_question }
      end  # do
    else
      puts "****** Asking LLM question:::"
      llm_questions = nil
      llm_questions = LlmQuestion.where( chain_id: @llm_question.chain_id ).order(chain_order: :asc).to_a if ! @llm_question.chain_id.nil?
      err_status, llm_response = Ask::ask_llm_question( @llm_question, @llm, llm_questions, collection_id, parameter_set_id, llm_question_id )
      if err_status == "Server down"
        puts "***** Server is down *****"
        respond_to do |format|
          flash.alert = "This LLM server is currently down."
          format.html { redirect_to llm_question_url(@llm_question), notice: "LLM server is currently down." }
          format.json { render :show, status: :llm_question, location: @llm_question }
          return
        end  # do
      end  # if

      notice = err_status
      notice = notice[0..1024] if notice.size >= 1024
      if ! llm_questions.nil? && ! llm_response.nil? && ! llm_response["chain"].nil?
        # puts "***** Calling chain_responses next:"
        chain_responses( llm_response, llm_questions, @llm )
        notice = "LLM analysis complete."
      else
        # puts "***** Alternative to chain_responses: #{llm_response}"
        collection_parameter_set_id = nil
        collection = Collection.where( id: collection_id ).take
        collection_parameter_set_id = collection.parameter_set_id if ! collection.nil?
        llm_response_0 = ""
        llm_context_0 = ""
        if ! llm_response.nil? && ! llm_response["chain"].nil? && ! llm_response["chain"]["0"].nil?
          llm_response_0 = llm_response["chain"]["0"]["AI"] 
          puts "**** llm_response_0: #{llm_response_0}"
          ai_context = llm_response["chain"]["0"]["AI_context"]
          llm_context_0 = llm_response["chain"]["0"]["context"]
          response_rec = Response.create( user_id: @llm_question.user_id, llm_question_id: @llm_question.id,
              llm_id: @llm.id, 
              collection_id: collection_id,
              collection_parameter_set_id: collection_parameter_set_id,
              llm_parameter_set_id: parameter_set_id,
              response_text: llm_response_0,
              context: ai_context,
              created_at: Time::now )

          if ! llm_context_0.nil?
            llm_context_0.each do |source_order, source_context|
              page_content = source_context["page_content"]
              page = nil
              page = source_context["page"].to_i if ! source_context["page"].nil?
              document_name = source_context["source"]
              print "  source: #{document_name}, page: #{page}"
      
              source_rec = Source.create( user_id: @llm_question.user_id,
                llm_question_id: @llm_question.id,
                response_id: response_rec.id,
                source_order: source_order,
                document_name: document_name,
                page: page,
                page_content: page_content )
            end  # do
          end  # if

          notice = "LLM analysis complete."
        end  # if
      end  # if
      respond_to do |format|
        format.html { redirect_to llm_question_url(@llm_question), notice: notice }
        format.json { render :show, status: :llm_question, location: @llm_question }
      end  # do
    end  # if
  end  # query

  ##############################################################################
  # GET /llm_questions/new
  def new
    @llm_question = LlmQuestion.new
    @templates = Template.where(user_id: session[:user_id]).to_a
  end  # new

  ##############################################################################
  # GET /llm_questions/1/edit
  def edit
    @templates = Template.where( user_id: session[:user_id] ).to_a
  end  # edit

  ##############################################################################
  # POST /llm_questions or /llm_questions.json
  def create
    puts "******** llm_questions_controller: create called params: #{params}"
    @llm_question = LlmQuestion.new(llm_question_params)
    if ! params[:llm_question_id].nil?
      q = LlmQuestion.where(id: params[:llm_question_id]).take
      if ! q.nil?
        @llm_question.chain_id = q.chain_id
        @llm_question.template_id = q.template_id
      end  # if
    end  # if

    @llm_question.user_id = session[:user_id]
    @llm_question.chain_id = params[:chain_id] if ! params[:chain_id].nil?
    llm_question_form()

    @llm_question.updated_at = Time::now
    @llm_question.template_id = params[:template_id][:template_id] if ! params[:template_id].nil?

    respond_to do |format|
      if @llm_question.save
        format.html { redirect_to llm_question_url(@llm_question), notice: "LlmQuestion was successfully created." }
        format.json { render :show, status: :created, location: @llm_question }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @llm_question.errors, status: :unprocessable_entity }
      end  # if
    end  # do
  end  # create

  ##############################################################################
  def llm_question_form()
    puts "********** llm_question_form: params: #{params}"
    template_text = params[:template_text]
    prompt_input = params[:prompt_input]
    input_variables = params[:input_variables]
    template_id = nil
    if ! template_text.nil? && template_text.size > 1
      @template = Template::create(user_id: session[:user_id], template_text: template_text, prompt_input: prompt_input, input_variables: input_variables)
      template_id = @template.id
    else
      template_id = params[:template_id][:template_id] if ! params[:template_id].nil?
      @template = Template.where(id: template_id).take if ! template_id.nil? && template_id.size > 0
    end  # if

    chain = nil
    is_chain = params[:chain]
    chain_id = @llm_question.chain_id
    chain_order = 1
    if ! chain_id.nil?
      chain = Chain.where(id: chain_id).take
      if ! chain.nil?
        chain_order = chain.chain_order+1
        chain_id = chain.id
        is_chain = true
      end  # if
      puts "******** Existing chain, id: #{chain_id}, chain_order: #{chain_order}"
    else
      if is_chain
        chain = Chain::create( user_id: session[:user_id], chain_order: chain_order )
        chain_id = chain.id
        puts "******** New chain: id: #{chain_id}, chain_order: #{chain_order}"
      end  # if
    end  # if
    is_chain = true if ! is_chain.nil? && ! is_chain && ! chain.nil?

    llm_question_f = LlmQuestion.new(llm_question_params)
    llm_question_text = ""
    llm_question_text = llm_question_f.question_text if ! llm_question_f.nil?
    puts "********* llm_question_text: #{llm_question_text} ****"
    llm_questions = llm_question_text.split( "\n" )
    is_set = false
    if llm_questions.size > 1
      puts "********* llm_questions.size #{llm_questions.size}"
      llm_questions.each do |llm_question|
        if llm_question.size > 1
          q = LlmQuestion.new
          q.user_id = session[:user_id]
          q.question_text = llm_question.delete( "\r" )
          q.template_id = @template.id if ! @template.nil?
          q.chain_order = chain_order
          if is_chain
            puts "******** Updating chain_order to: #{chain_order}"
            chain.chain_order = chain_order
            chain.save
          end  # if
          chain_order += 1
          q.chain_id = chain_id
          q.save
          puts "********* LlmQuestion: id:|#{q.id}| llm_question:#{llm_question} user: #{q.user_id} template: #{q.template_id}, chain_order: #{q.chain_order}"
          if is_set == false
            @llm_question = q
            is_set = true
          end  # if
        end  # if
      end  # do
    else
      @llm_question.user_id = session[:user_id]
      @llm_question.template_id = template_id if ! template_id.nil? && template_id.size > 0
      @llm_question.question_text = llm_question_text
      @llm_question.chain_id = chain_id
      @llm_question.chain_order = chain_order
      @llm_question.save
      puts "********* llm_question saved: |#{@llm_question.id}| #{llm_question_text}, chain_id: #{chain_id}, chain_order: #{chain_order}"
      if ! chain.nil?
        chain.chain_order = chain_order
        chain.save
      end  # if
    end  # if
  end  # llm_question_form

  ##############################################################################
  # Adding llm_questions to an existing llm_questions chain.
  def extend_chain( llm_question )
    puts "*********** llm_question::extend_chain  params: #{params}"
    template_id = llm_question.template_id
    chain_id = llm_question.chain_id
    @chain = Chain.where(id: chain_id).take if ! chain_id.nil?
    chain_order = 1
    chain_order = @chain.chain_order+1 if ! @chain.nil?

    llm_question_text = ""
    llm_question_text = params[:question_text][:question_text] if ! params[:question_text].nil?
    llm_questions = llm_question_text.split( "\n" )
    if llm_questions.size > 1
      llm_questions.each do |llm_question|
        if llm_question.size > 1
          q = LlmQuestion.new
          q.user_id = session[:user_id]
          q.question_text = llm_question.delete( "\r" )
          q.template_id = template_id
          q.chain_order = chain_order
          if ! @chain.nil?
            @chain.chain_order = chain_order
            @chain.save
            puts "******* extend_chain: id: #{@chain.id}, order: #{@chain.chain_order}, user: #{@chain.user_id}"
            chain_order += 1
          end  # if
          q.chain_id = chain_id
          q.save
          puts "********* LlmQuestion: #{q.id} #{llm_question} user: #{q.user_id} template: #{q.template_id}"
        end  # if
      end
    end  # if
  end  # extend_chain

  ##############################################################################
  # PATCH/PUT /llm_questions/1 or /llm_questions/1.json
  def update
    respond_to do |format|
      if @llm_question.update(llm_question_params)
        @llm_question.updated_at = Time::now
        @llm_question.save
        format.html { redirect_to llm_question_url(@llm_question), notice: "LlmQuestion was successfully updated." }
        format.json { render :show, status: :ok, location: @llm_question }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @llm_question.errors, status: :unprocessable_entity }
      end
    end
  end

  ##############################################################################
  # DELETE /llm_questions/1 or /llm_questions/1.json
  def destroy
    # Also delete all of the responses for this question.
    responses = Response.where( llm_question_id: @llm_question.id ).to_a
    responses.each do |response|
      # Delete any document sources for this response.
      sources = Source.where( response_id: response.id ).to_a
      sources.each do |source|
        source.destroy
      end  # do
      response.destroy
    end  # do

    @llm_question.destroy

    respond_to do |format|
      format.html { redirect_to llm_questions_url, notice: "LlmQuestion was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  ##############################################################################
  def results
    puts "****** LlmQuestions.results called"
    @hits = Document.find_terms( @llm_question )
  end  # results

  #############################################################################
  def download
    send_data LlmQuestion.details(@llm_question), :type => 'text/plain', :disposition => 'attachment'
  end  # download

  #############################################################################
  def all
    send_data LlmQuestion.all_details(session[:user_id]), :type => 'text/plain', :disposition => 'attachment'
  end  # all

  #############################################################################
  def chain_download
    send_data LlmQuestion.chain_details(@llm_question), :type => 'text/plain', :disposition => 'attachment'
  end  # chain_download

  #############################################################################
  def level_minus
    session[:level] -= 1
    session[:level] = 0 if session[:level] < 0
    respond_to do |format|
      format.html { redirect_to llm_questions_url, notice: "Level down" }
      format.json { head :no_content }
    end  # do
  end  # level_minus

  #############################################################################
  def level_plus
    session[:level] += 1
    session[:level] = MAX_LEVEL if session[:level] > MAX_LEVEL
    respond_to do |format|
      format.html { redirect_to llm_questions_url, notice: "Level up" }
      format.json { head :no_content }
    end  # do
  end  # level_plus

  ##############################################################################
  def level_set
    session[:level] = params[:id].to_i
    respond_to do |format|
      format.html { redirect_to llm_questions_url, notice: "Level set to #{params[:id]}" }
      format.json { head :no_content }
    end  # do
  end  # level_set

  ##############################################################################
  def match_question( llm_question, query, llm_response, rag_context, llm, chain_order )
    return if llm_question.nil?
    puts "**** match_question ****"
    puts "Q1: |#{llm_question.question_text}|"
    puts "Q2: |#{query}|"
    if query == llm_question.question_text
      response_rec = Response.create( user_id: session[:user_id], 
        llm_question_id: llm_question.id,
        llm_id: llm.id, 
        chain_order: chain_order,
        response_text: llm_response.gsub("||","|").gsub("|","\n"),
        context: rag_context,
        created_at: Time::now )
    end  # if
  end  # match_question
      
  ##############################################################################
  def chain_responses( llm_response, llm_questions, llm )
    puts "***** llm_response: |#{llm_response}|"

    # Index hash by chain order index
    questions_llm = {}
    llm_questions.each do |llm_question|
      questions_llm[llm_question.chain_order.to_i] = llm_question
    end  # do

    for chain_order in llm_response["chain"].keys() do
      chain_i = chain_order.to_i
      question = llm_response["chain"][chain_order]["question"]
      ai_response = llm_response["chain"][chain_order]["AI"]
      ai_response = "" if ai_response.nil?
      context = llm_response["chain"][chain_order]["context"]
      ai_context = llm_response["chain"][chain_order]["AI_context"]

      print "question: " + question
      print "AI: " + ai_response

      response_rec = Response.create( user_id: session[:user_id], 
        llm_question_id: questions_llm[chain_i].id,
        llm_id: llm.id, 
        chain_order: chain_i,
        response_text: ai_response.gsub("||","|").gsub("|","\n"),
        context: ai_context,
        created_at: Time::now )

      context.each do |source_order, source_context|
        page_content = source_context["page_content"]
        page = nil
        page = source_context["page"].to_i if ! source_context["page"].nil?
        document_name = source_context["source"]
        print "  source: #{document_name}, page: #{page}"

        source_rec = Source.create( user_id: session[:user_id],
          llm_question_id: questions_llm[chain_i].id,
          response_id: response_rec.id,
          source_order: source_order,
          document_name: document_name,
          page: page,
          page_content: page_content )
      end  # do
    end  # do
  end  # chain_responses

  ##############################################################################
  private
  ##############################################################################
    # Use callbacks to share common setup or constraints between actions.
    def set_llm_question
      @llm_question = LlmQuestion.find(params[:id].to_i)
    end

  ##############################################################################
    # Only allow a list of trusted parameters through.
    def llm_question_params
      params.require(:llm_question).permit(:user_id, :folder_id, :template_id, :question_text, :question_name, :is_public, :updated_at, :chain_id, :chain_order, :collection_id, :llm_id, :parameter_set_id, :template_text, :flag_text, :prompt_input, :input_variables, :chat_prompt, :system_prompt )
    end  # llm_question_params
  ##############################################################################
end  # class
