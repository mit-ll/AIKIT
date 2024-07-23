require "application_system_test_case"

class ParameterSetsTest < ApplicationSystemTestCase
  setup do
    @parameter_set = parameter_sets(:one)
  end

  test "visiting the index" do
    visit parameter_sets_url
    assert_selector "h1", text: "Parameter sets"
  end

  test "should create parameter set" do
    visit parameter_sets_url
    click_on "New parameter set"

    fill_in "Parameter", with: @parameter_set.parameter_id
    fill_in "Set name", with: @parameter_set.set_name
    fill_in "User", with: @parameter_set.user_id
    click_on "Create Parameter set"

    assert_text "Parameter set was successfully created"
    click_on "Back"
  end

  test "should update Parameter set" do
    visit parameter_set_url(@parameter_set)
    click_on "Edit this parameter set", match: :first

    fill_in "Parameter", with: @parameter_set.parameter_id
    fill_in "Set name", with: @parameter_set.set_name
    fill_in "User", with: @parameter_set.user_id
    click_on "Update Parameter set"

    assert_text "Parameter set was successfully updated"
    click_on "Back"
  end

  test "should destroy Parameter set" do
    visit parameter_set_url(@parameter_set)
    click_on "Destroy this parameter set", match: :first

    assert_text "Parameter set was successfully destroyed"
  end
end
