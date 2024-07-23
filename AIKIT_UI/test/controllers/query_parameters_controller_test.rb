require "test_helper"

class QueryParametersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @query_parameter = query_parameters(:one)
  end

  test "should get index" do
    get query_parameters_url
    assert_response :success
  end

  test "should get new" do
    get new_query_parameter_url
    assert_response :success
  end

  test "should create query_parameter" do
    assert_difference("QueryParameter.count") do
      post query_parameters_url, params: { query_parameter: { parameter_id: @query_parameter.parameter_id, query_id: @query_parameter.query_id, updated_at: @query_parameter.updated_at, user_id: @query_parameter.user_id } }
    end

    assert_redirected_to query_parameter_url(QueryParameter.last)
  end

  test "should show query_parameter" do
    get query_parameter_url(@query_parameter)
    assert_response :success
  end

  test "should get edit" do
    get edit_query_parameter_url(@query_parameter)
    assert_response :success
  end

  test "should update query_parameter" do
    patch query_parameter_url(@query_parameter), params: { query_parameter: { parameter_id: @query_parameter.parameter_id, query_id: @query_parameter.query_id, updated_at: @query_parameter.updated_at, user_id: @query_parameter.user_id } }
    assert_redirected_to query_parameter_url(@query_parameter)
  end

  test "should destroy query_parameter" do
    assert_difference("QueryParameter.count", -1) do
      delete query_parameter_url(@query_parameter)
    end

    assert_redirected_to query_parameters_url
  end
end
