import Header from '../Components/Header';
import './FrenchGroupsPage.css';
import SearchBarCountryGroups from '../Components/SearchBarCountryGroups';

function FrenchGroupsPage() {
  return (
    <div id="frenchGroupsPage">
      <Header titre="French Groups" />
      <div id="frenchgroupspagecontent">
        <SearchBarCountryGroups countryName="France" placeholder="Search for a French group..."/>
       </div>
    </div>
  );
}

export default FrenchGroupsPage;
