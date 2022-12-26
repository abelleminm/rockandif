import Header from '../Components/Header';
import './FrenchGroupsPage.css';
import SearchBarCountryGroups from '../Components/SearchBarCountryGroups';

function FrenchGroupsPage() {
  return (
    <div id="frenchGroupsPage">
      <Header titre="French Groups" />
      <div id="frenchgroupspagecontent">
        <SearchBarCountryGroups countryName="France" placeholder="Rechercher un groupe français"/>
        <div id="test">

        </div>
       </div>
    </div>
  );
}

export default FrenchGroupsPage;
