import React, { useState, FormEvent } from "react";
import { usePost } from "../components/PostContext"; 
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill"; 
import "react-quill/dist/quill.snow.css"; 

const MAX_WORD_COUNT = 1000;

const EditorPage: React.FC = () => {
  const { title, setContent } = usePost(); 
  const [editorContent, setEditorContent] = useState<string>(""); // Local editor content
  const [wordCount, setWordCount] = useState<number>(0);

  const navigate = useNavigate(); 

  const handleEditorChange = (value: string) => {
    const words = value.trim().split(/\s+/);
    const currentWordCount = words.filter(Boolean).length;

    if (currentWordCount <= MAX_WORD_COUNT) {
      setEditorContent(value);
      setWordCount(currentWordCount);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setContent(editorContent); // Save editor content to context
    navigate("/preview"); 
  };
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      [{ size: ["small", "medium", "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ align: "" }, { align: "center" }, { align: "right" }],
      ["link", "image"],
    ],
  };
  return (
    <div className="absolute top-[82px] left-[256px] w-[662px]  border-[#E7F1E9] rounded-[4px] opacity-100">
      <form
        onSubmit={handleSubmit} >
        <div> 
        <div className="bg-[#FAFAFA] h-[35px] border"></div>
          <div className="bg-[#FAFAFA] p-4 border rounded-t-md">
            <h2 className="text-[24px] font-semibold">{title}</h2>
          </div>
          <div className="p-4 !bg-[#F5F5F5]">
            <ReactQuill
              value={editorContent}
              onChange={handleEditorChange}
              modules={modules}
              className="h-[480px] text-[16px] focus:outline-none focus:border-[#0A7227] border border-[#FAFAFA] rounded-b-md"
            
            />
          </div>

          {/* Word Counter */}
          <div className="flex justify-end bg-white px-4 py-2 text-[12px] border border-[#E7F1E9]">
            {wordCount}/{MAX_WORD_COUNT} words
          </div>

          {/* Post Button */}
        </div>
          <div className="flex items-end justify-end mt-2">
            <button
              className="bg-[#0A7227] text-white text-[14px] py-[6px] px-[12px] rounded mt-[8px] cursor-pointer hover:bg-[#0A9A38] transition duration-200 ease-in-out"
              type="submit"
              disabled={!editorContent} // Only allow submission if title is present
            >
              Post
            </button>
          </div>
      </form>
    </div>
  );
};

export default EditorPage;
