import React, { useState } from "react";
import "./Header.css";
import logo from "../Images/Logo.PNG";
import logo_animated from "../Images/Logo_animated.gif";
import HeaderMenu from "./HeaderMenu";
import { Link } from "react-router-dom";

function Header({ titre }) {

    const [over, setOver] = useState(false);
    return (
        <header>
            <div class="box2d" id="header-menu">
                <HeaderMenu/>
            </div>
           <h1 class="box2d" id="titre" >{titre}</h1>


<div id="home-link">
    <Link class="box2d" onMouseOver={() => setOver(true)}
                onMouseOut={() => setOver(false)} to="/"><img src={over ? logo_animated : logo} alt="Logo" /></Link>
</div>
     

          
    
       </header>
    );
}
export default Header;
