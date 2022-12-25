import React, { useEffect, useState } from 'react'
import Header from '../Components/Header';
import GroupCard from '../Components/GroupCard';
import './SearchResultsPage.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SearchResultsPage() {
  const [filteredResponse, setFilteredResponse] = useState([]);
  const [wordEntered, setWordEntered] = useState(useParams().text);
  var titre = "Search results for " + wordEntered; 
  var pageNumber = useParams().number;
  var type = useParams().type;
  var limit = 20;
  var offset = limit*pageNumber - 20;

  const prefixRq = 'PREFIX owl: <http://www.w3.org/2002/07/owl#>\n '+
  'PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n '+
  'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n '+
  'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n '+
  'PREFIX foaf: <http://xmlns.com/foaf/0.1/>\n '+
  'PREFIX dc: <http://purl.org/dc/elements/1.1/>\n '+
  'PREFIX : <http://dbpedia.org/resource/>\n '+
  'PREFIX dbpedia2: <http://dbpedia.org/property/>\n '+
  'PREFIX dbpedia: <http://dbpedia.org/>\n '+
  'PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\n ';

  const reqBand_beg = 'SELECT DISTINCT ?g ?name ?year (count(?name) as ?number) WHERE {\
    ?g a dbo:Band; dbo:activeYearsStartYear ?year; dbo:genre ?genre.\
    ?g foaf:name ?name.\
    FILTER(langMatches(lang(?name),"en") && regex(?genre, "[Rr]ock") && strlen(?name)>0)\
    FILTER(regex(lcase(str(?name)), "';
  const reqBand_end = '.*"))}   ORDER BY ASC(?name) OFFSET '+offset +' LIMIT '+limit;

  const reqDate_beg = 'SELECT DISTINCT ?g ?name ?year WHERE {\
    ?g a dbo:Band; dbo:activeYearsStartYear ?year; dbo:genre ?genre.\
    ?g foaf:name ?name.\
    FILTER(langMatches(lang(?name),"en") && regex(?genre, "[Rr]ock") && strlen(?name)>0)\
    FILTER(year(xsd:date(?year))=';
    const reqDate_end = ')}LIMIT 10';

    const defineRequest = (typeRe, textRe) => {
    let request = "";
    switch (typeRe) {
      case "band":
        request = prefixRq + reqBand_beg + textRe + reqBand_end;
        break;
      case "date":
        request = prefixRq + reqDate_beg + textRe + reqDate_end;
        break;
      default:
        request = prefixRq + reqBand_beg + textRe + reqBand_end;
        break;
    }
    return request;
  };

  const handleFilter = () => {
    sendRequest(wordEntered.toLowerCase());
  };

  const sendRequest = (textToSend) => {
    const request_content = defineRequest(type, textToSend);
    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(request_content) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          setFilteredResponse(JSON.parse(this.responseText).results.bindings);
          console.log(filteredResponse);
          // afficherResultats(filteredRequest);
        }else{
          setFilteredResponse([]);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

  const clearInput = () => {
    setFilteredResponse([]);
    setWordEntered("");
  };

  useEffect(() => {
    handleFilter();
  }, []);

  return (
    <div id="searchResultsPage" >
      <Header titre={titre} />
      {filteredResponse.length != 0 && (
        <div id="searchResultsPageContent">
          {filteredResponse.map((item) => {
            return(
              <GroupCard nom={item.name.value} />)
          })}
          

        </div>
      )}
      <div id="searchResultsPageFooter">
        {pageNumber > 1 && (
          <Link to={"/search/"+type+"/"+wordEntered+"/"+(pageNumber-1)}> 
            <button class="buttons" id="previousPageButton">Previous page</button>
          </Link>
        )}
          <text id="pageNumberText">Page {pageNumber}</text>
        {filteredResponse.length == limit && (
          <Link to={"/search/"+type+"/"+wordEntered+"/"+(Number(pageNumber)+1)}>
          <button class="buttons" id="nextPageButton">Next page</button>
          </Link>
        )}
      </div>
    </div>
  );
}


export default SearchResultsPage;