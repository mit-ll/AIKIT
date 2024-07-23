require "application_system_test_case"

class LlmsTest < ApplicationSystemTestCase
  setup do
    @llm = llms(:one)
  end

  test "visiting the index" do
    visit llms_url
    assert_selector "h1", text: "Llms"
  end

  test "should create llm" do
    visit llms_url
    click_on "New llm"

    fill_in "Llm name", with: @llm.llm_name
    fill_in "Llm version", with: @llm.llm_version
    fill_in "Updated at", with: @llm.updated_at
    click_on "Create Llm"

    assert_text "Llm was successfully created"
    click_on "Back"
  end

  test "should update Llm" do
    visit llm_url(@llm)
    click_on "Edit this llm", match: :first

    fill_in "Llm name", with: @llm.llm_name
    fill_in "Llm version", with: @llm.llm_version
    fill_in "Updated at", with: @llm.updated_at
    click_on "Update Llm"

    assert_text "Llm was successfully updated"
    click_on "Back"
  end

  test "should destroy Llm" do
    visit llm_url(@llm)
    click_on "Destroy this llm", match: :first

    assert_text "Llm was successfully destroyed"
  end
end
