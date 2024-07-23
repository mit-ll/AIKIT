require "application_system_test_case"

class TopicsTest < ApplicationSystemTestCase
  setup do
    @topic = topics(:one)
  end

  test "visiting the index" do
    visit topics_url
    assert_selector "h1", text: "Topics"
  end

  test "should create topic" do
    visit topics_url
    click_on "New topic"

    fill_in "Topic text", with: @topic.topic_text
    click_on "Create Topic"

    assert_text "Topic was successfully created"
    click_on "Back"
  end

  test "should update Topic" do
    visit topic_url(@topic)
    click_on "Edit this topic", match: :first

    fill_in "Topic text", with: @topic.topic_text
    click_on "Update Topic"

    assert_text "Topic was successfully updated"
    click_on "Back"
  end

  test "should destroy Topic" do
    visit topic_url(@topic)
    click_on "Destroy this topic", match: :first

    assert_text "Topic was successfully destroyed"
  end
end
