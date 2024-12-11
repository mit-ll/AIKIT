json.extract! favorite_list, :id, :user_id, :folder_id, :list_name, :is_public, :updated_at
json.url favorite_list_url(favorite_list, format: :json)
