import React from 'react';
import Header from '../Components/Header';
import './SinglePage.css';
import { Link } from 'react-router-dom';

function SinglePage() {
  return (
    <div id="singlePage">
      <Header titre="Single : " />
      <div id="singlePageContent">
        <div id="coverSingle"/>
        <text id="nomSingle">Nom du single</text>
        <Link to="/album" id="nomAlbumSingle">Nom de l'album</Link>
        <Link to="/group" id="groupeSingle">Groupe</Link>
        <text id="dateSingle">Date</text>
        <text id="descriptionSingle">Description</text>
        <text id="styleSingle">Style</text>
        <text id="writersSingle">Writers</text>
        <text id="awardSingle">Award</text>
        <text id="labelSingle">Label</text>
      </div>
    </div>
  );
}

export default SinglePage;