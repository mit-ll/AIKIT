require "application_system_test_case"

class ResponsesTest < ApplicationSystemTestCase
  setup do
    @response = responses(:one)
  end

  test "visiting the index" do
    visit responses_url
    assert_selector "h1", text: "Responses"
  end

  test "should create response" do
    visit responses_url
    click_on "New response"

    fill_in "Chain", with: @response.chain_id
    fill_in "Chain order", with: @response.chain_order
    fill_in "Created at", with: @response.created_at
    fill_in "Llm", with: @response.llm_id
    fill_in "Query", with: @response.query_id
    fill_in "Response text", with: @response.response_text
    fill_in "Runtime", with: @response.runtime
    click_on "Create Response"

    assert_text "Response was successfully created"
    click_on "Back"
  end

  test "should update Response" do
    visit response_url(@response)
    click_on "Edit this response", match: :first

    fill_in "Chain", with: @response.chain_id
    fill_in "Chain order", with: @response.chain_order
    fill_in "Created at", with: @response.created_at
    fill_in "Llm", with: @response.llm_id
    fill_in "Query", with: @response.query_id
    fill_in "Response text", with: @response.response_text
    fill_in "Runtime", with: @response.runtime
    click_on "Update Response"

    assert_text "Response was successfully updated"
    click_on "Back"
  end

  test "should destroy Response" do
    visit response_url(@response)
    click_on "Destroy this response", match: :first

    assert_text "Response was successfully destroyed"
  end
end
