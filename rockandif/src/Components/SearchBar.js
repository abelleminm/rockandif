import React, { useState } from 'react'
import './SearchBar.css'
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

function SearchBar({ placeholder }) {
  const [filteredResponse, setFilteredResponse] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [request, setRequest] = useState("");

  let prefixRq = 'PREFIX owl: <http://www.w3.org/2002/07/owl#>\n '+
  'PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n '+
  'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n '+
  'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n '+
  'PREFIX foaf: <http://xmlns.com/foaf/0.1/>\n '+
  'PREFIX dc: <http://purl.org/dc/elements/1.1/>\n '+
  'PREFIX : <http://dbpedia.org/resource/>\n '+
  'PREFIX dbpedia2: <http://dbpedia.org/property/>\n '+
  'PREFIX dbpedia: <http://dbpedia.org/>\n '+
  'PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\n ';

  let reqBand_beg = 'SELECT DISTINCT ?g ?name WHERE {\
    ?g a dbo:Band; dbo:genre ?genre.\
    ?g dbp:name ?name.\
    FILTER(langMatches(lang(?name),"en") && regex(?genre, "[Rr]ock") \
    && langMatches(lang(?abstract),"en") && regex(lcase(str(?name)), "';
    
  let reqBand_end = '.*"))} ORDER BY ASC(?name) LIMIT 10';

  {/* handlefilter tries and finds the expression you're seeking in a json file, we need to adapt it to make it send requests to dbpedia!*/}
  const handleFilter = (event) => {
    setWordEntered(event.target.value);
    const searchWord = wordEntered.toLowerCase();
    console.log(searchWord);
    setRequest(prefixRq + reqBand_beg + searchWord + reqBand_end);
    sendRequest(request);
    // const newFilter = data.filter((value) => {
    //   return value.title.toLowerCase().includes(searchWord.toLowerCase());
    // });

    // if (searchWord === "") {
    //   setFilteredRequest([]);
    // } else {
    //   setFilteredRequest(newFilter);
    // }
  };

  const sendRequest = (requestContent) => {
    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(requestContent) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          setFilteredResponse(JSON.parse(this.responseText).results.bindings);
          console.log(filteredResponse);
          // afficherResultats(filteredRequest);
        }else{
          // setFilteredResponse([]);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

  const clearInput = () => {
    setFilteredResponse([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredResponse.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredResponse.length != 0 && (
        <div className="dataResult">
          <div className="dataResult-content">
          {filteredResponse.map((item) => {
            return(
            <a className="dataItem" href={item.g.value} target="_blank">
              <p>{item.name.value}</p>
            </a>)
          })}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;