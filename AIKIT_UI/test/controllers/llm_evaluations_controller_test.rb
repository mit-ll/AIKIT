require "test_helper"

class LlmEvaluationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @llm_evaluation = llm_evaluations(:one)
  end

  test "should get index" do
    get llm_evaluations_url
    assert_response :success
  end

  test "should get new" do
    get new_llm_evaluation_url
    assert_response :success
  end

  test "should create llm_evaluation" do
    assert_difference("LlmEvaluation.count") do
      post llm_evaluations_url, params: { llm_evaluation: { is_missing: @llm_evaluation.is_missing, is_modified: @llm_evaluation.is_modified, is_valid: @llm_evaluation.is_valid, llm_id: @llm_evaluation.llm_id, llm_text: @llm_evaluation.llm_text, test_id: @llm_evaluation.test_id, test_question_id: @llm_evaluation.test_question_id } }
    end

    assert_redirected_to llm_evaluation_url(LlmEvaluation.last)
  end

  test "should show llm_evaluation" do
    get llm_evaluation_url(@llm_evaluation)
    assert_response :success
  end

  test "should get edit" do
    get edit_llm_evaluation_url(@llm_evaluation)
    assert_response :success
  end

  test "should update llm_evaluation" do
    patch llm_evaluation_url(@llm_evaluation), params: { llm_evaluation: { is_missing: @llm_evaluation.is_missing, is_modified: @llm_evaluation.is_modified, is_valid: @llm_evaluation.is_valid, llm_id: @llm_evaluation.llm_id, llm_text: @llm_evaluation.llm_text, test_id: @llm_evaluation.test_id, test_question_id: @llm_evaluation.test_question_id } }
    assert_redirected_to llm_evaluation_url(@llm_evaluation)
  end

  test "should destroy llm_evaluation" do
    assert_difference("LlmEvaluation.count", -1) do
      delete llm_evaluation_url(@llm_evaluation)
    end

    assert_redirected_to llm_evaluations_url
  end
end
