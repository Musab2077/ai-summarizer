import React, { useState } from "react";
import BeforeSummarization from "./BeforeSummarization";
import AfterSummarization from "./AfterSummarization";
import axios from "axios";
import BeforeChoosingFile from "./BeforeChoosingFile";
import AfterChoosingFile from "./AfterChoosingFile";

const Body = () => {
  const [summrizationRes, setSummrizationRes] = useState(true);
  const [chooseFileRes, setChooseFileRes] = useState(true);
  const [docText, setDocText] = useState("");
  const [summarizedText, setSummrizationText] = useState("");
  const [isFileLoading, setIsFileLoading] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const backendUrl = "https://backend-for-ai-summarizer.vercel.app";

  const handleSummarize = async () => {
    if (!docText) return;
    
    setIsSummarizing(true);
    setSummrizationRes(false);
    
    try {
      const response = await axios.post(`${backendUrl}/summarization`, {
        doc_text: docText,
      });
      setSummrizationText(response.data.summarized_text);
    } catch (error) {
      console.error("Error summarizing text:", error);
      setSummrizationText("Error occurred during summarization");
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleFile = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsFileLoading(true);
    const size = e.target.files[0].size;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      if (size < 600 * 1024) {
        const response = await axios.post(`${backendUrl}/document_reading`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        
        if (!response.data.error_res) {
          setChooseFileRes(false);
          setDocText(response.data.text);
        }
      } else {
        setChooseFileRes(false);
        setDocText("File size should be smaller than 600KB");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setChooseFileRes(false);
      setDocText("Error occurred while processing the file");
    } finally {
      setIsFileLoading(false);
    }
  };

  return (
    <div className="m-4">
      <div className="p-4 shadow rounded">
        <div className="grid sm:grid-cols-2 mb-4 h-auto">
          <div className="sm:mr-5 sm:mb-0 mb-4">
            {chooseFileRes ? (
              <BeforeChoosingFile 
                handleFile={handleFile} 
                isLoading={isFileLoading} 
              />
            ) : (
              <AfterChoosingFile text={docText} />
            )}
            <div className="text-center mt-3">
              <button
                className={`px-2 py-1 rounded-md ${
                  isSummarizing || !docText
                    ? "bg-blue-200 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-[0_4px_10px_0_#2563eb]"
                }`}
                onClick={handleSummarize}
                disabled={isSummarizing || !docText}
              >
                {isSummarizing ? "Summarizing..." : "AI Summarize"}
              </button>
            </div>
          </div>
          {summrizationRes ? (
            <BeforeSummarization />
          ) : (
            <AfterSummarization 
              text={summarizedText} 
              isLoading={isSummarizing} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;