import React from 'react';
import Header from '../Components/Header';
import SearchBarCountryGroups from '../Components/SearchBarCountryGroups';

function MoroccanGroupsPage() {
  return (
    <div id="moroccanGroupsPage">
      <Header titre="Moroccan Groups" />
      <div id="frenchgroupspagecontent">
        <SearchBarCountryGroups countryName="Morocco" placeholder="Search for a Moroccan Group..."/>
       </div>
    </div>
  );
}

export default MoroccanGroupsPage;