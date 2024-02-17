import { Meteo } from "./pages/meteo";
import { Movie } from "./pages/movie";
import { Navbar } from "./pages/navbar";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { OneMovie } from "./pages/one-movie";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/meteo" element={<Meteo />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/movie/:id" element={<OneMovie />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
