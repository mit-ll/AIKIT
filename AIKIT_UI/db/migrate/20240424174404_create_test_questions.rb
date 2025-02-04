
###############################################################################
# **Author:**  Darrell O. Ricke, Ph.D.  (mailto: Darrell.Ricke@ll.mit.edu)
#  Copyright:  Copyright (c) 2024 Massachusetts Institute of Technology 
#  License:    GNU GPL license (http://www.gnu.org/licenses/gpl.html)  
# 
# **RAMS request ID 1028809**
# **RAMS title: Artificial Intelligence tools for Knowledge-Intensive Tasks (AIKIT)
# 
# **Overview:**
# Artificial Intelligence tools for Knowledge-Intensive Tasks (AIKIT) including
# Large Language Models (LLM), LangChain, and Retrieval-Augmented Generation (RAG).
# 
# **Citation:** None
# 
# **Disclaimer:**
# DISTRIBUTION STATEMENT A. Approved for public release. Distribution is unlimited.
#
# This material is based upon work supported by the Department of the Air Force 
# under Air Force Contract No. FA8702-15-D-0001. Any opinions, findings, 
# conclusions or recommendations expressed in this material are those of the 
# author(s) and do not necessarily reflect the views of the Department of the Air Force. 
# 
# © 2024 Massachusetts Institute of Technology
#
# Subject to FAR52.227-11 Patent Rights - Ownership by the contractor (May 2014)
#
# The software/firmware is provided to you on an As-Is basis
# 
# Delivered to the U.S. Government with Unlimited Rights, as defined in DFARS
# Part 252.227-7013 or 7014 (Feb 2014). Notwithstanding any copyright notice,
# U.S. Government rights in this work are defined by DFARS 252.227-7013 or
# DFARS 252.227-7014 as detailed above. Use of this work other than as specifically
# authorized by the U.S. Government may violate any copyrights that exist in this work.
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 2 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
###############################################################################

class CreateTestQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :test_questions do |t|
      t.integer :test_set_id
      t.integer :llm_id
      t.integer :topic_id
      t.integer :document_id
      t.integer :previous_id
      t.integer :next_id
      t.integer :image_id
      t.integer :question_number
      t.string :question, limit: 960
      t.string :reference, limit: 80
      t.string :paragraph, limit: 40
      t.string :option_a, limit: 480
      t.string :option_b, limit: 480
      t.string :option_c, limit: 480
      t.string :option_d, limit: 480
      t.string :option_e, limit: 480
      t.string :option_f, limit: 480
      t.string :image_text, limit: 480
      t.string :answer, limit: 960
      t.string :answer_option, limit: 40
      t.datetime :created_at
      t.datetime :updated_at
    end
  end

  def self.up
    add_index :test_questions, [:test_set_id], :name => idx_questions_test
  end  # up

end
