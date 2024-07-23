require "test_helper"

class TestSetsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @test_set = test_sets(:one)
  end

  test "should get index" do
    get test_sets_url
    assert_response :success
  end

  test "should get new" do
    get new_test_set_url
    assert_response :success
  end

  test "should create test_set" do
    assert_difference("TestSet.count") do
      post test_sets_url, params: { test_set: { create_at: @test_set.create_at, mfq_name: @test_set.mfq_name, number_questions: @test_set.number_questions, source: @test_set.source, squadron: @test_set.squadron, updated_at: @test_set.updated_at, user_id: @test_set.user_id } }
    end

    assert_redirected_to test_set_url(TestSet.last)
  end

  test "should show test_set" do
    get test_set_url(@test_set)
    assert_response :success
  end

  test "should get edit" do
    get edit_test_set_url(@test_set)
    assert_response :success
  end

  test "should update test_set" do
    patch test_set_url(@test_set), params: { test_set: { create_at: @test_set.create_at, mfq_name: @test_set.mfq_name, number_questions: @test_set.number_questions, source: @test_set.source, squadron: @test_set.squadron, updated_at: @test_set.updated_at, user_id: @test_set.user_id } }
    assert_redirected_to test_set_url(@test_set)
  end

  test "should destroy test_set" do
    assert_difference("TestSet.count", -1) do
      delete test_set_url(@test_set)
    end

    assert_redirected_to test_sets_url
  end
end
