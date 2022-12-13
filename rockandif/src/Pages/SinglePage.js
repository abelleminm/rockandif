import React from 'react';
import Header from '../Components/Header';
import './SinglePage.css';

function SinglePage() {
  return (
    <div id="singlePage">
      <Header titre="Single : " />
      <div id="singlePageContent">
        <div id="coverSingle"/>
        <text id="nomSingle">Nom du single</text>
        <text id="nomAlbumSingle">Nom de l'album</text>
        <text id="groupeSingle">Groupe</text>
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