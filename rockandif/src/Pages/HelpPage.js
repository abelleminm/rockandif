// new page for help
import React from 'react';
import Header from '../Components/Header';
import { Link } from 'react-router-dom';
// import './HelpPage.css';

function HelpPage() {
    // page has a youtube video embedded with the clip never gon' give you up
    return (
        <div className="helpPage">
            <Header titre="Help" />
            <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
    )
}

export default HelpPage;