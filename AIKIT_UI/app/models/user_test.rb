
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
# the Free Software Foundation, version 2 of the License.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
###############################################################################

class UserTest < ApplicationRecord

  ##############################################################################
  def score_test
    test_set = TestSet.where( id: self.test_set_id ).take
    tqs_a = TestQuestion.where( test_set_id: self.test_set_id ).to_a
    tqs = {}
    tqs_a.each do |tq|
      tqs[ tq.id ] = tq
    end  # do

    correct = 0
    incorrect = 0
    unanswered = 0
    by_topic = {}

    # Evaluate each user answer
    uqs = UserQuestion.where( test_set_id: self.test_set_id ).to_a
    uqs.each do |uq|
      tq = tqs[ uq.test_question_id ]
      by_topic[ tq.topic_id ] = {} if by_topic[ tq.topic_id ].nil?

      q_correct = nil
      q_correct = (tq.answer_option.upcase == uq.user_answer.upcase.chomp) if ! uq.user_answer.nil?
      if q_correct
        correct += 1
        by_topic[ tq.topic_id ][ :correct ] = 0 if by_topic[ tq.topic_id ][ :correct ].nil?
        by_topic[ tq.topic_id ][ :correct ] += 1
      else
        if uq.user_answer.nil?
          unanswered += 1
          by_topic[ tq.topic_id ][ :unanswered ] = 0 if by_topic[ tq.topic_id ][ :unanswered ].nil?
          by_topic[ tq.topic_id ][ :unanswered ] += 1
        else
          incorrect += 1
          by_topic[ tq.topic_id ][ :incorrect ] = 0 if by_topic[ tq.topic_id ][ :incorrect ].nil?
          by_topic[ tq.topic_id ][ :incorrect ] += 1
        end  # if
      end  # if
    end  # do 

    return correct, incorrect, unanswered, by_topic
  end  # score_test

  ##############################################################################
end  # class