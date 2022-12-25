import React from 'react';
import Header from '../Components/Header';
import './PersonPage.css';

function PersonPage({nom}) {
  var titrePage = "Person : "+nom;
  return (
    <div id="personPage">
      <Header titre={titrePage} />
      <div id="personPageContent">
        <div id="photoPerson"/>
        <text id="nomPerson">{nom}</text>
        <text id="datePerson">Date début activité - Date fin activité</text>
        <text id="nationalitePerson">Nationalité</text>
        <text id="descriptionPerson">Description</text>
        <text id="viePerson">Infos naissance et mort</text>
        <text id="groupesPerson">Groupes et anciens groupes</text>
        <text id="singlesPerson">Singles solo</text>
        <text id="partnersPerson">Partners</text>
      </div>
    </div>
  );
}

export default PersonPage;