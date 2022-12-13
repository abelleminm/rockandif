import React from 'react';
import Header from '../Components/Header';
import './SinglePage.css';

function SinglePage() {
  return (
    <div id="singlePage">
      <Header titre="Single : " />
      <div id="singlePageContent">
        <div id="cover"/>
        <text id="nomSingle">Nom du single</text>
        <text id="nomAlbum">Nom de l'album</text>
        <text id="groupe">Groupe</text>
        <text id="date">Date</text>
        <text id="description">Description</text>
        <text id="style">Style</text>
        <text id="writers">Writers</text>
        <text id="award">Award</text>
        <text id="label">Label</text>
      </div>
    </div>
  );
}

export default SinglePage;