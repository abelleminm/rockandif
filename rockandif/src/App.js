import './App.css';
import SearchBar from './Components/SearchBar';
import AlbumPage from './Pages/AlbumPage';
import GroupPage from './Pages/GroupPage';
import HomePage from './Pages/HomePage';
import PersonPage from './Pages/PersonPage';
import SinglePage from './Pages/SinglePage';
import Header from './Components/Header';
import { Group } from '@mui/icons-material';
import GroupCard from './Components/GroupCard';
import FrenchGroupsPage from './Pages/FrenchGroupsPage';

function App() {
  return (
    <div className="App">
      <GroupPage/>
    </div>
  );
}

export default App;

//<Header titre="Welcome to Rock&IF" />
//<SearchBar placeholder="Search a rock band..."/>