json.extract! favorite, :id, :user_id, :folder_id, :document_id, :favorite_list_id, :updated_at
json.url favorite_url(favorite, format: :json)
