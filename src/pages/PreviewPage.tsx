import React, { useState, ChangeEvent } from "react";
import { usePost } from "../components/PostContext";
import Editor from "../components/Editor"

const PreviewPage: React.FC = () => {
  const { title, content, image, video, setImage, setVideo } = usePost();
  const [modalType, setModalType] = useState<string | null>(null);
  const [wordCount, setWordCount] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const videoProviders = ["YouTube", "Vimeo"];
  const socialMedia = ["Facebook", "Instagram", "Tiktok" ]

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const openModal = (type: string) => setModalType(type);
  const closeModal = () => setModalType(null);

  const MAX_WORD_COUNT = 1000;
 
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl); // Store image in context
      setVideo(""); 
      setShowPreview(false); // Hide video preview
      closeModal();
    }
  };

  const handleEmbed = () => {
    if (video) {
      setShowPreview(true); // Show the video preview
      closeModal();
    }
  };
 
  const convertToEmbedUrl = (url: string): string => {
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/;
    const vimeoRegex = /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/;
  
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch && youtubeMatch[1]) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }
  
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
  
    return url; // Fallback if URL is not recognized
  };
  const handleURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputUrl = event.target.value;
    const embedUrl = convertToEmbedUrl(inputUrl);
    setVideo(embedUrl);
    setImage(""); // Clear image if video is added
  };
  return (
    <div className="absolute top-[82px] left-[256px] w-[662px]  border-[#E7F1E9] rounded-[4px] opacity-100">
      <div className="w-[662px]">
        <div className="w-[662px] h-[] bg-[#F5F5F5] border rounded-md">
          {/* Header Spacer */}
          <div className="h-9 bg-[#FAFAFA] border-b"></div>

          {/* Title Section */}
          <div className="bg-[#F7F7F7] px-4 rounded-t-md">
            <h2 className="text-xl font-semibold text-[#1A1A1A]">{title}</h2>
          </div>

          {/* Editor Section */}
          <Editor/>
          {image && (
            <div className="px-4 h-auto">
              <img
                src={image}
                alt="Uploaded"
                className="max-w-full h-auto rounded-md"
              />
            </div>
          )}
          {showPreview && (
            <div className="mt-4 px-4">
              <iframe
                width="100%"
                height="315"
                src={video as string}
                title="Embedded Video"
                allowFullScreen
              ></iframe>
            </div>
          )}
          <div className="bg-[#F7F7F7] px-4 rounded-t-md pt-2">
            <h2 className="text-[14px] font-semibold text-[#1A1A1A]">
              {content}
            </h2>
          </div>
          {/* Plus Icon Button */}
          <div
            className="bg-[#E7F1E9] flex items-center justify-center rounded-full w-8 h-8 mx-4 m-2 cursor-pointer hover:bg-[#CDE8D4] transition"
            onClick={() => openModal("dropdown")}
          >
            +
          </div>

          {/* Dropdown Options */}
          {modalType === "dropdown" && (
            <div className="absolute w-56 bg-white border border-gray-200 rounded-lg shadow-lg">
              <p className="text-sm text-gray-500 px-4 py-2 border-b">EMBEDS</p>

              <button
                className="flex items-center px-4 py-3 hover:bg-[#E7F1E9] transition w-full"
                onClick={() => openModal("picture")}
              >
                <img
                  src="/icons/image-icon.svg"
                  alt="Picture Icon"
                  className="w-5 h-5 mr-3"
                />
                <div>
                  <p className="text-sm font-medium">Picture</p>
                  <p className="text-xs text-gray-400">jpeg, png</p>
                </div>
              </button>

              <button
                className="flex items-center px-4 py-3 hover:bg-[#E7F1E9] transition w-full"
                onClick={() => openModal("video")}
              >
                <img
                  src="/icons/video-icon.svg"
                  alt="Video Icon"
                  className="w-5 h-5 mr-3"
                />
                <div className="">
                  <p className="text-sm font-medium text-start">Video</p>
                  <p className="text-xs text-gray-400">
                    JW Player, YouTube, Vimeo
                  </p>
                </div>
              </button>

              <button
                className="flex items-center px-4 py-3 hover:bg-[#E7F1E9] transition w-full"
                onClick={() => openModal("socials")}
              >
                <img
                  src="/icons/social-icon.svg"
                  alt="Social Icon"
                  className="w-5 h-5 mr-3"
                />
                <div>
                  <p className="text-sm text-start font-medium">Social</p>
                  <p className="text-xs text-start text-gray-400">
                    Instagram, Twitter, TikTok, Facebook
                  </p>
                </div>
              </button>
            </div>
          )}

          {modalType === "picture" && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white w-[45%] p-6 rounded-md shadow-lg relative">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                  onClick={closeModal}
                >
                  ✕
                </button>

                <h2 className="text-[16px] font-semibold mb-4">Embed</h2>
                <p className="text-sm font-medium mb-2">Upload Image</p>
                <p className="text-xs text-gray-400 mb-4">FILE UPLOAD</p>

                <div className="border-dashed border-2 border-[#0A7227] rounded-md h-32 flex items-center justify-center">
                  <label
                    htmlFor="fileUpload"
                    className="bg-white border border-[#0A7227] text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-[#F1F8F3] transition"
                  >
                    Import Image from Device
                  </label>
                  <input
                    id="fileUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>

                <div className="flex justify-start mt-6 text-[14px] space-x-4">
                  <button
                    className="bg-[#0A7227] text-white px-4 py-2 rounded hover:bg-[#0A9A38] transition"
                    onClick={closeModal}
                  >
                    Embed
                  </button>
                  <button
                    className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition"
                    onClick={() => handleImageUpload}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

         {/* {Video modal} */}
          {modalType === "video" && (
            <div className="fixed inset-0 bg-black bg-opacity-30 text-[10px] flex items-center justify-center z-50">
              <div className="bg-white w-[40%] p-6 rounded-md shadow-lg relative">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                  onClick={closeModal}
                >
                  ✕
                </button>

                <h2 className="text-[16px] font-semibold mb-4">Embed</h2>
                <div className=" grid grid-col gap-2">
                  <label>VIDEO PROVIDER</label>
                  <select
                    value={selectedOption}
                    onChange={handleSelectChange}
                    className="border bg-[#FAFAFA] rounded p-2 focus:outline-none"
                  >
                    <option value="" disabled>
                      Select a provider
                    </option>
                    {videoProviders.map((provider, index) => (
                      <option key={index} value={provider}>
                        {provider}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-col gap-2 mt-2">
                  <label htmlFor="video">URL</label>
                  <input
                    id="videoURL"
                    type="text"
                    onChange={handleURLChange}
                    className="border bg-[#FAFAFA] rounded p-2 focus:outline-none"
                  />
                </div>

                <div className="flex justify-start text-[14px] mt-6 space-x-4">
                  <button
                    className="bg-[#0A7227] text-white px-4 py-2 rounded hover:bg-[#0A9A38] transition"
                    onClick={handleEmbed}
                  >
                    Embed
                  </button>
                  <button
                    className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* {Socials modal} */}
          {modalType === "socials" && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center text-[10px] justify-center z-50">
              <div className="bg-white w-[45%] p-6 rounded-md shadow-lg relative">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                  onClick={closeModal}
                >
                  ✕
                </button>

                <h2 className="text-[16px] font-semibold mb-4">Embed</h2>

                <div className=" grid grid-col gap-2 uppercase">
                  <label>social media</label>
                  <select className="border bg-[#FAFAFA] !text-[12px] rounded p-2 focus:outline-none"
                  >
                    <option value="" disabled>
                      Select a provider
                    </option>
                    {socialMedia.map((medium, index) => (
                      <option key={index} value={medium}>
                        {medium}
                      </option>
                    ))}
                  </select>                
                </div>
                <div className="grid grid-col gap-2 mt-2 uppercase">
                  <label>url</label>
                  <input
                    type="text"
                    className="border bg-[#FAFAFA] !text-[12px] rounded p-2 focus:outline-none"
                  />
                </div>
                <div className="grid grid-col gap-2 mt-2 uppercase">
                  <label>code</label>
                  <input
                    type="text"
                    className="border bg-[#FAFAFA] !text-[12px] rounded p-2 focus:outline-none"
                  />
                </div>
                <div className="flex justify-start mt-6 text-[14px] space-x-4">
                  <button
                    className="bg-[#0A7227] text-white px-4 py-2 rounded hover:bg-[#0A9A38] transition"
                    onClick={closeModal}
                  >
                    Embed
                  </button>
                  <button
                    className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border bg-white flex justify-end text-sm px-4 py-2 rounded">
          <p>
            {wordCount}/{MAX_WORD_COUNT} words
          </p>
        </div>
        <div className="flex justify-end px- py-2 text-sm border-[#E7F1E9]">
          <button
            className="bg-[#0A7227] text-white py-2 px-4 rounded-md hover:bg-[#0A9A38] transition"
            type="submit"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
