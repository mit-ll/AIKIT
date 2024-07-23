require "application_system_test_case"

class UserTestsTest < ApplicationSystemTestCase
  setup do
    @user_test = user_tests(:one)
  end

  test "visiting the index" do
    visit user_tests_url
    assert_selector "h1", text: "User tests"
  end

  test "should create user test" do
    visit user_tests_url
    click_on "New user test"

    fill_in "Number correct", with: @user_test.number_correct
    fill_in "Test set", with: @user_test.test_set_id
    fill_in "User", with: @user_test.user_id
    click_on "Create User test"

    assert_text "User test was successfully created"
    click_on "Back"
  end

  test "should update User test" do
    visit user_test_url(@user_test)
    click_on "Edit this user test", match: :first

    fill_in "Number correct", with: @user_test.number_correct
    fill_in "Test set", with: @user_test.test_set_id
    fill_in "User", with: @user_test.user_id
    click_on "Update User test"

    assert_text "User test was successfully updated"
    click_on "Back"
  end

  test "should destroy User test" do
    visit user_test_url(@user_test)
    click_on "Destroy this user test", match: :first

    assert_text "User test was successfully destroyed"
  end
end
