json.extract! response, :id, :user_id, :question_id, :llm_id, :response_text, :created_at, :created_at, :updated_at
json.url response_url(response, format: :json)
