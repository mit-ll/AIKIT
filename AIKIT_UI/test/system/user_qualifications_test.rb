require "application_system_test_case"

class UserQualificationsTest < ApplicationSystemTestCase
  setup do
    @user_qualification = user_qualifications(:one)
  end

  test "visiting the index" do
    visit user_qualifications_url
    assert_selector "h1", text: "User qualifications"
  end

  test "should create user qualification" do
    visit user_qualifications_url
    click_on "New user qualification"

    fill_in "Date qualified", with: @user_qualification.date_qualified
    fill_in "Experience level", with: @user_qualification.experience_level
    fill_in "Qualification", with: @user_qualification.qualification_id
    fill_in "Updated training", with: @user_qualification.updated_training
    fill_in "User", with: @user_qualification.user_id
    click_on "Create User qualification"

    assert_text "User qualification was successfully created"
    click_on "Back"
  end

  test "should update User qualification" do
    visit user_qualification_url(@user_qualification)
    click_on "Edit this user qualification", match: :first

    fill_in "Date qualified", with: @user_qualification.date_qualified
    fill_in "Experience level", with: @user_qualification.experience_level
    fill_in "Qualification", with: @user_qualification.qualification_id
    fill_in "Updated training", with: @user_qualification.updated_training
    fill_in "User", with: @user_qualification.user_id
    click_on "Update User qualification"

    assert_text "User qualification was successfully updated"
    click_on "Back"
  end

  test "should destroy User qualification" do
    visit user_qualification_url(@user_qualification)
    click_on "Destroy this user qualification", match: :first

    assert_text "User qualification was successfully destroyed"
  end
end
