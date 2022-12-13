import React from "react";
import "./Header.css";
import logo from "../Images/Logo.PNG";
import Fab from '@mui/material/Fab';

function Header({titre}) {
    return (
        <header>
            <Fab id="boutonMenu" aria-label="add">
                Menu
            </Fab>
            <h1 id="titre" >{titre}</h1>
            <img src={logo} alt="Logo" />
        </header>
    );
}

export default Header;
