import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Provider } from "react-redux";

import { AuthContextProvider } from "./AuthContext";
import Store from '../redux-store/store'

import { Navbar } from '../component/navbar/navbar.js';
import { Footer } from '../component/footer/footer.js';
import { Sidebar } from "../component/navbar/sidebar.js";


function App() {
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
