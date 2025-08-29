from fastapi import FastAPI,File,UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq 
import os
import shutil
from docx import Document
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GROQ_API_KEY")

class Doc(BaseModel):
    doc_text : str

try:
    chat = ChatGroq(
        api_key= api_key, 
        model_name="gemma2-9b-it"
        )

    promt = ChatPromptTemplate.from_messages([
        ("system", 
        "You are an ai summarizer."
        "You will summarize the given text in a markdown format"
        "You have to mention the key points and highlights in the given document also you have to describe it short"
        ),
        ("human", "{input}")
    ])

    chain = promt | chat
except:
    chain = "error"

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/document_reading")
async def just_checking(file : UploadFile = File(...)):
    file_name = file.filename.split('.')[0]
    file_type = file.filename.split('.')[-1]
    try:
        os.makedirs(file_name, exist_ok=True)
    finally:
        try:
            file_location = os.path.join(file_name, file.filename)
            with open(file_location, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            if file_type == "docx" or file_type == "doc":
                doc = Document(file_location)
                all_text = ""
                for para in doc.paragraphs:
                    if len(para.text) > 0:
                        all_text = all_text + para.text + "\n"
                        
                return {"filename": file.filename, "message": "File uploaded successfully", "text" : all_text}
        except Exception as e:
            return {"error": str(e)}
        
        finally:
            await file.close()
            shutil.rmtree(file_name)
            
@app.post('/summarization')
def summarizing_the_document(arg: Doc):
    if chain == "error":
        return {"summarized_text" : "error"}
    else:
        response = chain.invoke({'input': arg.doc_text})
        return {"summarized_text" : response.content}