json.extract! llm_evaluation, :id, :llm_id, :test_set_id, :test_question_id, :is_valid, :is_modified, :is_missing, :llm_text, :created_at, :updated_at
json.url llm_evaluation_url(llm_evaluation, format: :json)
