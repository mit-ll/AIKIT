json.extract! llm, :id, :llm_name, :llm_version, :adapter_name, :updated_at
json.url llm_url(llm, format: :json)
