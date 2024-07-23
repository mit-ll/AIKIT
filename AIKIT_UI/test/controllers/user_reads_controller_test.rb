require "test_helper"

class UserReadsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user_read = user_reads(:one)
  end

  test "should get index" do
    get user_reads_url
    assert_response :success
  end

  test "should get new" do
    get new_user_read_url
    assert_response :success
  end

  test "should create user_read" do
    assert_difference("UserRead.count") do
      post user_reads_url, params: { user_read: { document_id: @user_read.document_id, is_complete: @user_read.is_complete, page_number: @user_read.page_number, updated_at: @user_read.updated_at, user_id: @user_read.user_id } }
    end

    assert_redirected_to user_read_url(UserRead.last)
  end

  test "should show user_read" do
    get user_read_url(@user_read)
    assert_response :success
  end

  test "should get edit" do
    get edit_user_read_url(@user_read)
    assert_response :success
  end

  test "should update user_read" do
    patch user_read_url(@user_read), params: { user_read: { document_id: @user_read.document_id, is_complete: @user_read.is_complete, page_number: @user_read.page_number, updated_at: @user_read.updated_at, user_id: @user_read.user_id } }
    assert_redirected_to user_read_url(@user_read)
  end

  test "should destroy user_read" do
    assert_difference("UserRead.count", -1) do
      delete user_read_url(@user_read)
    end

    assert_redirected_to user_reads_url
  end
end
