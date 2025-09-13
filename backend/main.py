from fastapi import FastAPI,File,UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq 
import os
import io
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
    "https://ai-summarizzer.vercel.app/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/document_reading")
async def just_checking(file: UploadFile = File(...)):
    file_name = file.filename
    file_type = file_name.split('.')[-1].lower()
    
    try:
        error = False
        if file_type in ["docx", "doc"]:
            content = await file.read()
            
            file_like = io.BytesIO(content)
            
            doc = Document(file_like)
            all_text = ""
            for para in doc.paragraphs:
                if para.text.strip():
                    all_text += para.text + "\n"
            
    except:
        error = True
    
    finally:
        await file.close()
        if error:
            return {"error": f"Failed to process file: {file_name}"}
        
        return {
                "filename": file_name,
                "message": "File processed successfully",
                "text": all_text.strip()
            }
            
@app.post('/summarization')
def summarizing_the_document(arg: Doc):
    if chain == "error":
        return {"summarized_text" : "error"}
    else:
        response = chain.invoke({'input': arg.doc_text})
        return {"summarized_text" : response.content}