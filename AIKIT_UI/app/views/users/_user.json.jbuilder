json.extract! user, :id, :user_sid, :user_name, :user_email, :phone, :updated_at
json.url user_url(user, format: :json)
