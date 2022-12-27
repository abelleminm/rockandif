import React, { useEffect, useState } from 'react'
import './SearchBar.css'
import SearchIcon from "@mui/icons-material/Search";
import GroupCard from './GroupCard';

function SearchBarCountryGroups({ placeholder,countryName }) {
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

  let reqBand_beg = 'SELECT DISTINCT ?name  WHERE {\
    ?g a dbo:Band; dbo:genre ?genre; dbo:hometown ?town; dbo:abstract ?abstract.\
    ?town dbo:country ?country.\
    ?country rdfs:label "'+countryName+'"@en.\
    ?g dbp:name ?name.\
    FILTER(langMatches(lang(?name),"en") && regex(?genre, "[Rr]ock") && langMatches(lang(?abstract),"en"))\
    FILTER(regex(lcase(str(?name)), "'
  const reqBand_end = '.*"))} ORDER BY ASC(?name)';


  const defineRequest = (word) => {
    let request = prefixRq + reqBand_beg + word + reqBand_end;
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
    const request_content = defineRequest(word);
    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(request_content) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          setFilteredResponse(JSON.parse(this.responseText).results.bindings);
          console.log("filterdResponse: " + filteredResponse);
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

  //affichage de tous les groupes français au chargement de la page
  useEffect(() => {
    sendRequest("");
  },[])


  return (
    <div>
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
            <SearchIcon />
        </div>
      </div>
      </div>
      {filteredResponse.length != 0 && (
        <div className="groupcards-bloc">
          {filteredResponse.map((item) => {
            return(
              <GroupCard nom={item.name.value}></GroupCard>
             )
          })}
          </div>
      )}
    </div>
  );
  
}

export default SearchBarCountryGroups;