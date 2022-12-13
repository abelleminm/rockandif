import './App.css';
import SearchBar from './Components/SearchBar';
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
      <SearchBar placeholder="Search a rock band..."/>
    </div>
  );
}

export default App;
