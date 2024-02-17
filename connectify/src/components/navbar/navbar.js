import { useContext } from 'react';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../page/userContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';

function openNav() {
    console.log("open navbar");
    document.getElementById("nav-mobile").style.width = "100vw";
}

function closeNav() {
    console.log("close navbar");
    document.getElementById("nav-mobile").style.width = "0%";
}

function Header() {

    const navigate = useNavigate();
    const logOut = async () => {
        try {
            await signOut(auth);
            navigate("/");
            console.log("you left, bye bye ! ")
        }
        catch {
            alert("Can't log out, retry later");
        }
    }
    const { currentUser } = useContext(UserContext);

    if (!currentUser) {
        return (
            <div className="navbar">

                <Link to="/" className="logoNav">Connectify</Link >

                <div className="navbarContent">
                    <Link to="/" className="navName homeStyle">Home</Link>

                    <Link to="/login" className="navName">Log In</Link>

                    <Link to="/signup" onClick="" className="navName signBox">Sign Up</Link>
                </div>

                <span className='menu-burger' onClick={openNav}>☰ </span>
                <div id="nav-mobile" className="overlay">
                    <span className="open-nav" onClick={closeNav}>X </span>
                    <div className="overlay-content">
                        <Link to="/" onClick={closeNav}>Accueil</Link>
                        <Link to="/login" onClick={closeNav}>Connexion</Link>
                        <Link to="/signup" onClick={closeNav}>Inscription</Link>
                    </div>

                </div >
            </div>
        )
    }


    return (
        <div className="navbar">

            <Link to="/" className="logoNav">Connectify</Link >

            <div className="navbarContent">
                <Link to="/profile/profile-wall" className="navName homeStyle">Profile</Link>

                <Link to="/contact" className="navName homeStyle">Contact</Link>

                <Link to="/" onClick={logOut} className="navName signBox">Log Out</Link>
            </div>

            <span className='menu-burger' onClick={openNav}>☰ </span>
            <div id="nav-mobile" className="overlay">
                <span className="open-nav" onClick={closeNav}>X </span>
                <div className="overlay-content">
                    <Link to="/profile/profile-wall" className="navName homeStyle" onClick={closeNav}>Profile</Link>

                    <Link to="/contact" className="navName homeStyle" onClick={closeNav}>Contact</Link>

                    <Link to="/" onClick={logOut} className="navName signBox">Log Out</Link>
                </div>

            </div >

        </div>
    );
}


export default Header;