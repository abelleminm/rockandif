import React, { useEffect, useState } from 'react';
import SearchBar from '../Components/SearchBar';
import Header from '../Components/Header';
import Combobox from '../Components/Combobox';

function HomePage() {
  const [filter, setFilter] = useState("band");
  var pholder = filter=="album"? "Search an "+ filter +"..." : "Search a "+ filter +"...";
  const [response, setResponse] = useState([]);

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

  const reqAlbum = 'SELECT ?g ?rockAbstract WHERE {\
    ?g a dbo:Genre ; foaf:name ?n ; dbo:abstract ?rockAbstract.\
    FILTER(STR(?n) = "Rock music")\
    FILTER(langMatches(lang(?rockAbstract),"en"))}LIMIT 1';

  var request = prefixRq + reqAlbum;

  const sendRequest = () => {
    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(request) + "&format=json";
  
    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    console.log(response);
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        setResponse(JSON.parse(this.responseText).results.bindings[0].rockAbstract.value);
        console.log(response);
      } else {
        setResponse([]);
      }
  };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

    //affichage de l'abstract au moment du chargement de la page
    useEffect(() => {
      sendRequest();
    },[])

  return (
    <div>
    <Header titre="Welcome to Rock&IF" />
    <SearchBar placeholder={pholder} filter={filter}/>
    <Combobox setFilter={setFilter}/>
    <br/><br/>
    <hr></hr>
    <div id="descriptionRock">
        <h1>What is Rock 'n' Roll ?</h1>
            <p id="rockAbstract">
              {response}
            </p>
    </div>
    </div>
  );
}

export default HomePage;