require "test_helper"

class DocumentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @document = documents(:one)
  end

  test "should get index" do
    get documents_url
    assert_response :success
  end

  test "should get new" do
    get new_document_url
    assert_response :success
  end

  test "should create document" do
    assert_difference("Document.count") do
      post documents_url, params: { document: { content_type: @document.content_type, contents: @document.contents, contents_byte: @document.contents_byte, file_parsed: @document.file_parsed, file_type: @document.file_type, filename: @document.filename, folder_id: @document.folder_id, is_private: @document.is_private, is_public: @document.is_public, pathname: @document.pathname, update_at: @document.update_at, user_id: @document.user_id } }
    end

    assert_redirected_to document_url(Document.last)
  end

  test "should show document" do
    get document_url(@document)
    assert_response :success
  end

  test "should get edit" do
    get edit_document_url(@document)
    assert_response :success
  end

  test "should update document" do
    patch document_url(@document), params: { document: { content_type: @document.content_type, contents: @document.contents, contents_byte: @document.contents_byte, file_parsed: @document.file_parsed, file_type: @document.file_type, filename: @document.filename, folder_id: @document.folder_id, is_private: @document.is_private, is_public: @document.is_public, pathname: @document.pathname, update_at: @document.update_at, user_id: @document.user_id } }
    assert_redirected_to document_url(@document)
  end

  test "should destroy document" do
    assert_difference("Document.count", -1) do
      delete document_url(@document)
    end

    assert_redirected_to documents_url
  end
end
