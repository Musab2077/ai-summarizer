# import shutil
# from docx import Document

# doc = Document("AI and ML Engineering resume\AI and ML Engineering resume.doc")

# all_text = []
# for i,para in enumerate(doc.paragraphs):
#     if len(para.text) > 0:
#         all_text.append(para.text)
    
# print(all_text)
# print(len(all_text[-1]))

# shutil.rmtree("hello/")

# x = [2,5]
# def main():
#     try:
#         value = x[1]
#         return value
#     except:
#         return "error"
#     finally:
#         return "accepted"
    
# print(main())
    
    
from pypdf import PdfReader

def pdf_reader(file_path):
    doc = PdfReader(file_path)
    full_pdf = doc.pages
    # print(type(full_pdf))
    all_text = ""
    for page in full_pdf:
        all_text += page.extract_text().strip() + "\n"
    return all_text.strip()
    
print(pdf_reader('test.pdf')[-1])