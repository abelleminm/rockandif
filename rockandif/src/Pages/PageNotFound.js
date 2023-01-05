import React from 'react';
import Header from '../Components/Header';
import './PageNotFound.css';

function PageNotFound() {
    return (
        <div>
            <div>
                <Header titre="404 Page not found" />
            </div>
            <div id="contener">
                <div className="instructions">
                <text className="instruction">Page not found</text>
                </div>
            </div>
        </div>
    );
}

export default PageNotFound;