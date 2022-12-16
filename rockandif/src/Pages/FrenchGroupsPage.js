import React from 'react';
import Header from '../Components/Header';
import GroupCard from '../Components/GroupCard';
import './FrenchGroupsPage.css';

function FrenchGroupsPage() {
  return (
    <div id="frenchGroupsPage">
      <Header titre="French Groups" />
      <div id="frenchGroupsPageContent">
        <GroupCard nom="Groupe 1" />
        <GroupCard nom="Groupe 2" />
        <GroupCard nom="Groupe 3" />
        <GroupCard nom="Groupe 4" />
        <GroupCard nom="Groupe 5" />
        <GroupCard nom="Groupe 6" />
        <GroupCard nom="Groupe 7" />
        <GroupCard nom="Groupe 8" />
        <GroupCard nom="Groupe 9" />
        <GroupCard nom="Groupe 10" />
        <GroupCard nom="Groupe 11" />
        <GroupCard nom="Groupe 12" />
        <GroupCard nom="Groupe 13" />
        <GroupCard nom="Groupe 14" />
        <GroupCard nom="Groupe 15" />
      </div>
    </div>
  );
}

export default FrenchGroupsPage;