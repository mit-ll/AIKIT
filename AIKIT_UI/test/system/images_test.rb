require "application_system_test_case"

class ImagesTest < ApplicationSystemTestCase
  setup do
    @image = images(:one)
  end

  test "visiting the index" do
    visit images_url
    assert_selector "h1", text: "Images"
  end

  test "should create image" do
    visit images_url
    click_on "New image"

    fill_in "Document", with: @image.document_id
    fill_in "Folder", with: @image.folder_id
    fill_in "Image bytes", with: @image.image_bytes
    fill_in "Image data", with: @image.image_data
    fill_in "Legend", with: @image.legend
    fill_in "Test", with: @image.test_id
    fill_in "Update at", with: @image.update_at
    click_on "Create Image"

    assert_text "Image was successfully created"
    click_on "Back"
  end

  test "should update Image" do
    visit image_url(@image)
    click_on "Edit this image", match: :first

    fill_in "Document", with: @image.document_id
    fill_in "Folder", with: @image.folder_id
    fill_in "Image bytes", with: @image.image_bytes
    fill_in "Image data", with: @image.image_data
    fill_in "Legend", with: @image.legend
    fill_in "Test", with: @image.test_id
    fill_in "Update at", with: @image.update_at
    click_on "Update Image"

    assert_text "Image was successfully updated"
    click_on "Back"
  end

  test "should destroy Image" do
    visit image_url(@image)
    click_on "Destroy this image", match: :first

    assert_text "Image was successfully destroyed"
  end
end
