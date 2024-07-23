require "application_system_test_case"

class DocumentsTest < ApplicationSystemTestCase
  setup do
    @document = documents(:one)
  end

  test "visiting the index" do
    visit documents_url
    assert_selector "h1", text: "Documents"
  end

  test "should create document" do
    visit documents_url
    click_on "New document"

    fill_in "Content type", with: @document.content_type
    fill_in "Contents", with: @document.contents
    fill_in "Contents byte", with: @document.contents_byte
    check "File parsed" if @document.file_parsed
    fill_in "File type", with: @document.file_type
    fill_in "Filename", with: @document.filename
    fill_in "Folder", with: @document.folder_id
    check "Is private" if @document.is_private
    check "Is public" if @document.is_public
    fill_in "Pathname", with: @document.pathname
    fill_in "Update at", with: @document.update_at
    fill_in "User", with: @document.user_id
    click_on "Create Document"

    assert_text "Document was successfully created"
    click_on "Back"
  end

  test "should update Document" do
    visit document_url(@document)
    click_on "Edit this document", match: :first

    fill_in "Content type", with: @document.content_type
    fill_in "Contents", with: @document.contents
    fill_in "Contents byte", with: @document.contents_byte
    check "File parsed" if @document.file_parsed
    fill_in "File type", with: @document.file_type
    fill_in "Filename", with: @document.filename
    fill_in "Folder", with: @document.folder_id
    check "Is private" if @document.is_private
    check "Is public" if @document.is_public
    fill_in "Pathname", with: @document.pathname
    fill_in "Update at", with: @document.update_at
    fill_in "User", with: @document.user_id
    click_on "Update Document"

    assert_text "Document was successfully updated"
    click_on "Back"
  end

  test "should destroy Document" do
    visit document_url(@document)
    click_on "Destroy this document", match: :first

    assert_text "Document was successfully destroyed"
  end
end
