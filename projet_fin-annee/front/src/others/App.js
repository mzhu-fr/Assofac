import React, { Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { Provider } from "react-redux";

import { AuthContextProvider } from "./AuthContext";
import Store from '../redux-store/store'

import { Navbar } from '../component/navbar/navbar.js';
import { Footer } from '../component/footer/footer.js';
import { Sidebar } from "../component/navbar/sidebar.js";
import axios from 'axios'


function App() {
  const [dataProduct, setDataProduct] = useState({})
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/product-cable/cable")
        setDataProduct(res.data)
        localStorage.setItem("produits", JSON.stringify(dataProduct))
        if (!localStorage.getItem("panier")) {
          localStorage.setItem("panier", [])
        }
      } catch (err) {
        console.log("Erreur dans la récupération de données.")
      }
    }
    getData()
  })
  return (
    <div>
      <Provider store={Store}>
        <AuthContextProvider>
          <Navbar />
          <Sidebar />
          <Suspense>
            <Outlet />
          </Suspense>
          <Footer />
        </AuthContextProvider>
      </Provider>
    </div>
  );
}

export default App
