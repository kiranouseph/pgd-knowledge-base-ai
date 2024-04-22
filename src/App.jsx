import HomePage from "./pages/HomePage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import LibraryPage from "./pages/LibraryPage";
import DiscoverPage from "./pages/DiscoverPage";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "home", element: <HomePage /> },
      { path: "library", element: <LibraryPage /> },
      { path: "discover", element: <DiscoverPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
