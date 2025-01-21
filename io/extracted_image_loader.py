import copy
import fitz  # PyMuPDF
import os
from typing import AsyncIterator, Iterator
import os
from typing import List
from langchain_core.document_loaders import BaseLoader
from langchain_core.documents import Document

from transformers import pipeline
from transformers import BlipProcessor, BlipForConditionalGeneration

from PIL import Image
from langchain_community.document_loaders import UnstructuredImageLoader
from image_captions import ImageCaptionLoader
from image_extractor import ImageExtractor

class ExtractedImageLoader(BaseLoader):

    def __init__(self, file_path: str, image_output_folder: str, extract_captions: bool, persist_images: bool) -> None:
        """Initialize the loader with a file path.

        Args:
            file_path: The path to the file to load.
        """
        #self.processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-large")
        #self.model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-large")
        self.file_path = file_path
        self.image_output_folder = image_output_folder
        self.extract_captions = extract_captions
        self.persist_images = persist_images


    def lazy_load(self) -> List[Document]:
        documents = []
        # extract all images from source file (ppt, pdf) and save them off as content 
        extracted_files, metadata_list = ImageExtractor().extract(self.file_path, self.image_output_folder)

        # image to text (BLIP) loader
        image_caption_docs = []
        if self.extract_captions:
            for f in extracted_files:
                image_caption_docs.append(ImageCaptionLoader(images=[f]).load()[0])
        # OCR loader
        ocr_docs = [UnstructuredImageLoader(file_path=f).load() for f in extracted_files]

        assert len(image_caption_docs) == 0 or len(image_caption_docs) == len(ocr_docs)

       
        documents = [] 
        for ix, ocr_doc in enumerate(ocr_docs):
            # update metadata with extracted metadata (page number, original file name...)
            metadata_ix = copy.deepcopy(metadata_list[ix])

            if len(image_caption_docs) > 0:
                caption_doc = image_caption_docs[ix]
                metadata_ix.update(caption_doc.metadata)
                caption_doc.metadata = metadata_ix
                yield caption_doc

            for ocr_chunk in ocr_doc:
                metadata_ix = copy.deepcopy(metadata_list[ix])
                metadata_ix.update( ocr_chunk.metadata )

                ocr_chunk.metadata = metadata_ix
                if len(ocr_chunk.page_content) < 3:
                    # no OCR content found
                    pass
                yield ocr_chunk
        if not self.persist_images:
            for image_path in extracted_files:
                os.remove(image_path)

                
