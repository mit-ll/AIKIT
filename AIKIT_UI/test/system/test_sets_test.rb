require "application_system_test_case"

class TestSetsTest < ApplicationSystemTestCase
  setup do
    @test_set = test_sets(:one)
  end

  test "visiting the index" do
    visit test_sets_url
    assert_selector "h1", text: "Test sets"
  end

  test "should create test set" do
    visit test_sets_url
    click_on "New test set"

    fill_in "Create at", with: @test_set.create_at
    fill_in "Mfq name", with: @test_set.mfq_name
    fill_in "Number questions", with: @test_set.number_questions
    fill_in "Source", with: @test_set.source
    fill_in "Squadron", with: @test_set.squadron
    fill_in "Updated at", with: @test_set.updated_at
    fill_in "User", with: @test_set.user_id
    click_on "Create Test set"

    assert_text "Test set was successfully created"
    click_on "Back"
  end

  test "should update Test set" do
    visit test_set_url(@test_set)
    click_on "Edit this test set", match: :first

    fill_in "Create at", with: @test_set.create_at
    fill_in "Mfq name", with: @test_set.mfq_name
    fill_in "Number questions", with: @test_set.number_questions
    fill_in "Source", with: @test_set.source
    fill_in "Squadron", with: @test_set.squadron
    fill_in "Updated at", with: @test_set.updated_at
    fill_in "User", with: @test_set.user_id
    click_on "Update Test set"

    assert_text "Test set was successfully updated"
    click_on "Back"
  end

  test "should destroy Test set" do
    visit test_set_url(@test_set)
    click_on "Destroy this test set", match: :first

    assert_text "Test set was successfully destroyed"
  end
end
