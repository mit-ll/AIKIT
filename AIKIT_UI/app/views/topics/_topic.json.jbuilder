json.extract! topic, :id, :topic_text, :created_at, :updated_at
json.url topic_url(topic, format: :json)
