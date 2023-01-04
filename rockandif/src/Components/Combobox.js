import React from "react";
import "./Combobox.css";

function Combobox({setFilter}) {

    const changeFilter = (e) => {
        setFilter(e.target.value);
    };

    return (   
        <div id="wrapper" className="myWrapper">
            <label htmlFor="combobox">Filter : </label>
            <div id="combobox" className="custom-select">
                <select id="combo" onChange={changeFilter}>
                    <option value="band">Rock Band</option>
                    {/* <option value="album">Album</option>
                    <option value="single">Single</option>*/}
                    <option value="person">Member of a band</option> 
                    <option value="date">Date of creation</option>
                </select>
                <span className="focus"></span>
            </div>
        </div>
    );
}

export default Combobox;
