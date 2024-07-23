require "test_helper"

class UserTestsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user_test = user_tests(:one)
  end

  test "should get index" do
    get user_tests_url
    assert_response :success
  end

  test "should get new" do
    get new_user_test_url
    assert_response :success
  end

  test "should create user_test" do
    assert_difference("UserTest.count") do
      post user_tests_url, params: { user_test: { number_correct: @user_test.number_correct, test_set_id: @user_test.test_set_id, user_id: @user_test.user_id } }
    end

    assert_redirected_to user_test_url(UserTest.last)
  end

  test "should show user_test" do
    get user_test_url(@user_test)
    assert_response :success
  end

  test "should get edit" do
    get edit_user_test_url(@user_test)
    assert_response :success
  end

  test "should update user_test" do
    patch user_test_url(@user_test), params: { user_test: { number_correct: @user_test.number_correct, test_set_id: @user_test.test_set_id, user_id: @user_test.user_id } }
    assert_redirected_to user_test_url(@user_test)
  end

  test "should destroy user_test" do
    assert_difference("UserTest.count", -1) do
      delete user_test_url(@user_test)
    end

    assert_redirected_to user_tests_url
  end
end
