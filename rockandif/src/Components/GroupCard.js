import React from "react";
import "./GroupCard.css";
import { Link } from "react-router-dom";

function GroupCard({nom}) {
    var link = "/group/" + nom;
    return (
        <div id="group"> 
            <div id="photo"/>
            <Link to={link} id="nom">{nom}</Link>
        </div>
    );
}

export default GroupCard;
