import React, { useState } from 'react'
import './SearchBar.css'
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

function SearchBar({ placeholder, filter }) {
  const [filteredResponse, setFilteredResponse] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

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

  const reqBand_beg = 'SELECT DISTINCT ?g ?name ?year WHERE {\
    ?g a dbo:Band; dbo:activeYearsStartYear ?year; dbo:genre ?genre.\
    ?g foaf:name ?name.\
    FILTER(langMatches(lang(?name),"en") && regex(?genre, "[Rr]ock") && strlen(?name)>0)\
    FILTER(regex(lcase(str(?name)), "';
    
  const reqBand_end = '.*"))} ORDER BY ASC(?name) LIMIT 10';

  const defineRequest = (filter, word) => {
    let request = "";
    switch (filter) {
      case "band":
        request = prefixRq + reqBand_beg + word + reqBand_end;
        break;
      // case "album":
      //   request = prefixRq + reqAlbum_beg + word + reqAlbum_end;
      //   break;
      // case "single":
      //   request = prefixRq + reqSingle_beg + word + reqSingle_end;
      //   break;
      // case "member":
      //   request = prefixRq + reqMember_beg + word + reqMember_end;
      //   break;
      // case "date":
      //   request = prefixRq + reqDate_beg + word + reqDate_end;
      //   break;
      default:
        request = prefixRq + reqBand_beg + word + reqBand_end;
        break;
    }
    return request;
  };

  const handleFilter = (event) => {
    let searchWord = event.target.value;
    console.log("search word : " + searchWord);
    setWordEntered(searchWord);
    searchWord = searchWord.toLowerCase();
    console.log("search word : " + searchWord);
    sendRequest(searchWord);
  };

  const sendRequest = (word) => {
    const request_content = defineRequest(filter, word);
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
              <p>{item.name.value} ({item.year.value})</p>
            </a>)
          })}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;