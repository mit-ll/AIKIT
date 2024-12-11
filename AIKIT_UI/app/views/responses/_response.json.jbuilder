json.extract! response, :id, :user_id, :llm_question_id, :llm_id, :chain_id, :collection_id, :collection_parameter_set_id, :llm_parameter_set_id,, :template_id, :chain_order, :response_text, :context, :similarity_docs, :runtime, :created_at
json.url response_url(response, format: :json)
