import React from 'react';
import Header from '../Components/Header';
import './AlbumPage.css';
import { Link } from 'react-router-dom';

function AlbumPage() {
  return (
    <div id="albumPage">
      <Header titre="Album : " />
      <div id="albumPageContent">
        <div id="coverAlbum"/>
        <text id="nomAlbum">Nom de l'album</text>
        <Link to="/group" id="groupeAlbum">Groupe</Link>
        <text id="dateAlbum">Date</text>
        <text id="descriptionAlbum">Description</text>
        <text id="writersAlbum">Writers</text>
        <text id="singlesAlbum">Singles</text>
        <text id="styleAlbum">Style</text>
        <text id="awardAlbum">Award</text>
        <text id="studioAlbum">Studio</text>
      </div>
    </div>
  );
}

export default AlbumPage;