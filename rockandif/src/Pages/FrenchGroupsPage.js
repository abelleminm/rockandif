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
      </div>
    </div>
  );
}

export default FrenchGroupsPage;