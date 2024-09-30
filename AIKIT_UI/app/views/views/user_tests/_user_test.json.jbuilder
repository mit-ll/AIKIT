json.extract! user_test, :id, :user_id, :test_set_id, :number_correct, :created_at, :updated_at
json.url user_test_url(user_test, format: :json)
