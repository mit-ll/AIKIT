require 'open3'

class Document < ApplicationRecord

  ##############################################################################
  # GET /documents/1 or /documents/1.json
  def doc_check
    docname = Tools::clean_name( self.filename )
    pdf_path = "public/doc#{self.id}_#{docname}"
    if ! File.exist?(pdf_path)
      stdout, stderr, status = Open3.capture3("cp /io/docs/doc#{self.id}_#{docname} #{pdf_path}")
      puts "**** stdout: #{stdout}"
      puts "**** stderr: #{stderr}"
      puts "**** status: #{status}"
    end  # if
    return pdf_path
  end  # doc_check

  ##############################################################################
end  # class Document
