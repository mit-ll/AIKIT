require "application_system_test_case"

class UserRolesTest < ApplicationSystemTestCase
  setup do
    @user_role = user_roles(:one)
  end

  test "visiting the index" do
    visit user_roles_url
    assert_selector "h1", text: "User roles"
  end

  test "should create user role" do
    visit user_roles_url
    click_on "New user role"

    fill_in "Role", with: @user_role.role_id
    fill_in "Role name", with: @user_role.role_name
    fill_in "User", with: @user_role.user_id
    click_on "Create User role"

    assert_text "User role was successfully created"
    click_on "Back"
  end

  test "should update User role" do
    visit user_role_url(@user_role)
    click_on "Edit this user role", match: :first

    fill_in "Role", with: @user_role.role_id
    fill_in "Role name", with: @user_role.role_name
    fill_in "User", with: @user_role.user_id
    click_on "Update User role"

    assert_text "User role was successfully updated"
    click_on "Back"
  end

  test "should destroy User role" do
    visit user_role_url(@user_role)
    click_on "Destroy this user role", match: :first

    assert_text "User role was successfully destroyed"
  end
end
