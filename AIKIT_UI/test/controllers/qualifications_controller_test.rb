require "test_helper"

class QualificationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @qualification = qualifications(:one)
  end

  test "should get index" do
    get qualifications_url
    assert_response :success
  end

  test "should get new" do
    get new_qualification_url
    assert_response :success
  end

  test "should create qualification" do
    assert_difference("Qualification.count") do
      post qualifications_url, params: { qualification: { qualification_code: @qualification.qualification_code, qualification_name: @qualification.qualification_name } }
    end

    assert_redirected_to qualification_url(Qualification.last)
  end

  test "should show qualification" do
    get qualification_url(@qualification)
    assert_response :success
  end

  test "should get edit" do
    get edit_qualification_url(@qualification)
    assert_response :success
  end

  test "should update qualification" do
    patch qualification_url(@qualification), params: { qualification: { qualification_code: @qualification.qualification_code, qualification_name: @qualification.qualification_name } }
    assert_redirected_to qualification_url(@qualification)
  end

  test "should destroy qualification" do
    assert_difference("Qualification.count", -1) do
      delete qualification_url(@qualification)
    end

    assert_redirected_to qualifications_url
  end
end
