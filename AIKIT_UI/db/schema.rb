# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_05_08_131819) do
  create_table "attachments", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "file_type", limit: 80
    t.string "file_name", limit: 160
    t.string "file_path", limit: 360
    t.string "file_md5", limit: 32
    t.string "content_type", limit: 80
    t.integer "content_bytes"
    t.binary "contents", size: :long
    t.datetime "updated_at"
  end

  create_table "chains", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "user_id"
    t.integer "chain_order"
  end

  create_table "collection_documents", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "user_id"
    t.integer "collection_id"
    t.integer "document_id"
    t.string "filename", limit: 160
    t.datetime "updated_at"
  end

  create_table "collections", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "user_id"
    t.integer "parameter_set_id"
    t.string "collection_name", limit: 80
    t.string "vector_name", limit: 80
  end

  create_table "differences", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "folder_id"
    t.integer "docuent1_id"
    t.integer "document2_id"
    t.string "filename", limit: 160
    t.string "file_type", limit: 40
    t.boolean "is_parsed"
    t.boolean "is_public"
    t.integer "contents_bytes"
    t.binary "contents"
    t.text "contents_ascii", size: :medium
    t.string "document_type", limit: 40
    t.datetime "created_at"
  end

  create_table "documents", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "folder_id"
    t.integer "previous_id"
    t.integer "user_id"
    t.string "filename", limit: 160
    t.string "pathname", limit: 160
    t.string "document_type", limit: 20
    t.string "file_type", limit: 20
    t.string "content_type", limit: 80
    t.boolean "is_parsed"
    t.boolean "is_current"
    t.boolean "is_public"
    t.integer "contents_bytes"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.binary "contents", size: :long
    t.text "contents_ascii", size: :long
  end

  create_table "favorite_lists", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "user_id"
    t.integer "folder_id"
    t.string "list_name", limit: 80
    t.boolean "is_public"
  end

  create_table "favorites", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "user_id"
    t.integer "folder_id"
    t.integer "document_id"
    t.integer "favorite_list_id"
    t.boolean "user_notified"
  end

  create_table "folders", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "parent_id"
    t.integer "user_id"
    t.integer "group_id"
    t.string "folder_name", limit: 80
    t.string "path_name", limit: 1024
    t.integer "folder_level"
    t.boolean "is_public"
    t.boolean "group_write"
    t.datetime "updated_at"
  end

  create_table "groups", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "parent_id"
    t.string "group_name", limit: 80
  end

  create_table "images", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "document_id"
    t.integer "folder_id"
    t.integer "test_set_id"
    t.string "image_type", limit: 80
    t.string "legend", limit: 480
    t.integer "image_bytes"
    t.binary "image_data", size: :medium
    t.datetime "updated_at"
  end

  create_table "llm_evaluations", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "llm_id"
    t.integer "test_set_id"
    t.integer "test_question_id"
    t.integer "question_number"
    t.boolean "is_valid"
    t.boolean "is_modified"
    t.boolean "is_missing"
    t.float "utility"
    t.float "accuracy"
    t.float "clarity"
    t.string "llm_text", limit: 2040
  end

  create_table "llm_questions", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "user_id"
    t.integer "folder_id"
    t.integer "collection_id"
    t.integer "template_id"
    t.integer "chain_id"
    t.integer "parameter_set_id"
    t.integer "chain_order"
    t.string "question_name", limit: 80
    t.string "vector_name", limit: 80
    t.string "question_text", limit: 4000
    t.boolean "is_public"
    t.datetime "updated_at"
  end

  create_table "llms", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "llm_name", limit: 80
    t.string "llm_version", limit: 40
    t.datetime "updated_at"
  end

  create_table "parameter_sets", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "user_id"
    t.string "set_name", limit: 80
    t.string "set_type", limit: 40
  end

  create_table "parameters", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "user_id"
    t.integer "parameter_set_id"
    t.string "parameter_name", limit: 80
    t.string "parameter_value"
  end

  create_table "qualifications", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "qualification_name", limit: 80
    t.string "qualification_code", limit: 10
  end

  create_table "responses", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "user_id"
    t.integer "llm_question_id"
    t.integer "llm_id"
    t.integer "chain_id"
    t.integer "collection_id"
    t.integer "collection_parameter_set_id"
    t.integer "llm_parameter_set_id"
    t.integer "template_id"
    t.integer "chain_order"
    t.datetime "runtime"
    t.datetime "created_at"
    t.text "response_text"
  end

  create_table "roles", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "role_name", limit: 80
  end

  create_table "templates", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "user_id"
    t.string "template_text", limit: 4095
    t.string "prompt_input", limit: 4095
    t.string "input_variables", limit: 240
  end

  create_table "test_questions", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "test_set_id"
    t.integer "llm_id"
    t.integer "topic_id"
    t.integer "document_id"
    t.integer "previous_id"
    t.integer "next_id"
    t.integer "image_id"
    t.integer "question_number"
    t.string "question", limit: 960
    t.string "reference", limit: 80
    t.string "paragraph", limit: 40
    t.string "option_a", limit: 480
    t.string "option_b", limit: 480
    t.string "option_c", limit: 480
    t.string "option_d", limit: 480
    t.string "option_e", limit: 480
    t.string "option_f", limit: 480
    t.string "image_text", limit: 480
    t.string "answer", limit: 960
    t.string "answer_option", limit: 40
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "test_sets", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "user_id"
    t.string "mqf_name", limit: 80
    t.string "squadron", limit: 80
    t.string "source", limit: 80
    t.integer "number_questions"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "topics", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "test_set_id"
    t.string "topic_text", limit: 180
  end

  create_table "user_groups", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "user_id"
    t.integer "group_id"
    t.string "user_role", limit: 20
  end

  create_table "user_qualifications", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "user_id"
    t.integer "qualification_id"
    t.datetime "date_qualified"
    t.datetime "updated_training"
    t.float "experience_level"
  end

  create_table "user_questions", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "user_id"
    t.integer "test_set_id"
    t.integer "test_question_id"
    t.integer "user_test_id"
    t.integer "next_id"
    t.string "user_answer", limit: 10
    t.boolean "is_correct"
    t.float "question_score"
    t.string "user_comment", limit: 480
    t.datetime "test_date"
  end

  create_table "user_reads", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "user_id"
    t.integer "document_id"
    t.integer "page_number"
    t.boolean "is_complete"
    t.datetime "updated_at"
  end

  create_table "user_roles", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "user_id"
    t.integer "role_id"
    t.string "role_name", limit: 80
  end

  create_table "user_tests", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "user_id"
    t.integer "test_set_id"
    t.integer "number_correct"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "user_sid", limit: 40
    t.string "user_name", limit: 80
    t.string "handle", limit: 80
    t.string "user_email", limit: 80
    t.string "phone", limit: 20
  end

end
