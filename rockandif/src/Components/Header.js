import React from "react";
import "./Header.css";
import logo from "../Images/Logo.PNG";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import HeaderMenu from "./HeaderMenu";



function Header() {
    return (
        <header>
            <div id="header-menu">
                <HeaderMenu/>
            </div>
            <h1 id="titre" >Welcome to Rock&IF</h1>
            <img src={logo} alt="Logo" />
        </header>
    );
}

export default Header;
