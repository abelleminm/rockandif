import React from "react";
import "./Header.css";
import logo from "../Images/Logo.PNG";
import HeaderMenu from "./HeaderMenu";
import { Link } from "react-router-dom";

function Header({titre}) {
    return (
        <header>
            <div id="header-menu">
                <HeaderMenu/>
            </div>
            <h1 id="titre" >{titre}</h1>
           <img src={logo} alt="Logo" />
        </header>
    );
}

export default Header;
