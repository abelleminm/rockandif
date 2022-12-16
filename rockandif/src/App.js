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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="group" element={<GroupPage nom="L'Hexaspération"  />} />
        <Route path="album" element={<AlbumPage nom="Reprises de l'hiver" />} />
        <Route path="/" element={<HomePage />} />
        <Route path="person" element={<PersonPage nom="Gwen" />} />
        <Route path="single" element={<SinglePage nom="Vive le vent" />} />
        <Route path="french" element={<FrenchGroupsPage />} />
        <Route path="moroccan" element={<MoroccanGroupsPage />} />
      </Routes>
    </div>
  );
}

export default App;

//<Header titre="Welcome to Rock&IF" />
//<SearchBar placeholder="Search a rock band..."/>