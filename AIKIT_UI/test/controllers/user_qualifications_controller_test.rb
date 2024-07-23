require "test_helper"

class UserQualificationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user_qualification = user_qualifications(:one)
  end

  test "should get index" do
    get user_qualifications_url
    assert_response :success
  end

  test "should get new" do
    get new_user_qualification_url
    assert_response :success
  end

  test "should create user_qualification" do
    assert_difference("UserQualification.count") do
      post user_qualifications_url, params: { user_qualification: { date_qualified: @user_qualification.date_qualified, experience_level: @user_qualification.experience_level, qualification_id: @user_qualification.qualification_id, updated_training: @user_qualification.updated_training, user_id: @user_qualification.user_id } }
    end

    assert_redirected_to user_qualification_url(UserQualification.last)
  end

  test "should show user_qualification" do
    get user_qualification_url(@user_qualification)
    assert_response :success
  end

  test "should get edit" do
    get edit_user_qualification_url(@user_qualification)
    assert_response :success
  end

  test "should update user_qualification" do
    patch user_qualification_url(@user_qualification), params: { user_qualification: { date_qualified: @user_qualification.date_qualified, experience_level: @user_qualification.experience_level, qualification_id: @user_qualification.qualification_id, updated_training: @user_qualification.updated_training, user_id: @user_qualification.user_id } }
    assert_redirected_to user_qualification_url(@user_qualification)
  end

  test "should destroy user_qualification" do
    assert_difference("UserQualification.count", -1) do
      delete user_qualification_url(@user_qualification)
    end

    assert_redirected_to user_qualifications_url
  end
end
