
################################################################################ 
# Author: Darrell O. Ricke, Ph.D.  (email: Darrell.Ricke@ll.mit.edu) 
# 
# RAMS request ID 1028809 
# RAMS title: Artificial Intelligence tools for Knowledge-Intensive Tasks (AIKIT) 
#
# DISTRIBUTION STATEMENT A. Approved for public release. Distribution is unlimited.
#
# This material is based upon work supported by the Department of the Air Force 
# under Air Force Contract No. FA8702-15-D-0001. Any opinions, findings, 
# conclusions or recommendations expressed in this material are those of the 
# author(s) and do not necessarily reflect the views of the Department of the Air Force.
#
# Copyright © 2024 Massachusetts Institute of Technology.
#
# Subject to FAR52.227-11 Patent Rights - Ownership by the contractor (May 2014)
#
# The software/firmware is provided to you on an As-Is basis
#
# Delivered to the U.S. Government with Unlimited Rights, as defined in DFARS 
# Part 252.227-7013 or 7014 (Feb 2014). Notwithstanding any copyright notice, 
# U.S. Government rights in this work are defined by DFARS 252.227-7013 or 
# DFARS 252.227-7014 as detailed above. Use of this work other than as 
# specifically authorized by the U.S. Government may violate any copyrights 
# that exist in this work.
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, version 2 of the License.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
################################################################################

class Attachment < ActiveRecord::Base
  belongs_to :user
  belongs_to :folder
  has_many :image
  has_many :matrix
  has_many :permission
  has_many :word
  
  def attachment=(input_data)
    return nil if input_data == "" #no file name was entered
    self.file_name = base_part_of(input_data.original_filename)     
    self.path_name = input_data.original_filename
    self.content_type = file_field.content_type.chomp
    self.contents = input_data.read  
  end  # attachment=
  
  def base_part_of(file_name)
    File.basename(file_name).gsub(/[^\w._-]/, '')
  end  # base_part_of
    
  # Delete cage_day records for study.
  def self.drop_attachment(attachment_id)
    @matrices = Matrix.find(:all, :conditions => "attachment_id = #{attachment_id}")
    for matrix in @matrices do
      matrix.drop_matrix(matrix.id)
    end  # for
    
    Word.connection.execute("DELETE FROM words WHERE attachment_id = #{attachment_id}")
    Image.connection.execute("DELETE FROM images WHERE attachment_id = #{attachment_id}")
  end  # drop_attachment
end  # Attachment
