require "test_helper"

class ParameterSetsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @parameter_set = parameter_sets(:one)
  end

  test "should get index" do
    get parameter_sets_url
    assert_response :success
  end

  test "should get new" do
    get new_parameter_set_url
    assert_response :success
  end

  test "should create parameter_set" do
    assert_difference("ParameterSet.count") do
      post parameter_sets_url, params: { parameter_set: { parameter_id: @parameter_set.parameter_id, set_name: @parameter_set.set_name, user_id: @parameter_set.user_id } }
    end

    assert_redirected_to parameter_set_url(ParameterSet.last)
  end

  test "should show parameter_set" do
    get parameter_set_url(@parameter_set)
    assert_response :success
  end

  test "should get edit" do
    get edit_parameter_set_url(@parameter_set)
    assert_response :success
  end

  test "should update parameter_set" do
    patch parameter_set_url(@parameter_set), params: { parameter_set: { parameter_id: @parameter_set.parameter_id, set_name: @parameter_set.set_name, user_id: @parameter_set.user_id } }
    assert_redirected_to parameter_set_url(@parameter_set)
  end

  test "should destroy parameter_set" do
    assert_difference("ParameterSet.count", -1) do
      delete parameter_set_url(@parameter_set)
    end

    assert_redirected_to parameter_sets_url
  end
end
