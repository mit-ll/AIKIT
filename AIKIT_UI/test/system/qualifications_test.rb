require "application_system_test_case"

class QualificationsTest < ApplicationSystemTestCase
  setup do
    @qualification = qualifications(:one)
  end

  test "visiting the index" do
    visit qualifications_url
    assert_selector "h1", text: "Qualifications"
  end

  test "should create qualification" do
    visit qualifications_url
    click_on "New qualification"

    fill_in "Qualification code", with: @qualification.qualification_code
    fill_in "Qualification name", with: @qualification.qualification_name
    click_on "Create Qualification"

    assert_text "Qualification was successfully created"
    click_on "Back"
  end

  test "should update Qualification" do
    visit qualification_url(@qualification)
    click_on "Edit this qualification", match: :first

    fill_in "Qualification code", with: @qualification.qualification_code
    fill_in "Qualification name", with: @qualification.qualification_name
    click_on "Update Qualification"

    assert_text "Qualification was successfully updated"
    click_on "Back"
  end

  test "should destroy Qualification" do
    visit qualification_url(@qualification)
    click_on "Destroy this qualification", match: :first

    assert_text "Qualification was successfully destroyed"
  end
end
