import React, { useState } from 'react'
import Header from '../Components/Header';
import { useParams } from 'react-router-dom';
import './GroupPage.css';

function GroupPage() {
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

  let reqBand_beg = 'SELECT DISTINCT ?g ?name ?abstract ?year WHERE {\
    ?g a dbo:Band; dbo:genre ?genre.\
    ?g foaf:name ?name.\
    ?g dbo:abstract ?abstract. \
    ?g dbo:activeYearsStartYear ?year. \
    FILTER(langMatches(lang(?name),"en") && regex(?genre, "[Rr]ock") \
    && regex(lcase(str(?name)), "';
    
  let reqBand_end = '.*"))} ORDER BY ASC(?name) LIMIT 10';

  
  const rechercher = (nom) => {
    var request = prefixRq + reqBand_beg + nom + reqBand_end; 
    console.log("print out " + request);
    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(request) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          setFilteredResponse(JSON.parse(this.responseText).results.bindings);
          console.log(filteredResponse); 
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

  let { nom } = useParams(); 
  rechercher(nom); 
  var titrePage = "Group : "+nom;
  return (
    <div id="groupPage">
      <Header titre={titrePage} />
      {filteredResponse.length != 0 && (
        <div id="groupPageContent">
          <div id="photoGroup"/>
          <div id="nomGroupe">{nom}</div>
          <div id="dateGroup">Date création - Date fin</div>
          <div id="origineGroup">Origine</div>
          {filteredResponse.map(item => {
            return(
              <div className="descriptionGroup">
                {item.abstract.value}
              </div>
            ); 
          })}
          <div id="membresGroup">Membres</div>
          <div id="styleGroup">Style</div>
          <div id="singlesGroup">Singles</div>
          <div id="labelGroup">Label</div>
          <div id="albumsGroup">Albums</div>
        </div>
      )}
    </div>
  );
}

export default GroupPage;