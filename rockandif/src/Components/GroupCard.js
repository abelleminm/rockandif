import React from "react";
import "./GroupCard.css";
import { Link } from "react-router-dom";
import Photo from "./Photo.js";

function GroupCard({nom}) {
    var link = "/group/" + nom;
    return (
        <div id="group"> 
            <Photo nom={nom} fromPage={window.location.pathname}/>
            <Link to={link} id="nom">{nom}</Link>
        </div>
    );
}

export default GroupCard;
