require "test_helper"

class QueriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @query = queries(:one)
  end

  test "should get index" do
    get queries_url
    assert_response :success
  end

  test "should get new" do
    get new_query_url
    assert_response :success
  end

  test "should create query" do
    assert_difference("Query.count") do
      post queries_url, params: { query: { folder_id: @query.folder_id, is_private: @query.is_private, is_public: @query.is_public, look: @query.look, match: @query.match, op: @query.op, query_name: @query.query_name, query_sql: @query.query_sql, updated_at: @query.updated_at, user_id: @query.user_id } }
    end

    assert_redirected_to query_url(Query.last)
  end

  test "should show query" do
    get query_url(@query)
    assert_response :success
  end

  test "should get edit" do
    get edit_query_url(@query)
    assert_response :success
  end

  test "should update query" do
    patch query_url(@query), params: { query: { folder_id: @query.folder_id, is_private: @query.is_private, is_public: @query.is_public, look: @query.look, match: @query.match, op: @query.op, query_name: @query.query_name, query_sql: @query.query_sql, updated_at: @query.updated_at, user_id: @query.user_id } }
    assert_redirected_to query_url(@query)
  end

  test "should destroy query" do
    assert_difference("Query.count", -1) do
      delete query_url(@query)
    end

    assert_redirected_to queries_url
  end
end
