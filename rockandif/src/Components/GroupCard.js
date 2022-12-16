import React from "react";
import "./GroupCard.css";
import { Link } from "react-router-dom";

function GroupCard({nom}) {
    return (
        <div id="group"> 
            <div id="photo"/>
            <Link to="/group" id="nom">{nom}</Link>
        </div>
    );
}

export default GroupCard;
