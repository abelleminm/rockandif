import './App.css';
import SearchBar from './SearchBar';
import AlbumPage from './Pages/AlbumPage';
import GroupPage from './Pages/GroupPage';
import HomePage from './Pages/HomePage';
import PersonPage from './Pages/PersonPage';
import SinglePage from './Pages/SinglePage';

function App() {
  return (
    <div className="App">
      <SearchBar />
      <HomePage />
      <AlbumPage />
      <GroupPage />
      <PersonPage />
      <SinglePage />
      
    </div>
  );
}

export default App;
