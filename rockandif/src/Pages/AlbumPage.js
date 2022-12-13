import React from 'react';
import Header from '../Components/Header';
import './AlbumPage.css';

function AlbumPage() {
  return (
    <div id="albumPage">
      <Header titre="Album : " />
      <div id="albumPageContent">
        <div id="cover"/>
        <text id="nomAlbum">Nom de l'album</text>
        <text id="groupe">Groupe</text>
        <text id="date">Date</text>
        <text id="description">Description</text>
        <text id="writers">Writers</text>
        <text id="singles">Singles</text>
        <text id="style">Style</text>
        <text id="award">Award</text>
        <text id="studio">Studio</text>
      </div>
    </div>
  );
}

export default AlbumPage;