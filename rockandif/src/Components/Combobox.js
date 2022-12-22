import React from "react";
import "./Combobox.css";

function Combobox({setFilter}) {

    const changeFilter = (e) => {
        setFilter(e.target.value);
    };

    return (
        <div id="combobox" className="custom-select">
            <select id="combo" onChange={changeFilter}>
                <option value="band">Rock Band</option>
                <option value="album">Album</option>
                <option value="single">Single</option>
                <option value="member">Member of a band</option>
                <option value="date">Date of creation</option>
            </select>
        </div>
    );
}

export default Combobox;