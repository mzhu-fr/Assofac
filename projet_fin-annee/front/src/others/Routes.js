import { createBrowserRouter } from "react-router-dom";
import App from "./App.js";

import Home from "../pages/Home/Home.js"
import { Produits } from '../pages/Produits/Produits.js'
import { Connexion } from "../pages/Connexion/Connexion.js";
import { About } from "../pages/About/About.js";
import { ErrorPage } from "../pages/Error/Error.js";
import { Admin } from "../pages/Admin/Admin.js";
import { Profil } from "../pages/Profil/Profil.js";
import { Panier } from "../pages/Panier/Panier.js";
import { CGV } from "../pages/cgv/CGV.js";
import { CGU } from "../pages/cgv/CGU.js";
import { Termes } from "../pages/cgv/Termes.js";

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
      {
        path: "/panier",
        element: <Panier />
      },
      {
        path: "/cgv",
        element: <CGV />
      },
      {
        path: "/cgu",
        element: <CGU />
      },
      {
        path: "/termes",
        element: <Termes />
      }
    ]
  }]);