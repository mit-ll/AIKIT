json.extract! user_question, :id, :user_id, :test_set_id, :test_question_id, :user_answer, :is_correct, :question_score, :user_comment, :test_date, :created_at, :updated_at
json.url user_question_url(user_question, format: :json)
