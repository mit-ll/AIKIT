json.extract! question, :id, :user_id, :question_text 
json.url question_url(question, format: :json)
