require "application_system_test_case"

class LlmEvaluationsTest < ApplicationSystemTestCase
  setup do
    @llm_evaluation = llm_evaluations(:one)
  end

  test "visiting the index" do
    visit llm_evaluations_url
    assert_selector "h1", text: "Llm evaluations"
  end

  test "should create llm evaluation" do
    visit llm_evaluations_url
    click_on "New llm evaluation"

    check "Is missing" if @llm_evaluation.is_missing
    check "Is modified" if @llm_evaluation.is_modified
    check "Is valid" if @llm_evaluation.is_valid
    fill_in "Llm", with: @llm_evaluation.llm_id
    fill_in "Llm text", with: @llm_evaluation.llm_text
    fill_in "Test", with: @llm_evaluation.test_id
    fill_in "Test question", with: @llm_evaluation.test_question_id
    click_on "Create Llm evaluation"

    assert_text "Llm evaluation was successfully created"
    click_on "Back"
  end

  test "should update Llm evaluation" do
    visit llm_evaluation_url(@llm_evaluation)
    click_on "Edit this llm evaluation", match: :first

    check "Is missing" if @llm_evaluation.is_missing
    check "Is modified" if @llm_evaluation.is_modified
    check "Is valid" if @llm_evaluation.is_valid
    fill_in "Llm", with: @llm_evaluation.llm_id
    fill_in "Llm text", with: @llm_evaluation.llm_text
    fill_in "Test", with: @llm_evaluation.test_id
    fill_in "Test question", with: @llm_evaluation.test_question_id
    click_on "Update Llm evaluation"

    assert_text "Llm evaluation was successfully updated"
    click_on "Back"
  end

  test "should destroy Llm evaluation" do
    visit llm_evaluation_url(@llm_evaluation)
    click_on "Destroy this llm evaluation", match: :first

    assert_text "Llm evaluation was successfully destroyed"
  end
end
