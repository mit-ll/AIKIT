require "application_system_test_case"

class FavoriteListsTest < ApplicationSystemTestCase
  setup do
    @favorite_list = favorite_lists(:one)
  end

  test "visiting the index" do
    visit favorite_lists_url
    assert_selector "h1", text: "Favorite lists"
  end

  test "should create favorite list" do
    visit favorite_lists_url
    click_on "New favorite list"

    fill_in "Folder", with: @favorite_list.folder_id
    check "Is private" if @favorite_list.is_private
    check "Is public" if @favorite_list.is_public
    fill_in "List name", with: @favorite_list.list_name
    fill_in "User", with: @favorite_list.user_id
    click_on "Create Favorite list"

    assert_text "Favorite list was successfully created"
    click_on "Back"
  end

  test "should update Favorite list" do
    visit favorite_list_url(@favorite_list)
    click_on "Edit this favorite list", match: :first

    fill_in "Folder", with: @favorite_list.folder_id
    check "Is private" if @favorite_list.is_private
    check "Is public" if @favorite_list.is_public
    fill_in "List name", with: @favorite_list.list_name
    fill_in "User", with: @favorite_list.user_id
    click_on "Update Favorite list"

    assert_text "Favorite list was successfully updated"
    click_on "Back"
  end

  test "should destroy Favorite list" do
    visit favorite_list_url(@favorite_list)
    click_on "Destroy this favorite list", match: :first

    assert_text "Favorite list was successfully destroyed"
  end
end
