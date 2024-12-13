json.extract! llm_question, :id, :user_id, :folder_id, :template_id, :chain_id, :chain_order, :question_text, :question_name, :flag_text, :updated_at
json.url llm_question_url(llm_question, format: :json)
