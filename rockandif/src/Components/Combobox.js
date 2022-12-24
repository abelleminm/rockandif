import React from "react";
import "./Combobox.css";

function Combobox() {
    return (   
        <div id="wrapper" class="myWrapper">
            <label for="combobox">Filter : </label>
            <div id="combobox" class="custom-select">
                <select id="mySelect">
                    <option value="band">Rock Band</option>
                    <option value="album">Album</option>
                    <option value="single">Single</option>
                    <option value="person">Member of the band</option>
                    <option value="date">Date of creation</option>
                </select>
                <span class="focus"></span>
            </div>
        </div>
    );
}

export default Combobox;
