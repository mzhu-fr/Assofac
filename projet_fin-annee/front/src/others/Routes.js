import { createBrowserRouter } from "react-router-dom";
import App from "./App.js";

import Home from "../pages/Home/Home.js"


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    //errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      // {
      //   path: "/about",
      //   element: <About />,
      // },
    ]
  }]);