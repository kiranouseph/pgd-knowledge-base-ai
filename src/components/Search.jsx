import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "../store/search-slice";
import SearchActionButton from "./UI/SearchActionButton";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useRef, useState } from "react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import FocusItems from "./FocusItems";
import ResultComponent from "./ResultComponent";
import ErrorComponent from "./ErrorComponent";
import LoadingComponent from "./LoadingComponent";
import Modal from "./Modal";
import CollectionsIcon from "@mui/icons-material/Collections";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import useMutation from "./hooks/useMutataion";
import axios from "redaxios";

export default function Search(modal) {
  const inputRef = useRef();
  const imageInputRef = useRef();
  const imageModalRef = useRef();
  const [pickedImages, setPickedImages] = useState([]);

  const SAVE_SEARCH_URL = "http://localhost:3000/result/save";
  const {
    mutate: saveSearch,
    isLoading: isSaving,
    error: saveError,
  } = useMutation({ url: SAVE_SEARCH_URL });

  const SAVE_IMAGE_URL = "http://localhost:3000/upload";
  const {
    mutate: uploadFile,
    isLoading: isFileUploading,
    error: isFileUplaodError,
  } = useMutation({ url: SAVE_IMAGE_URL });

  const dispatch = useDispatch();
  const focussed = useSelector((state) => state.search.foccussed);
  const focusItemNumber = useSelector((state) => state.search.focusItemNumber);
  const showResult = useSelector((state) => state.search.searchResult);
  const isLoading = useSelector((state) => state.search.isLoading);
  const isError = useSelector((state) => state.search.isError);
  const paramsVisible = useSelector((state) => state.search.paramsVisible);
  const searchBtnPos = useSelector((state) => state.search.searchBtnPos);

  let modalClasses =
    "backdrop:bg-stone-900/90 p-4 rounded-md shadow-md w-[70%] h-[70%]";

  const cancelButtonClasses =
    "px-4 py-2 mt-2 w-20 absolute top-3 right-5 text-xs md:text-base rounded-full bg-stone-200 text-stone-400 hover:bg-stone-600 hover:text-stone-100 font-medium text-center inline-flex items-center";

  const focusButtonClasses =
    "px-4 py-2 text-xs md:text-base rounded-full bg-stone-200 text-stone-400 hover:bg-stone-600 hover:text-stone-100 font-medium text-center inline-flex items-center";

  const attachButtonClasses = focusButtonClasses + " mt-2 ml-2";

  const searchButtonClasses = focusButtonClasses + " mt-2 ml-2";

  const searchButtonRightClasses = focusButtonClasses + " mt-10 ml-2";

  function onModalOpen() {
    imageModalRef.current.open();
  }

  function onModalClose() {
    imageModalRef.current.close();
  }

  function onClickFocus() {
    dispatch(searchActions.focusAction());
  }

  function handlePickClick() {
    imageInputRef.current.click();
  }

  function handlIeImageChange(event) {
    setPickedImages([]);
    let files = event.target.files;
    let imageIndex = 0;
    for (let file of files) {
      handleLoadImage(file, imageIndex);
      imageIndex++;
    }
  }

  const handleLoadImage = (file, imageIndex) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // as a good practice, use a function to set state
        setPickedImages((pickedImages) => [
          ...pickedImages,
          {
            imagePreviewUrl: reader.result,
            image: file,
            imageIndex: imageIndex,
          },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  function search() {
    if (pickedImages.length > 0) {
      runForImageSearch(inputRef.current.value);
    } else {
      runForTextSearch(inputRef.current.value);
    }
  }

  async function runForTextSearch(prompt) {
    try {
      const searchPrompt = getFocusPrompt(prompt);

      const API_KEY = "AIzaSyCz8wupBJ8fZV9w1vwqOMAUHC7uvn8NAtY";
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      dispatch(searchActions.setLoading());
      const result = await model.generateContentStream(searchPrompt);
      let output = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        output += chunkText;
        dispatch(
          searchActions.setSearchResult({
            result: output,
          })
        );
      }
      dispatch(searchActions.markResultsCompleted());

      const searchAndResObj = {
        prompt: prompt,
        result: output,
        time: new Date(),
      };

      saveToDb(searchAndResObj, null);
    } catch (error) {
      console.log("error", error);
      dispatch(
        searchActions.setError({
          error: err,
        })
      );
    }
  }

  async function runForImageSearch(prompt) {
    try {
      const searchPrompt = getFocusPrompt(prompt);
      const API_KEY = "AIzaSyCz8wupBJ8fZV9w1vwqOMAUHC7uvn8NAtY";
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

      const imageParts = [];
      for (let image of pickedImages) {
        let inlineDataPart = await fileToGenerativePart(image.image);
        imageParts.push(inlineDataPart);
      }

      dispatch(searchActions.setLoading());
      const result = await model.generateContentStream([
        searchPrompt,
        imageParts,
      ]);
      let output = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        output += chunkText;
        dispatch(
          searchActions.setSearchResult({
            result: output,
          })
        );
      }
      dispatch(searchActions.markResultsCompleted());

      const searchAndResObj = {
        prompt: prompt,
        result: output,
        time: new Date(),
      };

      let imagesToUpload = [];
      for (let image of pickedImages) {
        imagesToUpload.push(image.image);
      }

      await saveToDb(searchAndResObj, imagesToUpload);
    } catch (error) {
      console.log("error", error);
      dispatch(
        searchActions.setError({
          error: error,
        })
      );
    }
  }

  function getFocusPrompt(prompt) {
    if (focusItemNumber) {
      switch (focusItemNumber) {
        case 1:
          return prompt;
        case 2:
          return "Suggest some academic published papers about " + prompt;
        case 3:
          return "Suggest some simple articles about " + prompt;
        case 4:
          return "Suggest something from wolfran alpha about " + prompt;
        case 5:
          return "Suggest some youtube links about " + prompt;
        case 6:
          return "Suggest some redit discussions about " + prompt;
      }
    }
  }

  async function saveToDb(searchAndResObj, imagesToUpload) {
    let imageUrls = [];
    if (imagesToUpload && imagesToUpload.length > 0) {
      imageUrls = await uploadImages(imagesToUpload);
    }

    const formData = new FormData();
    formData.append("prompt", searchAndResObj.prompt);
    formData.append("result", searchAndResObj.result);
    formData.append("time", searchAndResObj.time);
    formData.append("imageUrls", imageUrls);
    await saveSearch(formData);
  }

  async function uploadImages(imagesToUpload) {
    let imageUrls = [];
    for (let imageToUpload of imagesToUpload) {
      imageUrls.push(await uploadImage(imageToUpload));
    }
    return imageUrls;
  }

  async function uploadImage(imageToUpload) {
    const formData = new FormData();
    formData.append("image", imageToUpload);
    const uploadedImageUrl = await callUploadApi(formData);
    return uploadedImageUrl;
  }

  async function callUploadApi(data) {
    let imageUrl;
    await axios
      .post("http://localhost:3000/upload", data)
      .then((res) => {
        imageUrl = res.data.imageUrl;
      })
      .catch((error) => {});
    return imageUrl;
  }

  const fileToGenerativePart = async (file) => {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    });

    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  };

  return (
    <>
      <div className={modal ? "ml-[10%] mr-[10%]" : "ml-[20%] mr-[20%]"}>
        <div className="flex">
          <input
            id="searchWidgetTrigger"
            ref={inputRef}
            placeholder="Ask anything..."
            className="w-full p-3 mt-10 rounded-md border-2 border-stone-950 text-stone-600"
          />
          {searchBtnPos === "right" && (
            <SearchActionButton
              searchButtonClasses={searchButtonRightClasses}
              onSearchClick={search}
              visible="false"
            />
          )}
        </div>
        <div className="flex justify-between">
          {paramsVisible && (
            <div className="text-left">
              <button
                className={focusButtonClasses}
                title="Set a focus for your sources"
                onClick={onClickFocus}
              >
                <KeyboardDoubleArrowDownIcon />
                Focus
              </button>
              <button className={attachButtonClasses} onClick={handlePickClick}>
                <AttachFileIcon />
                Attach
              </button>
              <input
                ref={imageInputRef}
                className="hidden"
                type="file"
                multiple
                accept="image/png, image/jpg"
                onChange={handlIeImageChange}
                required
              />
              {pickedImages?.length > 0 && (
                <button className={attachButtonClasses} onClick={onModalOpen}>
                  <CollectionsIcon />
                  Selected Images
                </button>
              )}
            </div>
          )}
          <div className="text-right">
            {searchBtnPos === "down" && (
              <SearchActionButton
                searchButtonClasses={searchButtonClasses}
                onSearchClick={search}
                visible="false"
              />
            )}
          </div>
        </div>
        <div>
          {focussed && <FocusItems />}
          {showResult && <ResultComponent />}
          {isLoading && <LoadingComponent />}
          {isError && <ErrorComponent />}
        </div>

        {pickedImages?.length > 0 && (
          <Modal ref={imageModalRef} modalClasses={modalClasses}>
            <button className={cancelButtonClasses} onClick={onModalClose}>
              CLOSE
            </button>
            <ImageList
              sx={{ width: 500, height: 450 }}
              cols={3}
              rowHeight={164}
            >
              {pickedImages.map((item) => (
                <ImageListItem key={item.imageIndex}>
                  <img src={item.imagePreviewUrl} />
                </ImageListItem>
              ))}
            </ImageList>
          </Modal>
        )}
      </div>
    </>
  );
}
