require "test_helper"

class CollectionDocumentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @collection_document = collection_documents(:one)
  end

  test "should get index" do
    get collection_documents_url
    assert_response :success
  end

  test "should get new" do
    get new_collection_document_url
    assert_response :success
  end

  test "should create collection_document" do
    assert_difference("CollectionDocument.count") do
      post collection_documents_url, params: { collection_document: { collection_id: @collection_document.collection_id, document_id: @collection_document.document_id, updated_at: @collection_document.updated_at, user_id: @collection_document.user_id } }
    end

    assert_redirected_to collection_document_url(CollectionDocument.last)
  end

  test "should show collection_document" do
    get collection_document_url(@collection_document)
    assert_response :success
  end

  test "should get edit" do
    get edit_collection_document_url(@collection_document)
    assert_response :success
  end

  test "should update collection_document" do
    patch collection_document_url(@collection_document), params: { collection_document: { collection_id: @collection_document.collection_id, document_id: @collection_document.document_id, updated_at: @collection_document.updated_at, user_id: @collection_document.user_id } }
    assert_redirected_to collection_document_url(@collection_document)
  end

  test "should destroy collection_document" do
    assert_difference("CollectionDocument.count", -1) do
      delete collection_document_url(@collection_document)
    end

    assert_redirected_to collection_documents_url
  end
end
