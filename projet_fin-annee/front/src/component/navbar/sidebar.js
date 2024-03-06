import React from 'react'
import { NavbarContent } from './navbar-content'
import { AiFillCloseSquare } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { hideSidebar } from '../../redux-store/actions/sidebar-action';

export const Sidebar = () => {
    const sidebar = useSelector((state) => state.sidebar)
    const dispatch = useDispatch();

    const handleClick = () => {
        console.log("close sidebar")
        dispatch(hideSidebar());
    }
  return (
    <div className="sidebar" id={sidebar ? "display-sidebar" : "hide-sidebar"}>
            <div className="close-sidebar">
                <AiFillCloseSquare onClick={() => { handleClick() }} />
            </div>
            <div className="sidebar-links-list">
                <NavbarContent />
            </div>
        </div>
  )
}
