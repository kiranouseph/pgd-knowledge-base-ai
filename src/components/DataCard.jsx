import React, { useRef } from "react";
import ReactTimeAgo from "react-time-ago";
import CollectionsIcon from "@mui/icons-material/Collections";
import Modal from "./Modal";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function DataCard({ content }) {
  let images = [];

  let imageUrls = content.imageUrls;

  if (imageUrls) {
    for (let imageUrl of imageUrls) {
      images.push({ id: imageUrl, imageUrl: imageUrl });
    }
  }

  const imageModalRef = useRef();
  let modalClasses =
    "backdrop:bg-stone-900/90 p-4 rounded-md shadow-md w-[70%] h-[70%]";

  const cancelButtonClasses =
    "px-4 py-2 mt-2 w-20 absolute top-3 right-5 text-xs md:text-base rounded-full bg-stone-200 text-stone-400 hover:bg-stone-600 hover:text-stone-100 font-medium text-center inline-flex items-center";

  function openSearchedImagesModal() {
    imageModalRef.current.open();
  }

  function closeSearchedImagesModal() {
    imageModalRef.current.close();
  }
  return (
    <div className="flex flex-row py-4 border-b-2">
      {content.image && (
        <div className="w-[26rem]">
          <img src={content.image} />
        </div>
      )}

      <div className="flex flex-col text-left ml-5 text-wrap">
        <div className="font-bold">{content.prompt}</div>
        <div className="line-clamp-3">{content.result}</div>
        <div className="flex flex-row py-1">
          {content.views && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          )}
          {content.views && <p className="ml-2">13,711</p>}
          {content.forks && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
              />
            </svg>
          )}
          {content.forks && <p className="ml-2">1,746</p>}
          {content.time && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          )}
          {content.time && (
            <p className="ml-2">
              <ReactTimeAgo date={content.time} locale="en-US" />
            </p>
          )}

          {images?.length > 0 && (
            <button onClick={openSearchedImagesModal}>
              <CollectionsIcon />
              searched Image
            </button>
          )}

          {images?.length > 0 && (
            <Modal ref={imageModalRef} modalClasses={modalClasses}>
              <button
                className={cancelButtonClasses}
                onClick={closeSearchedImagesModal}
              >
                CLOSE
              </button>
              <ImageList
                sx={{ width: 500, height: 450 }}
                cols={3}
                rowHeight={164}
              >
                {images.map((item) => (
                  <ImageListItem key={item.id}>
                    <img src={item.imageUrl} />
                  </ImageListItem>
                ))}
              </ImageList>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}
