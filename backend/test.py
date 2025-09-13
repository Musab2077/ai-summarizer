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

x = [2,5]
def main():
    try:
        value = x[1]
        return value
    except:
        return "error"
    finally:
        return "accepted"
    
print(main())
    