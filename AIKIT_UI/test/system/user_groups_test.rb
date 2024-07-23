require "application_system_test_case"

class UserGroupsTest < ApplicationSystemTestCase
  setup do
    @user_group = user_groups(:one)
  end

  test "visiting the index" do
    visit user_groups_url
    assert_selector "h1", text: "User groups"
  end

  test "should create user group" do
    visit user_groups_url
    click_on "New user group"

    fill_in "Group", with: @user_group.group_id
    fill_in "Role", with: @user_group.role
    fill_in "User", with: @user_group.user_id
    click_on "Create User group"

    assert_text "User group was successfully created"
    click_on "Back"
  end

  test "should update User group" do
    visit user_group_url(@user_group)
    click_on "Edit this user group", match: :first

    fill_in "Group", with: @user_group.group_id
    fill_in "Role", with: @user_group.role
    fill_in "User", with: @user_group.user_id
    click_on "Update User group"

    assert_text "User group was successfully updated"
    click_on "Back"
  end

  test "should destroy User group" do
    visit user_group_url(@user_group)
    click_on "Destroy this user group", match: :first

    assert_text "User group was successfully destroyed"
  end
end
