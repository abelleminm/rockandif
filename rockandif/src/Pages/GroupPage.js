import React from 'react';
import Header from '../Components/Header';
import './GroupPage.css';

function GroupPage() {
  return (
    <div id="groupPage">
      <Header titre="Group : " />
      <div id="groupPageContent">
        <div id="photo">
          <img alt="photo du groupe" />
        </div>
        <text id="nomGroupe">Nom du groupe</text>
        <text id="date">Date création - Date fin</text>
        <text id="origine">Origine</text>
        <text id="description">Description</text>
        <text id="membres">Membres</text>
        <text id="style">Style</text>
        <text id="singles">Singles</text>
        <text id="label">Label</text>
        <text id="albums">Albums</text>
      </div>
    </div>
  );
}

export default GroupPage;