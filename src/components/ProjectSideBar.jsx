import { React, useEffect, useRef } from "react";
import Modal from "./Modal";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchActions } from "../store/search-slice";
import { gapi } from "gapi-script";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import RoofingIcon from "@mui/icons-material/Roofing";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SearchIcon from "@mui/icons-material/Search";
import useFetchItems from "./hooks/useFetchItems";

const clientId =
  "1037415014792-btegcu6ssjqk1pqn5aj9unfvvd6j3ear.apps.googleusercontent.com";

export default function ProjectSideBar() {
  const focussed = useSelector((state) => state.search.foccussed);

  const isLogin = useSelector((state) => state.auth.isLogin);
  const name = useSelector((state) => state.auth.name);
  const imageUrl = useSelector((state) => state.auth.imageUrl);

  const GET_SEARCHES_URL = "http://localhost:3000/results";
  const { isLoading, error, data } = useFetchItems(GET_SEARCHES_URL);

  let searchResults = [];
  if (data && data.searches && data.searches.length > 0) {
    searchResults = data.searches.slice();
    searchResults.sort(function (a, b) {
      var c = new Date(a.time);
      var d = new Date(b.time);
      return d - c;
    });
    searchResults = searchResults.slice(0, 5);
  }

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const result = useSelector((state) => state.search.searchResult);

  const seachModalRef = useRef();

  const dispatch = useDispatch();

  let modalClasses =
    "backdrop:bg-stone-900/90 p-4 rounded-md shadow-md w-[70%] h-[70%]";

  if (result) {
    modalClasses += "h-[80%]";
  }
  const searchButtonClasses =
    "px-4 py-2 mt-2 w-56 text-xs md:text-base rounded-full bg-stone-200 text-stone-400 hover:bg-stone-600 hover:text-stone-100 font-medium text-center inline-flex items-center";

  let selectedSideMenuClasses =
    "w-full text-left px-2 py-1 rounded-sm my-1 font-medium text-center inline-flex items-center";

  const cancelButtonClasses =
    "px-4 py-2 mt-2 w-20 absolute top-3 right-5 text-xs md:text-base rounded-full bg-stone-200 text-stone-400 hover:bg-stone-600 hover:text-stone-100 font-medium text-center inline-flex items-center";

  function handleNewSearch() {
    seachModalRef.current.open();
    dispatch(searchActions.initiateSearch());
  }

  function onModalClose() {
    seachModalRef.current.close();
  }

  function truncate(str) {
    return str.length > 35 ? str.substring(0, 35) + "..." : str;
  }

  return (
    <aside className="px-8 py-6 bg-stone-900 text-stone-50 md:w-72 h-screen sticky top-0">
      <h2 className="mb-8 font-bold md:text-xl text-stone-200">
        PGD - Knowledge base
      </h2>
      <div>
        <button
          className={searchButtonClasses}
          onClick={handleNewSearch}
          title="Set a focus for your sources"
        >
          <SearchIcon />
          New Search
        </button>
      </div>
      <Modal ref={seachModalRef} modalClasses={modalClasses}>
        <button className={cancelButtonClasses} onClick={onModalClose}>
          CLOSE
        </button>
        <Search modal={true} />
      </Modal>
      <ul className="mt-16">
        <li key="home">
          <button>
            <Link to="/home" className={selectedSideMenuClasses}>
              <RoofingIcon />
              <p className="px-4 text-3xl">Home</p>
            </Link>
          </button>
        </li>

        <li key="discovery">
          <button>
            <Link to="/discover" className={selectedSideMenuClasses}>
              <CenterFocusWeakIcon />
              <p className="px-4 text-3xl">Discover</p>
            </Link>
          </button>
        </li>

        <li key="library">
          <button>
            <Link to="/library" className={selectedSideMenuClasses}>
              <LibraryBooksIcon />
              <p className="px-4 text-3xl">Library</p>
            </Link>
          </button>
          <ul className="ml-12">
            {searchResults.map((searchResult) => (
              <li key={searchResult._id}>
                <button>
                  <p className="text-left">* {truncate(searchResult.prompt)}</p>
                </button>
              </li>
            ))}
          </ul>
        </li>

        {!isLogin && (
          <li
            id="loginBtn"
            className="absolute bottom-0 text-center items-center"
          >
            <LoginButton />
          </li>
        )}

        {isLogin && (
          <li
            id="logoutBtn"
            className="absolute bottom-0 text-center items-center"
          >
            <div className="flex flex-row">
              <img src={imageUrl} className="mb-2 w-12 h-12 rounded-full" />
              <p className="ml-1 mb-4 font-bold text-xl py-2">{name}</p>
              <LogoutButton />
            </div>
          </li>
        )}
      </ul>
    </aside>
  );
}
