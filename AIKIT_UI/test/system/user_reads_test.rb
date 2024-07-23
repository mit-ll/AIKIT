require "application_system_test_case"

class UserReadsTest < ApplicationSystemTestCase
  setup do
    @user_read = user_reads(:one)
  end

  test "visiting the index" do
    visit user_reads_url
    assert_selector "h1", text: "User reads"
  end

  test "should create user read" do
    visit user_reads_url
    click_on "New user read"

    fill_in "Document", with: @user_read.document_id
    check "Is complete" if @user_read.is_complete
    fill_in "Page number", with: @user_read.page_number
    fill_in "Updated at", with: @user_read.updated_at
    fill_in "User", with: @user_read.user_id
    click_on "Create User read"

    assert_text "User read was successfully created"
    click_on "Back"
  end

  test "should update User read" do
    visit user_read_url(@user_read)
    click_on "Edit this user read", match: :first

    fill_in "Document", with: @user_read.document_id
    check "Is complete" if @user_read.is_complete
    fill_in "Page number", with: @user_read.page_number
    fill_in "Updated at", with: @user_read.updated_at
    fill_in "User", with: @user_read.user_id
    click_on "Update User read"

    assert_text "User read was successfully updated"
    click_on "Back"
  end

  test "should destroy User read" do
    visit user_read_url(@user_read)
    click_on "Destroy this user read", match: :first

    assert_text "User read was successfully destroyed"
  end
end
