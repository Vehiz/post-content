import React, { createContext, useContext, useState, ReactNode } from "react";

interface PostContextType {
  title: string;
  content: string;
  image: string | null;
  video: string | null;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setImage: (image: string | null) => void;
  setVideo: (video: string | null) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);

  return (
    <PostContext.Provider
      value={{
        title,
        content,
        image,
        video,
        setTitle,
        setContent,
        setImage,
        setVideo,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePost must be used within a PostProvider");
  }
  return context;
};
