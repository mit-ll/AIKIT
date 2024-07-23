
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

class AttachmentsController < ApplicationController
  ##############################################################################
  # GET /attachments
  # GET /attachments.xml
  def index
    @attachments = Attachment.find(:all, :order => :id)

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @attachments }
    end
  end

  ##############################################################################
  # GET /attachments/1
  # GET /attachments/1.xml
  def show
    @attachment = Attachment.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @attachment }
    end
  end

  ##############################################################################
  # GET /attachments/new
  # GET /attachments/new.xml
  def new
    @attachment = Attachment.new
    @table_types = TableType.find(:all).collect
    @folders = Folder.find(:all, :order => :folder_name)

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @attachment }
    end
  end

  ##############################################################################
  # GET /attachments/1/edit
  def edit
    @attachment = Attachment.find(params[:id])
    @table_types = TableType.find(:all).collect
    @users = User.find(:all, :order => :name)
    @folders = Folder.find(:all, :order => :folder_name)
  end

  ##############################################################################
  # POST /attachments
  # POST /attachments.xml
  def create
    @attachment = Attachment.new(params[:attachment])
    @attachment.file_type = 'Excel'
    @attachment.updated_at = Time::now
    text_file = params[:contents]
    txt_lines = text_file.read
    @attachment.file_name = text_file.original_filename

    respond_to do |format|
      if @attachment.save
 
        parser = TableLoader.new
        parser.load_table(txt_lines, @attachment.file_name, @attachment.id)
        @attachment.contents = ""  
        
        flash[:notice] = 'Attachment was successfully created.'
        format.html { redirect_to(@attachment) }
        format.xml  { render :xml => @attachment, :status => :created, :location => @attachment }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @attachment.errors, :status => :unprocessable_entity }
      end
    end
  end

  ##############################################################################
  # PUT /attachments/1
  # PUT /attachments/1.xml
  def update
    @attachment = Attachment.find(params[:id])
    @attachment.updated_at = Time::now

    respond_to do |format|
      if @attachment.update_attributes(params[:attachment])
        flash[:notice] = 'Attachment was successfully updated.'
        format.html { redirect_to(@attachment) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @attachment.errors, :status => :unprocessable_entity }
      end
    end
  end
  
  ##############################################################################
  def download
    @attachment = Attachment.find(params[:id])
    out = OutputFile.new(@attachment.file_name)
    out.open_file()
    out.zap(@attachment.contents)
    out.close_file()
    
    send_file(@attachment.file_name, :filename => @attachment.file_name, :type => @attachment.content_type)
  end  # download

  ##############################################################################
  # DELETE /attachments/1
  # DELETE /attachments/1.xml
  def destroy
    @attachment = Attachment.find(params[:id])
    @attachment.destroy

    respond_to do |format|
      format.html { redirect_to(attachments_url) }
      format.xml  { head :ok }
    end
  end
  ##############################################################################
end
