json.extract! user_read, :id, :user_id, :document_id, :page_number, :is_complete, :updated_at, :created_at, :updated_at
json.url user_read_url(user_read, format: :json)
