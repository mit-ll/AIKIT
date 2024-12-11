require 'open3'

class DocumentsController < ApplicationController
  before_action :set_document, only: %i[ show edit update destroy see download send_pdf ]

  ##############################################################################
  # GET /documents or /documents.json
  def index
    @documents = Document.all

    # Identify existing favorite documents.
    fav_docs = Favorite.where( user_id: session[:user_id] ).to_a
    @favorites = {}
    fav_docs.each do |fav_doc|
      @favorites[ fav_doc.document_id ] = true
    end  # do

    # Setup the FavoriteList names
    favorite_lists = FavoriteList.where( user_id: session[:user_id] ).to_a
    list_names = {}
    favorite_lists.each do |item|
      list_names[ item.list_name ] = true
    end  # do
    list_names[ "default" ] = true
    @list_names = list_names.keys.sort

    @parameter_sets = ParameterSet.where( user_id: session[:user_id], set_type: "RAG" ).to_a
  end  # index

  ##############################################################################
  def add_collection
    puts "*******add_collection****************"
    puts params
    col_ids = params[:col_ids]
    if ! col_ids.nil?
      col_name = params[:col_name]
      vec_name = params[:vec_name]
      parameter_set_id = params[:parameter_set_id][:parameter_set_id] if ! params[:parameter_set_id].nil?
      Collection::add_documents( col_ids, col_name, vec_name, session[:user_id], parameter_set_id )
      respond_to do |format|
        format.html { redirect_to documents_url, notice: "Collection created." }
      end  # do
    else
      respond_to do |format|
        format.html { redirect_to documents_url, notice: "Notice that no documents were selected for collection." }
      end  # do
    end  # if
  end  # add_collection

  ##############################################################################
  def add_favorites
    commit = params[:commit]
    if commit == "Create collection"
      add_collection
    else
      puts "****** add_favorites, params: #{params}"
      doc_ids = params[:doc_ids]
      list_name = "default"
      list_name = params[:list_name] if ! params[:list_name].nil? && params[:list_name].length > 0
      fav_list_name = params[:fav_list_name]
      list_name = params[:fav_list_name] if ! fav_list_name.nil? && fav_list_name.length > 0
      Favorite::add_documents( doc_ids, list_name, session[:user_id] )
      respond_to do |format|
        if doc_ids.nil?
          format.html { redirect_to documents_url, notice: "Notice that no documents were selected for favorities." }
        else
          format.html { redirect_to documents_url, notice: "Favorites added." }
        end  # if
      end  # do
    end  # if
  end  # add_favorites

  ##############################################################################
  # GET /documents/1 or /documents/1.json
  def show
    @pdf_path = @document.doc_check()
  end  # show

  ##############################################################################
  # GET /documents/new
  def new
    @document = Document.new
  end

  ##############################################################################
  # GET /documents/1/edit
  def edit
  end

  ##############################################################################
  # POST /documents or /documents.json
  def create
    @document = Document.new(document_params)

    respond_to do |format|
      if @document.save
        format.html { redirect_to document_url(@document), notice: "Document was successfully created." }
        format.json { render :show, status: :created, location: @document }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @document.errors, status: :unprocessable_entity }
      end
    end
  end

  ##############################################################################
  # PATCH/PUT /documents/1 or /documents/1.json
  def update
    respond_to do |format|
      if @document.update(document_params)
        format.html { redirect_to document_url(@document), notice: "Document was successfully updated." }
        format.json { render :show, status: :ok, location: @document }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @document.errors, status: :unprocessable_entity }
      end
    end
  end

  ##############################################################################
  # DELETE /documents/1 or /documents/1.json
  def destroy
    @document.destroy

    respond_to do |format|
      format.html { redirect_to documents_url, notice: "Document was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  ##############################################################################
  def download
    # @document = Document.where(id: params[:id]).take
    docname = Tools::clean_name( @document.filename )
    puts "********** docname: #{docname} ************"

    path_name = @document.doc_check
    send_file("#{path_name}", :filename => @document.filename, :type => @document.content_type)
  end  # download

  ##############################################################################
  def send_pdf
    docname = Tools::clean_name( @document.filename )
    puts "********** docname: #{docname} ************"
    path_name = @document.doc_check
    send_file("#{path_name}", :file_name => @document.filename, :type => @document.content_type, :disposition => 'inline')
  end # see

  ##############################################################################
  def see
    docname = Tools::clean_name( @document.filename )
    puts "********** docname: #{docname} ************"
    path_name = @document.doc_check
    send_file("#{path_name}", :filename => docname, :type => @document.content_type, :disposition => 'inline')
  end # see

  ##############################################################################
  private
  ##############################################################################
    # Use callbacks to share common setup or constraints between actions.
    def set_document
      @document = Document.find(params[:id])
    end

  ##############################################################################
    # Only allow a list of trusted parameters through.
    def document_params
      params.require(:document).permit(:folder_id, :previous_id, :user_id, :filename, :pathname, :file_type, :content_type, :is_parsed, :is_public, :contents_byte, :contents, contents_ascii, :document_type, :is_current, :created_at, :updated_at, :parameter_set_id, :list_name, :fav_list_name, :doc_ids, :col_ids, :col_name, :vec_name, :commit)
    end

  ##############################################################################
end  # class
