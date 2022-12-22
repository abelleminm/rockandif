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
import MoroccanGroupsPage from './Pages/MoroccanGroupsPage';
import { Routes, Route } from 'react-router-dom';
import SearchResultsPage from './Pages/SearchResultsPage';

function App() {
  return (
    <div className="App">
      <Routes>
<<<<<<< HEAD
        <Route path="group" element={<GroupPage  />} />
=======
        <Route path="group/:nom" element={<GroupPage />} />
>>>>>>> cb7e3f86db69e4cc018569abcafaf99f6ee90cf9
        <Route path="album" element={<AlbumPage nom="Reprises de l'hiver" />} />
        <Route path="/" element={<HomePage />} />
        <Route path="person" element={<PersonPage nom="Gwen" />} />
        <Route path="single" element={<SinglePage nom="Vive le vent" />} />
        <Route path="french" element={<FrenchGroupsPage />} />
        <Route path="moroccan" element={<MoroccanGroupsPage />} />
        <Route path="search/:type/:text/:number" element={<SearchResultsPage />} />
      </Routes>
    </div>
  );
}

export default App;

//<Header titre="Welcome to Rock&IF" />
//<SearchBar placeholder="Search a rock band..."/>