require "test_helper"

class DifferencesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @difference = differences(:one)
  end

  test "should get index" do
    get differences_url
    assert_response :success
  end

  test "should get new" do
    get new_difference_url
    assert_response :success
  end

  test "should create difference" do
    assert_difference("Difference.count") do
      post differences_url, params: { difference: { contents: @difference.contents, contents_ascii: @difference.contents_ascii, contents_bytes: @difference.contents_bytes, created_at: @difference.created_at, docuent1_id: @difference.docuent1_id, document2_id: @difference.document2_id, document_type: @difference.document_type, file_type: @difference.file_type, filename: @difference.filename, folder_id: @difference.folder_id, is_parsed: @difference.is_parsed, is_private: @difference.is_private, is_public: @difference.is_public } }
    end

    assert_redirected_to difference_url(Difference.last)
  end

  test "should show difference" do
    get difference_url(@difference)
    assert_response :success
  end

  test "should get edit" do
    get edit_difference_url(@difference)
    assert_response :success
  end

  test "should update difference" do
    patch difference_url(@difference), params: { difference: { contents: @difference.contents, contents_ascii: @difference.contents_ascii, contents_bytes: @difference.contents_bytes, created_at: @difference.created_at, docuent1_id: @difference.docuent1_id, document2_id: @difference.document2_id, document_type: @difference.document_type, file_type: @difference.file_type, filename: @difference.filename, folder_id: @difference.folder_id, is_parsed: @difference.is_parsed, is_private: @difference.is_private, is_public: @difference.is_public } }
    assert_redirected_to difference_url(@difference)
  end

  test "should destroy difference" do
    assert_difference("Difference.count", -1) do
      delete difference_url(@difference)
    end

    assert_redirected_to differences_url
  end
end
