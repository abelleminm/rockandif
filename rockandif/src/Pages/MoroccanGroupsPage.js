import React from 'react';
import Header from '../Components/Header';
import GroupCard from '../Components/GroupCard';
import './MoroccanGroupsPage.css';

function MoroccanGroupsPage() {
  return (
    <div id="moroccanGroupsPage">
      <Header titre="Moroccan Groups" />
      <div id="moroccanGroupsPageContent">
        <GroupCard nom="Groupe 1" />
        <GroupCard nom="Groupe 2" />
      </div>
    </div>
  );
}

export default MoroccanGroupsPage;