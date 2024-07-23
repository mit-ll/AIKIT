require "test_helper"

class UserQuestionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user_question = user_questions(:one)
  end

  test "should get index" do
    get user_questions_url
    assert_response :success
  end

  test "should get new" do
    get new_user_question_url
    assert_response :success
  end

  test "should create user_question" do
    assert_difference("UserQuestion.count") do
      post user_questions_url, params: { user_question: { is_correct: @user_question.is_correct, question_score: @user_question.question_score, test_date: @user_question.test_date, test_id: @user_question.test_id, test_question_id: @user_question.test_question_id, user_answer: @user_question.user_answer, user_comment: @user_question.user_comment, user_id: @user_question.user_id } }
    end

    assert_redirected_to user_question_url(UserQuestion.last)
  end

  test "should show user_question" do
    get user_question_url(@user_question)
    assert_response :success
  end

  test "should get edit" do
    get edit_user_question_url(@user_question)
    assert_response :success
  end

  test "should update user_question" do
    patch user_question_url(@user_question), params: { user_question: { is_correct: @user_question.is_correct, question_score: @user_question.question_score, test_date: @user_question.test_date, test_id: @user_question.test_id, test_question_id: @user_question.test_question_id, user_answer: @user_question.user_answer, user_comment: @user_question.user_comment, user_id: @user_question.user_id } }
    assert_redirected_to user_question_url(@user_question)
  end

  test "should destroy user_question" do
    assert_difference("UserQuestion.count", -1) do
      delete user_question_url(@user_question)
    end

    assert_redirected_to user_questions_url
  end
end
