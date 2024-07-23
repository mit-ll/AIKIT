require "application_system_test_case"

class TestQuestionsTest < ApplicationSystemTestCase
  setup do
    @test_question = test_questions(:one)
  end

  test "visiting the index" do
    visit test_questions_url
    assert_selector "h1", text: "Test questions"
  end

  test "should create test question" do
    visit test_questions_url
    click_on "New test question"

    fill_in "Answer", with: @test_question.answer
    fill_in "Created at", with: @test_question.created_at
    fill_in "Llm", with: @test_question.llm_id
    fill_in "Option a", with: @test_question.option_a
    fill_in "Option b", with: @test_question.option_b
    fill_in "Option c", with: @test_question.option_c
    fill_in "Option d", with: @test_question.option_d
    fill_in "Option e", with: @test_question.option_e
    fill_in "Option f", with: @test_question.option_f
    fill_in "Question", with: @test_question.question
    fill_in "Reference", with: @test_question.reference
    fill_in "Test", with: @test_question.test_id
    fill_in "Updated at", with: @test_question.updated_at
    click_on "Create Test question"

    assert_text "Test question was successfully created"
    click_on "Back"
  end

  test "should update Test question" do
    visit test_question_url(@test_question)
    click_on "Edit this test question", match: :first

    fill_in "Answer", with: @test_question.answer
    fill_in "Created at", with: @test_question.created_at
    fill_in "Llm", with: @test_question.llm_id
    fill_in "Option a", with: @test_question.option_a
    fill_in "Option b", with: @test_question.option_b
    fill_in "Option c", with: @test_question.option_c
    fill_in "Option d", with: @test_question.option_d
    fill_in "Option e", with: @test_question.option_e
    fill_in "Option f", with: @test_question.option_f
    fill_in "Question", with: @test_question.question
    fill_in "Reference", with: @test_question.reference
    fill_in "Test", with: @test_question.test_id
    fill_in "Updated at", with: @test_question.updated_at
    click_on "Update Test question"

    assert_text "Test question was successfully updated"
    click_on "Back"
  end

  test "should destroy Test question" do
    visit test_question_url(@test_question)
    click_on "Destroy this test question", match: :first

    assert_text "Test question was successfully destroyed"
  end
end
