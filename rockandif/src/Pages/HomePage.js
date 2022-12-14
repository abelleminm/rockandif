import React from 'react';
import SearchBar from '../Components/SearchBar';
import Header from '../Components/Header';

function HomePage() {
  return (
    <div>
    <Header titre="Welcome to Rock&IF" />
    <SearchBar placeholder="Search a rock band..."/>
    </div>
  );
}

export default HomePage;