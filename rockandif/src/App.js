import './App.css';
import AlbumPage from './Pages/AlbumPage';
import GroupPage from './Pages/GroupPage';
import HomePage from './Pages/HomePage';
import PersonPage from './Pages/PersonPage';
import SinglePage from './Pages/SinglePage';
import FrenchGroupsPage from './Pages/FrenchGroupsPage';
import MoroccanGroupsPage from './Pages/MoroccanGroupsPage';
import { Routes, Route } from 'react-router-dom';
import PageNotFound from './Pages/PageNotFound';
import SearchResultsPage from './Pages/SearchResultsPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="group/:nom" element={<GroupPage />} />
        <Route path="album" element={<AlbumPage nom="Reprises de l'hiver" />} />
        <Route path="/" element={<HomePage />} />
        <Route path="person" element={<PersonPage nom="Gwen" />} />
        <Route path="single" element={<SinglePage nom="Vive le vent" />} />
        <Route path="french-groups" element={<FrenchGroupsPage />} />
        <Route path="moroccan-groups" element={<MoroccanGroupsPage />} />
        <Route path="search/:type/:text/:number" element={<SearchResultsPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;

//<Header titre="Welcome to Rock&IF" />
//<SearchBar placeholder="Search a rock band..."/>