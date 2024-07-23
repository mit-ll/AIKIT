require "application_system_test_case"

class DifferencesTest < ApplicationSystemTestCase
  setup do
    @difference = differences(:one)
  end

  test "visiting the index" do
    visit differences_url
    assert_selector "h1", text: "Differences"
  end

  test "should create difference" do
    visit differences_url
    click_on "New difference"

    fill_in "Contents", with: @difference.contents
    fill_in "Contents ascii", with: @difference.contents_ascii
    fill_in "Contents bytes", with: @difference.contents_bytes
    fill_in "Created at", with: @difference.created_at
    fill_in "Docuent1", with: @difference.docuent1_id
    fill_in "Document2", with: @difference.document2_id
    fill_in "Document type", with: @difference.document_type
    fill_in "File type", with: @difference.file_type
    fill_in "Filename", with: @difference.filename
    fill_in "Folder", with: @difference.folder_id
    check "Is parsed" if @difference.is_parsed
    check "Is private" if @difference.is_private
    check "Is public" if @difference.is_public
    click_on "Create Difference"

    assert_text "Difference was successfully created"
    click_on "Back"
  end

  test "should update Difference" do
    visit difference_url(@difference)
    click_on "Edit this difference", match: :first

    fill_in "Contents", with: @difference.contents
    fill_in "Contents ascii", with: @difference.contents_ascii
    fill_in "Contents bytes", with: @difference.contents_bytes
    fill_in "Created at", with: @difference.created_at
    fill_in "Docuent1", with: @difference.docuent1_id
    fill_in "Document2", with: @difference.document2_id
    fill_in "Document type", with: @difference.document_type
    fill_in "File type", with: @difference.file_type
    fill_in "Filename", with: @difference.filename
    fill_in "Folder", with: @difference.folder_id
    check "Is parsed" if @difference.is_parsed
    check "Is private" if @difference.is_private
    check "Is public" if @difference.is_public
    click_on "Update Difference"

    assert_text "Difference was successfully updated"
    click_on "Back"
  end

  test "should destroy Difference" do
    visit difference_url(@difference)
    click_on "Destroy this difference", match: :first

    assert_text "Difference was successfully destroyed"
  end
end
