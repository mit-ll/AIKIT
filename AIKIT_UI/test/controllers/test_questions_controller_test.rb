require "test_helper"

class TestQuestionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @test_question = test_questions(:one)
  end

  test "should get index" do
    get test_questions_url
    assert_response :success
  end

  test "should get new" do
    get new_test_question_url
    assert_response :success
  end

  test "should create test_question" do
    assert_difference("TestQuestion.count") do
      post test_questions_url, params: { test_question: { answer: @test_question.answer, created_at: @test_question.created_at, llm_id: @test_question.llm_id, option_a: @test_question.option_a, option_b: @test_question.option_b, option_c: @test_question.option_c, option_d: @test_question.option_d, option_e: @test_question.option_e, option_f: @test_question.option_f, question: @test_question.question, reference: @test_question.reference, test_id: @test_question.test_id, updated_at: @test_question.updated_at } }
    end

    assert_redirected_to test_question_url(TestQuestion.last)
  end

  test "should show test_question" do
    get test_question_url(@test_question)
    assert_response :success
  end

  test "should get edit" do
    get edit_test_question_url(@test_question)
    assert_response :success
  end

  test "should update test_question" do
    patch test_question_url(@test_question), params: { test_question: { answer: @test_question.answer, created_at: @test_question.created_at, llm_id: @test_question.llm_id, option_a: @test_question.option_a, option_b: @test_question.option_b, option_c: @test_question.option_c, option_d: @test_question.option_d, option_e: @test_question.option_e, option_f: @test_question.option_f, question: @test_question.question, reference: @test_question.reference, test_id: @test_question.test_id, updated_at: @test_question.updated_at } }
    assert_redirected_to test_question_url(@test_question)
  end

  test "should destroy test_question" do
    assert_difference("TestQuestion.count", -1) do
      delete test_question_url(@test_question)
    end

    assert_redirected_to test_questions_url
  end
end
