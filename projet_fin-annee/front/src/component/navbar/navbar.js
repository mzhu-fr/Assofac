import React from "react";
import { NavbarContent } from "./navbar-content";
import { Link } from "react-router-dom";
import Logo from "../../asset-images/logo.png";
import { useDispatch } from "react-redux";
import { showSidebar } from "../../redux-store/actions/sidebar-action";
import { CgMenuGridR } from "react-icons/cg";
import "./navbar.css";

export const Navbar = () => {
    const dispatch = useDispatch();
    const handleClick = () => {
        console.log("show sidebar");
        dispatch(showSidebar());
    };
    return (
        <div className="navbar-wrapper">
            <div
                onClick={() => {
                    handleClick();
                }}
                className="burger-menu">
                <CgMenuGridR />
            </div>
            <div className="logo-name">
                <Link to="/" className="website-name-logo">
                    <img src={Logo} alt="logo" />
                </Link>
            </div>
            <div className="navbar-content">
                <NavbarContent />
            </div>
            <div
                onClick={() => {
                    handleClick();
                }}
                className="burger-menu">
                <CgMenuGridR />
            </div>
        </div>
    );
};
