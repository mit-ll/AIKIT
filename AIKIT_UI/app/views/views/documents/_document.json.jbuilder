json.extract! document, :id, :folder_id, :user_id, :filename, :pathname, :file_type, :content_type, :is_parsed, :is_public, :contents_byte, :contents, :updated_at
json.url document_url(document, format: :json)
