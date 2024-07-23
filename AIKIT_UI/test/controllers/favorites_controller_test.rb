require "test_helper"

class FavoritesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @favorite = favorites(:one)
  end

  test "should get index" do
    get favorites_url
    assert_response :success
  end

  test "should get new" do
    get new_favorite_url
    assert_response :success
  end

  test "should create favorite" do
    assert_difference("Favorite.count") do
      post favorites_url, params: { favorite: { document_id: @favorite.document_id, favorite_list_id: @favorite.favorite_list_id, folder_id: @favorite.folder_id, user_id: @favorite.user_id } }
    end

    assert_redirected_to favorite_url(Favorite.last)
  end

  test "should show favorite" do
    get favorite_url(@favorite)
    assert_response :success
  end

  test "should get edit" do
    get edit_favorite_url(@favorite)
    assert_response :success
  end

  test "should update favorite" do
    patch favorite_url(@favorite), params: { favorite: { document_id: @favorite.document_id, favorite_list_id: @favorite.favorite_list_id, folder_id: @favorite.folder_id, user_id: @favorite.user_id } }
    assert_redirected_to favorite_url(@favorite)
  end

  test "should destroy favorite" do
    assert_difference("Favorite.count", -1) do
      delete favorite_url(@favorite)
    end

    assert_redirected_to favorites_url
  end
end
