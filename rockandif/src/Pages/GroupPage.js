import React from 'react';
import Header from '../Components/Header';
import './GroupPage.css';

function GroupPage({nom}) {
  var titrePage = "Group : "+nom;
  return (
    <div id="groupPage">
      <Header titre={titrePage} />
      <div id="groupPageContent">
        <div id="photoGroup"/>
        <text id="nomGroupe">{nom}</text>
        <text id="dateGroup">Date création - Date fin</text>
        <text id="origineGroup">Origine</text>
        <text id="descriptionGroup">Description</text>
        <text id="membresGroup">Membres</text>
        <text id="styleGroup">Style</text>
        <text id="singlesGroup">Singles</text>
        <text id="labelGroup">Label</text>
        <text id="albumsGroup">Albums</text>
      </div>
    </div>
  );
}

export default GroupPage;