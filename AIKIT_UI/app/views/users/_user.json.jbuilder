json.extract! user, :id, :user_sid, :user_name, :handle, :user_email, :phone
json.url user_url(user, format: :json)
