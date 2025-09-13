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
  const backendUrl = "https://backend-for-ai-summarizer.vercel.app";

  const handleSummarize = async () => {
    setSummrizationRes(false);
    await axios
      .post(`${backendUrl}/summarization`, {
        doc_text: docText,
      })
      .then((response) => setSummrizationText(response.data.summarized_text));
  };

  const handleFile = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios
        .post(`${backendUrl}/document_reading`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setChooseFileRes(false);
          setDocText(response.data.text);
        });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="m-4">
      <div className="p-4 shadow rounded">
        <div className="grid sm:grid-cols-2 mb-4 h-auto">
          <div className="sm:mr-5 sm:mb-0 mb-4">
            {chooseFileRes ? (
              <BeforeChoosingFile handleFile={handleFile} />
            ) : (
              <AfterChoosingFile text={docText} />
            )}
            <div className="text-center mt-3">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-md hover:shadow-[0_4px_10px_0_#2563eb]"
                onClick={handleSummarize}
              >
                AI Summarize
              </button>
            </div>
          </div>
          {summrizationRes ? (
            <BeforeSummarization />
          ) : (
            <AfterSummarization text={summarizedText} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
