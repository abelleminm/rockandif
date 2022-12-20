import React from 'react';
import Header from '../Components/Header';
import GroupCard from '../Components/GroupCard';
import './SearchResultsPage.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SearchResultsPage() {
  let {text} = useParams();
  var titre = "Search results for " + text; 
  var pageNumber = useParams().number;
  return (
    <div id="searchResultsPage">
      <Header titre={titre} />
      <div id="searchResultsPageContent">
        <GroupCard nom="Groupe 1" />
        <GroupCard nom="Groupe 2" />
        <GroupCard nom="Groupe 3" />
        <GroupCard nom="Groupe 4" />
        <GroupCard nom="Groupe 5" />
        <GroupCard nom="Groupe 6" />
        <GroupCard nom="Groupe 7" />
        <GroupCard nom="Groupe 8" />
        <GroupCard nom="Groupe 9" />
        <GroupCard nom="Groupe 10" />
        <GroupCard nom="Groupe 11" />
        <GroupCard nom="Groupe 12" />
        <GroupCard nom="Groupe 13" />
        <GroupCard nom="Groupe 14" />
        <GroupCard nom="Groupe 15" />
      </div>
      <div id="searchResultsPageFooter">
        <button id="previousPageButton">Previous page</button>
        <text id="pageNumberText">Page {pageNumber}</text>
        <button id="nextPageButton">Next page</button>
      </div>
    </div>
  );
}


export default SearchResultsPage;