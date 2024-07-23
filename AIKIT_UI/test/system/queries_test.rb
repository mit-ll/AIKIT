require "application_system_test_case"

class QueriesTest < ApplicationSystemTestCase
  setup do
    @query = queries(:one)
  end

  test "visiting the index" do
    visit queries_url
    assert_selector "h1", text: "Queries"
  end

  test "should create query" do
    visit queries_url
    click_on "New query"

    fill_in "Folder", with: @query.folder_id
    check "Is private" if @query.is_private
    check "Is public" if @query.is_public
    fill_in "Look", with: @query.look
    fill_in "Match", with: @query.match
    fill_in "Op", with: @query.op
    fill_in "Query name", with: @query.query_name
    fill_in "Query sql", with: @query.query_sql
    fill_in "Updated at", with: @query.updated_at
    fill_in "User", with: @query.user_id
    click_on "Create Query"

    assert_text "Query was successfully created"
    click_on "Back"
  end

  test "should update Query" do
    visit query_url(@query)
    click_on "Edit this query", match: :first

    fill_in "Folder", with: @query.folder_id
    check "Is private" if @query.is_private
    check "Is public" if @query.is_public
    fill_in "Look", with: @query.look
    fill_in "Match", with: @query.match
    fill_in "Op", with: @query.op
    fill_in "Query name", with: @query.query_name
    fill_in "Query sql", with: @query.query_sql
    fill_in "Updated at", with: @query.updated_at
    fill_in "User", with: @query.user_id
    click_on "Update Query"

    assert_text "Query was successfully updated"
    click_on "Back"
  end

  test "should destroy Query" do
    visit query_url(@query)
    click_on "Destroy this query", match: :first

    assert_text "Query was successfully destroyed"
  end
end
