import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import GroupCard from '../Components/GroupCard';
import './FrenchGroupsPage.css';
import { Group } from '@mui/icons-material';

function FrenchGroupsPage() {
  const [filteredResponse, setFilteredResponse] = useState([]);
  const prefixRq = 'PREFIX owl: <http://www.w3.org/2002/07/owl#>\n ' +
    'PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n ' +
    'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n ' +
    'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n ' +
    'PREFIX foaf: <http://xmlns.com/foaf/0.1/>\n ' +
    'PREFIX dc: <http://purl.org/dc/elements/1.1/>\n ' +
    'PREFIX : <http://dbpedia.org/resource/>\n ' +
    'PREFIX dbpedia2: <http://dbpedia.org/property/>\n ' +
    'PREFIX dbpedia: <http://dbpedia.org/>\n ' +
    'PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\n ';

  let reqBand = 'SELECT DISTINCT ?name  WHERE {\
    ?g a dbo:Band; dbo:genre ?genre; dbo:hometown ?town; dbo:abstract ?abstract.\
    ?town dbo:country ?country.\
    ?country rdfs:label "France"@en.\
    ?g dbp:name ?name.\
    OPTIONAL { ?g dbo:activeYearsStartYear ?year. }\
    OPTIONAL { ?g dbp:currentMembers ?p. }\
    OPTIONAL { ?g dbo:recordLabel ?l }.\
    OPTIONAL { ?s dbo:artist ?g. }\
    OPTIONAL { ?g dbp:pastMembers ?p2. }\
    FILTER(langMatches(lang(?name),"en") && regex(?genre, "[Rr]ock") && langMatches(lang(?abstract),"en"))\
    }\
    ORDER BY ASC(?name)';
  const request_content = prefixRq + reqBand;
  // Encodage de l'URL à transmettre à DBPedia
  var url_base = "http://dbpedia.org/sparql";
  var url = url_base + "?query=" + encodeURIComponent(request_content) + "&format=json";

  useEffect(() => {


    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        setFilteredResponse(JSON.parse(this.responseText).results.bindings);
      }
    };
  }, [])
  return (
    <div id="frenchGroupsPage">
      <Header titre="French Groups" />
      {filteredResponse.length != 0 && (
        <div id="frenchGroupsPageContent">
          {filteredResponse.map((item) => {
            return (
              <GroupCard nom={item.name.value}></GroupCard>
              )
          })}
        </div>
      )}
    </div>
  );
}

export default FrenchGroupsPage;
