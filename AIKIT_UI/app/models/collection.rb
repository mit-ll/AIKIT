require 'json'
require 'open3'
require 'output_file'

class Collection < ApplicationRecord

  VECTOR_STORES = ["chroma", "FAISS" ]

  ##############################################################################
  def self.set_rag_params( collection_name, vector_name, rag_parameter_set_id )
    rag_params = {}
    rag_params[ "documents" ] = "TEMP/#{collection_name}"
    rag_params[ "vector_store" ] = vector_name
    rag_params[ "collection" ] = collection_name
    rag_params[ "rag_params" ] = {}
    Parameter::RAG_PARAMS.each do |k, v|
      rag_params[ "rag_params" ][ k ] = v
    end  # do

    if ! rag_parameter_set_id.nil?
      parameters = Parameter.where( parameter_set_id: rag_parameter_set_id ).to_a
      parameters.each do |parameter|
        rag_params[ "rag_params" ][ parameter.parameter_name ] = parameter.parameter_value
      end  # do
    end  # if

    return rag_params
  end  # set_rag_params

  ##############################################################################
  def self.add_documents( doc_ids, collection_name, vector_name, user_id, rag_parameter_set_id )
    puts "Collection::add_documents"

    # Find or create the favorite list.
    collection = Collection.where( user_id: user_id, collection_name: collection_name ).take
    if collection.nil?
      collection = Collection.new
      collection.user_id = user_id
      collection.collection_name = collection_name
      collection.vector_name = vector_name
      collection.parameter_set_id = rag_parameter_set_id
      collection.save
    end  # if

    # Identify existing collection documents.
    collection_docs = CollectionDocument.where( user_id: user_id, collection_id: collection.id ).to_a
    fav_docs = {}
    collection_docs.each do |collection_doc|
      fav_docs[ collection_doc.document_id ] = collection_doc
    end  # do

    # Create the list of documents for the vector store.
    col_name = collection_name + "_list.txt"
    col_file = OutputFile.new( "TEMP/" + collection_name )
    col_file.open_file()

    # Add new collection_docs.
    doc_ids.each do |doc_id|
      if fav_docs[ doc_id.to_i ].nil?
        document = Document.where( id: doc_id ).take

        collection_doc = CollectionDocument.new
        collection_doc.user_id = user_id
        collection_doc.collection_id = collection.id
        collection_doc.document_id = doc_id
        collection_doc.filename = document.filename
        collection_doc.updated_at = Time::now
        collection_doc.save

        # Add the name to the list of collection documents.
        docname = Tools::clean_name( document.filename )
        col_file.write( "public/doc#{document.id}_#{docname}\n" )
        puts "add_documents: adding public/doc#{document.id}_#{docname}"
      end  # if
    end  # do
    col_file.close_file()

    # Set up the parameters to create the LLM RAG vector store collection.
    params = self.set_rag_params( collection_name, vector_name, rag_parameter_set_id )
    puts "params: #{params}"

    json_file = OutputFile.new( "TEMP/#{collection_name}.json" )
    json_file.open_file()
    json_file.write( "#{params.to_json}\n" )
    json_file.close_file()

    # Create the vector store.
    # stdout, stderr, status = Open3.capture3("python3 docs_to_vector.py TEMP/#{collection_name} #{vector_name} #{collection_name}")
    puts "******* Creating LLM RAG vector store collection TEMP/#{collection_name}.json"
    stdout, stderr, status = Open3.capture3("python3 docs_to_vs.py TEMP/#{collection_name}.json")
    puts ">>> stdout: #{stdout}"
    puts ">>> stderr: #{stderr}"
    puts ">>> status: #{status}"

    # if status == 0
      # File.unlink("TEMP/#{collection_name}.json") if File.exists?("TEMP/#{collection_name}.json")
    # end  # if
   
    return stderr 
  end  # add_documents

  ##############################################################################

end  # class
