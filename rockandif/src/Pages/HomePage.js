import React from 'react';
import SearchBar from '../Components/SearchBar';
import Header from '../Components/Header';
import Combobox from '../Components/Combobox';

function HomePage() {
  return (
    <div>
    <Header titre="Welcome to Rock&IF" />
    <SearchBar placeholder="Search a rock band..."/>
    <Combobox/>
    </div>
  );
}

export default HomePage;