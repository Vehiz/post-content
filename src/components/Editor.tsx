import ReactQuill from "react-quill";
import { usePost } from "../components/PostContext";

const Editor = () => {
    const { content} = usePost();
    
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
    <div className="p-4 !bg-[#F5F5F5]">
            <ReactQuill
              value={content}
              modules={modules}
              className="focus:outline-none rounded-md"
              placeholder=""
            />
          </div>
  )
}

export default Editor