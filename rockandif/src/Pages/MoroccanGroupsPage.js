import React from 'react';
import Header from '../Components/Header';
import GroupCard from '../Components/GroupCard';
import './MoroccanGroupsPage.css';
import SearchBarCountryGroups from '../Components/SearchBarCountryGroups';

function MoroccanGroupsPage() {
  return (
    <div id="moroccanGroupsPage">
      <Header titre="Moroccan Groups" />
      <div id="frenchgroupspagecontent">
        <SearchBarCountryGroups countryName="Morocco" placeholder="Rechercher un groupe Marocain"/>
       </div>
    </div>
  );
}

export default MoroccanGroupsPage;