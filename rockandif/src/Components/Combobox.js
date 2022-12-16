import React from "react";
import "./Combobox.css";

function Combobox() {
    return (
        <div id="combobox" class="custom-select">
            <select>
                <option value="band">Rock Band</option>
                <option value="album">Album</option>
                <option value="single">Single</option>
                <option value="person">Member of the band</option>
                <option value="date">Date of creation</option>
            </select>
        </div>
    );
}

export default Combobox;
