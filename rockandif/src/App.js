import './App.css';
import SearchBar from './SearchBar';
import AlbumPage from './Pages/AlbumPage';
import GroupPage from './Pages/GroupPage';
import HomePage from './Pages/HomePage';
import PersonPage from './Pages/PersonPage';
import SinglePage from './Pages/SinglePage';
import Header from './Components/Header';

function App() {
  return (
    <div className="App">
      <Header />
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
