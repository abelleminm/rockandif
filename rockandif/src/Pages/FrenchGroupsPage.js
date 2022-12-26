import Header from '../Components/Header';
import './FrenchGroupsPage.css';
import SearchBarFrenchGroups from '../Components/SearchBarFrenchGroups';

function FrenchGroupsPage() {
  return (
    <div id="frenchGroupsPage">
      <Header titre="French Groups" />
      <div id="frenchgroupspagecontent">
        <SearchBarFrenchGroups placeholder="Rechercher un groupe français"/>
       </div>
    </div>
  );
}

export default FrenchGroupsPage;
