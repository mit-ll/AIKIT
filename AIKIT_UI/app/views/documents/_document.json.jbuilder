json.extract! document, :id, :previous_id, :folder_id, :user_id, :filename, :pathname, :top_folder, :file_type, :content_type, :document_type, :is_parsed, :is_public, :is_current, :contents_bytes, :contents, :created_at, :updated_at
json.url document_url(document, format: :json)
