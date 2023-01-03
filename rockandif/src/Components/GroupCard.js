import React from "react";
import "./GroupCard.css";
import { Link } from "react-router-dom";
import Photo from "./Photo.js";

function GroupCard({nom,type}) {

    var link = "";
    switch (type) {
        case "group":
            link = "/group/" + nom;
            break;
        case "person":
            link = "/person/" + nom;
            break;
        default: 
            link = "/group/" + nom;
            break;
    }
    
    return (
        <div id="group"> 
            <Photo nom={nom} fromPage={window.location.pathname}/>
            <Link to={link} id="nom">{nom}</Link>
        </div>
    );
}

export default GroupCard;
