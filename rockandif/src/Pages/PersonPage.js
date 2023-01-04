import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import './PersonPage.css';
import { useParams } from 'react-router-dom';
import Photo from '../Components/Photo';
import CurrentGroups from '../Components/CurrentGroups';
import FormerGroups from '../Components/FormerGroups';

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

  const reqArtist = 
    'SELECT ?p ?abstract ?name ?bname ?bd ?bp ?btown ?death ?deathtown ?dtown (GROUP_CONCAT(DISTINCT ?band ; separator="*") AS ?bands) (GROUP_CONCAT(DISTINCT ?formerband ; separator="*") AS ?formerbands) WHERE {\
    ?p a dbo:MusicalArtist; rdfs:label ?name; dbo:abstract ?abstract; dbp:birthDate ?bd.\
    OPTIONAL {\
      ?formerband1 dbo:formerBandMember ?p.\
      ?formerband1 dbp:name ?formerband.\
      FILTER(langMatches(lang(?formerband),"EN"))\
    }\
    OPTIONAL {\
      ?band1 dbo:bandMember ?p.\
      ?band1 dbp:name ?band.\
      FILTER(langMatches(lang(?band),"EN"))\
    }\
    OPTIONAL {\
    ?p dbp:birthPlace ?bp.\
    FILTER NOT EXISTS {?bp a dbo:Country.}\
    }\
    OPTIONAL {\
    ?p dbp:birthPlace ?birthp.\
    FILTER NOT EXISTS {?birthp a dbo:Country.}\
    ?birthp rdfs:label ?btown.\
    FILTER(langMatches(lang(?btown),"EN"))\
    }\
    OPTIONAL { ?p dbp:deathDate ?death. }\
    OPTIONAL {\
    ?p dbp:deathPlace ?deathtown.\
    FILTER NOT EXISTS {?deathtown a dbo:Country.}\
    }\
    OPTIONAL {\
    ?p dbp:deathPlace ?dt.\
    FILTER NOT EXISTS {?dt a dbo:Country.}\
    ?dt rdfs:label ?dtown.\
    FILTER(langMatches(lang(?dtown),"EN"))\
    }\
    OPTIONAL {\
    ?p dbp:birthName ?bname.\
    FILTER(langMatches(lang(?bname),"EN"))\
    }\
    FILTER(langMatches(lang(?abstract),"EN") && langMatches(lang(?name),"EN"))\
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
          <Photo nom={nom} fromPage={window.location.pathname}/>
          {filteredResponse.map((item)=>{
            return(
              <text id="nomPerson">{item.name.value}</text>
            )
          })}
          {filteredResponse.map((item)=>{
            if(item.bname != null) {
              return(
                <text id="nomNaissancePerson">{item.bname.value}</text>
              )
            }
            else{
              return(
                <text id="nomNaissancePerson">Unknown BirthName</text>
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
            var birthTown = "";
            if(item.dtown != null){
              deathTown = " in "+item.dtown.value;
            }
            else if(item.deathtown != null){
              deathTown = " in "+item.deathtown.value;
            }
            if(item.btown != null){
              birthTown = " in "+item.btown.value;
            }
            else if(item.bp != null){
              birthTown = " in "+item.bp.value;
            }
            if(item.death != null){
              var lifeDeath = item.name.value+" was born on "+item.bd.value+birthTown+" and died on "+item.death.value+deathTown;
              return(
                <div id="viePerson">
                  <h3>{item.bd.value} - {item.death.value}</h3>
                  <text>{lifeDeath}</text>
                </div>
              )
            }
            else{
              var life = item.name.value+" was born on "+item.bd.value+birthTown;
              return(
                <div id="viePerson">
                  <h3>{item.bd.value} - </h3>
                  <text>{life}</text>
                </div>
              )
            }
          })}
          {filteredResponse.map((item)=> {
            var bandsIndex = false;
            var formerBandsIndex = false;
            var bands;
            var formerbands;

            if(item.bands.value != "") {
              bands = item.bands.value.split("*");
              bandsIndex = true;
            }
            if(item.formerbands.value != "") {
              formerbands = item.formerbands.value.split("*");
              formerBandsIndex = true;
            }
            return(
              <div id="bandsDiv">
              <CurrentGroups bandindex={bandsIndex} bands={bands}></CurrentGroups>
              <FormerGroups formerbandindex={formerBandsIndex} formerbands={formerbands}></FormerGroups>
              </div>
            )
          })}
          <text id="singlesPerson">Singles solo</text>
          <text id="partnersPerson">Partners</text>
        </div>
      )}      
    </div>
  );
}

export default PersonPage;