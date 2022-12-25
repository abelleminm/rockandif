import React, { useState } from 'react';
import SearchBar from '../Components/SearchBar';
import Header from '../Components/Header';
import Combobox from '../Components/Combobox';

function HomePage() {
  const [filter, setFilter] = useState("band");
  var pholder = filter=="album"? "Search an "+ filter +"..." : "Search a "+ filter +"...";
  return (
    <div>
    <Header titre="Welcome to Rock&IF" />
    <SearchBar placeholder={pholder} filter={filter}/>
    <Combobox setFilter={setFilter}/>
    </div>
  );
}

export default HomePage;