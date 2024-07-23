require "application_system_test_case"

class CollectionDocumentsTest < ApplicationSystemTestCase
  setup do
    @collection_document = collection_documents(:one)
  end

  test "visiting the index" do
    visit collection_documents_url
    assert_selector "h1", text: "Collection documents"
  end

  test "should create collection document" do
    visit collection_documents_url
    click_on "New collection document"

    fill_in "Collection", with: @collection_document.collection_id
    fill_in "Document", with: @collection_document.document_id
    fill_in "Updated at", with: @collection_document.updated_at
    fill_in "User", with: @collection_document.user_id
    click_on "Create Collection document"

    assert_text "Collection document was successfully created"
    click_on "Back"
  end

  test "should update Collection document" do
    visit collection_document_url(@collection_document)
    click_on "Edit this collection document", match: :first

    fill_in "Collection", with: @collection_document.collection_id
    fill_in "Document", with: @collection_document.document_id
    fill_in "Updated at", with: @collection_document.updated_at
    fill_in "User", with: @collection_document.user_id
    click_on "Update Collection document"

    assert_text "Collection document was successfully updated"
    click_on "Back"
  end

  test "should destroy Collection document" do
    visit collection_document_url(@collection_document)
    click_on "Destroy this collection document", match: :first

    assert_text "Collection document was successfully destroyed"
  end
end
