json.extract! source, :id, :user_id, :llm_question_id, :response_id, :source_order, :document_name, :page, :score, :page_content
json.url source_url(source, format: :json)
