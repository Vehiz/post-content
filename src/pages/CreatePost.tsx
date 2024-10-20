// CreatePost.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { usePost } from '../components/PostContext'; // Import the Context API hook
import { useNavigate } from 'react-router-dom';

const MAX_WORD_COUNT = 1000;

const CreatePost: React.FC = () => {
  const { setTitle } = usePost(); // Context API to set the title
  const [localTitle, setLocalTitle] = useState<string>(''); // Local state for title
//   const [content, setContent] = useState<string>(''); // Local state for content (not needed to pass now)
  const [wordCount, setWordCount] = useState<number>(0);

  const navigate = useNavigate(); // React Router's navigate function

//   const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setLocalTitle(e.target.value);
//   };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setLocalTitle(e.target.value);
    const inputText = e.target.value;
    const words = inputText.trim().split(/\s+/);
    const currentWordCount = words.filter(Boolean).length;

    if (currentWordCount <= MAX_WORD_COUNT) {
      setLocalTitle(inputText);
      setWordCount(currentWordCount);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTitle(localTitle); // Save title in context
    navigate('/editor'); // Navigate to Editor Page
  };

  return (
    <div className="bg-[#FAFAFA]">
      <form onSubmit={handleSubmit}>
        <div className="absolute top-[82px] left-[256px] w-[662px] h-[65%] bg-[#FAFAFA] border border-[#E7F1E9] rounded-[4px] opacity-100">
          <div className="h-[35px] border"></div>

          {/* Title Input */}
          <p className="text-[24px] font-bold px-4 py-4 border-t-1">Add post title</p>

          {/* Content Textarea */}
          <textarea
            placeholder="Add content"
            value={localTitle}
            onChange={handleContentChange}
            className="h-[100%] w-full px-4 bg-[#FAFAFA] focus:outline-none"
          />
          <div className="flex !bg-[#ffff] text-[10px] py-2 items-end justify-end px-[5px] border">
            {wordCount}/{MAX_WORD_COUNT} words
          </div>

          {/* Post Button */}
          <div className="flex items-end justify-end">
            <button
              className="bg-[#0A7227] text-white text-[14px] py-[6px] px-[12px] rounded mt-[8px]"
              type="submit"
              disabled={!localTitle} // Only allow submission if title is present
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
