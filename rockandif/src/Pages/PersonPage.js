import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import './PersonPage.css';
import { useParams } from 'react-router-dom';

function PersonPage() {
  const [filteredResponse, setFilteredResponse] = useState([]);
  const { nom } = useParams();
  var titrePage = "Person : "+nom;

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

  const reqArtist = 'SELECT ?p ?abstract ?name ?bname ?bd ?town ?death ?dtown WHERE {\
    ?p a dbo:Artist; dbp:name ?name; dbo:abstract ?abstract; dbo:birthDate ?bd; dbo:birthPlace ?bp.\
    OPTIONAL { ?p dbo:deathDate ?death. }\
    OPTIONAL { ?p dbo:deathPlace ?deathtown. }\
    OPTIONAL { ?p dbo:birthName ?bname. }\
    ?bp dbp:name ?town.\
    ?deathtown dbp:name ?dtown.\
    FILTER NOT EXISTS {?bp a dbo:Country.}\
    FILTER NOT EXISTS {?deathtown a dbo:Country.}\
    FILTER(langMatches(lang(?abstract),"EN") && langMatches(lang(?name),"EN") && langMatches(lang(?bname),"EN"))\
    FILTER (regex(lcase(str(?name)), "'+nom.toLowerCase()+'"))\
    }';

    let request = prefixRq + reqArtist;

    const handleFilter = () => {
      // Encodage de l'URL à transmettre à DBPedia
      var url_base = "http://dbpedia.org/sparql";
      var url = url_base + "?query=" + encodeURIComponent(request) + "&format=json";
  
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
   };

   const clearInput = () => {
    setFilteredResponse([]);
  };

  useEffect(() => {
    handleFilter();
}, []);

  return (
    <div id="personPage">
      <Header titre={titrePage} />
      {filteredResponse.length != 0 && (
        <div id="personPageContent">
          <div id="photoPerson"/>
          {filteredResponse.map((item)=>{
            return(
              <text id="nomPerson">{item.name.value}</text>
            )
          })}
          {filteredResponse.map((item)=>{
            if(item.bname.value =! null) {
              return(
                <text id="nomNaissancePerson">{item.bname.value}</text>
              )
            }
          })}
          <text id="datePerson">Date début activité - Date fin activité</text>
          <text id="nationalitePerson">Nationalité</text>
          {filteredResponse.map((item)=>{
            return(
              <text id="descriptionPerson">{item.abstract.value}</text>
            )
          })}
          {filteredResponse.map((item)=>{
            var deathTown = "";
            var birthTwon = "";
            if(item.dtown.value != null){
              deathTown = " in "+item.dtown.value;
            }
            if(item.town.value != null){
              birthTwon = " in "+item.town.value;
            }
            var lifeDeath = item.name.value+" was born on "+item.bd.value+birthTwon+" and died on "+item.death.value+deathTown;
            var life = item.name.value+" was born on "+item.bd.value+birthTwon;
            if(item.death.value != null){
              return(
                <div id="viePerson">
                  <h3>{item.bd.value} - {item.death.value}</h3>
                  <text>{lifeDeath}</text>
                </div>
              )
            }
            else{
              return(
                <div id="viePerson">
                  <h3>{item.bd.value} - </h3>
                  <text>{life}</text>
                </div>
              )
            }
          })}
          <text id="groupesPerson">Groupes et anciens groupes</text>
          <text id="singlesPerson">Singles solo</text>
          <text id="partnersPerson">Partners</text>
        </div>
      )}      
    </div>
  );
}

export default PersonPage;