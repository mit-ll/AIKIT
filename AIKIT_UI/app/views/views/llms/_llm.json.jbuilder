json.extract! llm, :id, :llm_name, :llm_version, :updated_at, :created_at, :updated_at
json.url llm_url(llm, format: :json)
