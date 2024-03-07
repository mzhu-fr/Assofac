import { createBrowserRouter } from "react-router-dom";
import App from "./App.js";

import Home from "../pages/Home/Home.js"
import { Produits } from '../pages/Produits/Produits.js'
import { Connexion } from "../pages/Connexion/Connexion.js";
import { About } from "../pages/About/About.js";
import { ErrorPage } from "../pages/Error/Error.js";
import { Admin } from "../pages/Admin/Admin.js";
import { Profil } from "../pages/Profil/Profil.js";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/produits",
        element: <Produits />,
      },
      {
        path: "/connexion",
        element: <Connexion />,
      },
      {
        path: "/a-propos",
        element: <About />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/profil",
        element: <Profil />,
      },
    ]
  }]);