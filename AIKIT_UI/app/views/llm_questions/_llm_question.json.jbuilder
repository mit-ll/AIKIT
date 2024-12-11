json.extract! question, :id, :user_id, :folder_id, :template_id, :chain_id, :chain_order, :question_text, :question_name, :flag_text, :updated_at
json.url question_url(question, format: :json)
