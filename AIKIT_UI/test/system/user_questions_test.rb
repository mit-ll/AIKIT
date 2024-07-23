require "application_system_test_case"

class UserQuestionsTest < ApplicationSystemTestCase
  setup do
    @user_question = user_questions(:one)
  end

  test "visiting the index" do
    visit user_questions_url
    assert_selector "h1", text: "User questions"
  end

  test "should create user question" do
    visit user_questions_url
    click_on "New user question"

    check "Is correct" if @user_question.is_correct
    fill_in "Question score", with: @user_question.question_score
    fill_in "Test date", with: @user_question.test_date
    fill_in "Test", with: @user_question.test_id
    fill_in "Test question", with: @user_question.test_question_id
    fill_in "User answer", with: @user_question.user_answer
    fill_in "User comment", with: @user_question.user_comment
    fill_in "User", with: @user_question.user_id
    click_on "Create User question"

    assert_text "User question was successfully created"
    click_on "Back"
  end

  test "should update User question" do
    visit user_question_url(@user_question)
    click_on "Edit this user question", match: :first

    check "Is correct" if @user_question.is_correct
    fill_in "Question score", with: @user_question.question_score
    fill_in "Test date", with: @user_question.test_date
    fill_in "Test", with: @user_question.test_id
    fill_in "Test question", with: @user_question.test_question_id
    fill_in "User answer", with: @user_question.user_answer
    fill_in "User comment", with: @user_question.user_comment
    fill_in "User", with: @user_question.user_id
    click_on "Update User question"

    assert_text "User question was successfully updated"
    click_on "Back"
  end

  test "should destroy User question" do
    visit user_question_url(@user_question)
    click_on "Destroy this user question", match: :first

    assert_text "User question was successfully destroyed"
  end
end
