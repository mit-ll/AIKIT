json.extract! image, :id, :document_id, :folder_id, :test_set_id, :image_type, :legend, :image_bytes, :image_data, :updated_at
json.url image_url(image, format: :json)
