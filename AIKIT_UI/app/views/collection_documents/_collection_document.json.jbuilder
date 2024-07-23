json.extract! collection_document, :id, :user_id, :collection_id, :document_id, :updated_at, :created_at, :updated_at
json.url collection_document_url(collection_document, format: :json)
