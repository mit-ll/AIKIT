require "application_system_test_case"

class QueryParametersTest < ApplicationSystemTestCase
  setup do
    @query_parameter = query_parameters(:one)
  end

  test "visiting the index" do
    visit query_parameters_url
    assert_selector "h1", text: "Query parameters"
  end

  test "should create query parameter" do
    visit query_parameters_url
    click_on "New query parameter"

    fill_in "Parameter", with: @query_parameter.parameter_id
    fill_in "Query", with: @query_parameter.query_id
    fill_in "Updated at", with: @query_parameter.updated_at
    fill_in "User", with: @query_parameter.user_id
    click_on "Create Query parameter"

    assert_text "Query parameter was successfully created"
    click_on "Back"
  end

  test "should update Query parameter" do
    visit query_parameter_url(@query_parameter)
    click_on "Edit this query parameter", match: :first

    fill_in "Parameter", with: @query_parameter.parameter_id
    fill_in "Query", with: @query_parameter.query_id
    fill_in "Updated at", with: @query_parameter.updated_at
    fill_in "User", with: @query_parameter.user_id
    click_on "Update Query parameter"

    assert_text "Query parameter was successfully updated"
    click_on "Back"
  end

  test "should destroy Query parameter" do
    visit query_parameter_url(@query_parameter)
    click_on "Destroy this query parameter", match: :first

    assert_text "Query parameter was successfully destroyed"
  end
end
