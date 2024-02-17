import { Routes, Route } from 'react-router-dom';
import Home from './page/homePage';
import ErrorPage from './page/errorPage';
import Contact from './page/contact';
import Connexion from './page/login';
import SignUp from './page/sign';
import Profile from './profile/profile';
import ProfileWall from './profile/profileHome/profile-wall';


import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';

function AppRoutes() {
  return (

    <>

      <header><Navbar /></header>

      <main>
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Connexion />} />

          <Route path="/signup" element={<SignUp />} />

          <Route path="/profile" element={<Profile />}>
            <Route path="/profile/profile-wall" element={<ProfileWall />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />

        </Routes>
      </main>

      <footer><Footer /></footer>

    </>

  )
}

export default AppRoutes;
