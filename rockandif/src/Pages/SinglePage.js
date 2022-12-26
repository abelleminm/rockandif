import React, {useEffect, useState} from 'react';
import Header from '../Components/Header';
import './SinglePage.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function SinglePage() {
  const [filteredResponse, setFilteredResponse] = useState([]);
  const {band, album, title} = useParams();
  var titrePage = "Single : "+title;

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

  const reqSingle = 'SELECT ?song ?abstract ?name ?artist ?reldate ?album (GROUP_CONCAT(DISTINCT ?genre; separator="*") AS ?genre) (GROUP_CONCAT(DISTINCT ?label; separator="*") AS ?label) (GROUP_CONCAT(DISTINCT ?award ; separator="*") AS ?awards)\
  WHERE {\
  ?song a dbo:Song; dbo:abstract ?abstract; dbp:artist ?artiste; dbp:name ?name; dbo:album ?albumurl .\
  { ?artiste a dbo:Band. } UNION { ?artiste a dbo:Artist. }\
  OPTIONAL { ?song  dbp:award ?award. }\
  OPTIONAL { ?song  dbp:label ?label. }\
  OPTIONAL { ?song  dbp:genre ?genre. }\
  ?artiste dbp:name ?artist.\
  ?albumurl dbp:name ?album.\
  FILTER(langMatches(lang(?abstract),"EN") && regex(lcase(str(?artist)),"'+band.toLowerCase()+'.*") && regex(lcase(str(?name)),"'+title.toLowerCase()+'.*") && regex(lcase(str(?album)), "'+album.toLowerCase()+'.*"))\
  }\
  LIMIT 50';

  let request = prefixRq + reqSingle;

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
    <div id="singlePage">
      <Header titre={titrePage} />
      {filteredResponse.length != 0 && (
        <div id="singlePageContent">
          <div id="coverSingle"/>
          {filteredResponse.map((item)=>{
            return(
              <text id="nomSingle">{item.name.value}</text>
            )
          })}
          {filteredResponse.map((item)=>{
            var linkAlbum = "/album/" + item.artist.value + "/" + item.album.value;
            return(
              <Link to={linkAlbum} id="nomAlbumSingle">Album : {item.album.value}</Link>
            )
          })}
          {filteredResponse.map((item)=>{
            var linkBand = "/group/" + item.artist.value;
            return(
              <Link to={linkBand} id="groupeSingle">{item.artist.value}</Link>
            )
          })}
          {filteredResponse.map((item)=>{
            if(item.relDate != null) { 
                return(
                  <text id="dateSingle">{item.relDate.value}</text>
                )
              } else {
                return(
                  <text id="dateSingle">Unknown released Date</text>
                )
              }
            })}
          {filteredResponse.map((item)=>{
            return(
              <div id="descriptionSingleDiv">
                <h3 id="descriptionSingleTitle">Description</h3>
                <text id="descriptionSingle">{item.abstract.value}</text>
              </div>
            )
          })}
          {filteredResponse.map((item)=>{
            if(item.genre != null) {
              var genres = item.genre.value.split("*");
              return(
                <div id="genreSingleDiv">
                  <h3 id="genreSingleTitle">Genre</h3>
                  <ul id="genreSingleList">
                  {genres.map((genre)=>{
                      return(
                        <li id="genreSingle">{genre}</li>
                      )
                  })}
                  </ul>
                </div>
              )
            } else {
              return(
                <div id="genreSingleDiv">
                  <h3 id="genreSingleTitle">Genre</h3>
                  <text id="genreSingle">Unknown genre</text>
                </div>
              )
            }
          })}
          {filteredResponse.map((item)=>{
            if(item.awards != null) {
              var awards = item.awards.value.split("*");
              return(
                <div id="awardSingleDiv">
                  <h3 id="awardSingleTitle">Awards</h3>
                  <ul id="awardSingleList">
                  {awards.map((award)=>{
                      return(
                        <li id="awardSingle">{award}</li>
                      )
                  })}
                  </ul>
                </div>
              )
            } else {
              return(
                <div id="awardSingleDiv">
                  <h3 id="awardSingleTitle">Awards</h3>
                  <text id="awardSingle">No awards</text>
                </div>
              )
            }
          })}
          {filteredResponse.map((item)=>{
            if(item.label != null) {
              var labels = item.label.value.split("*");
              return(
                <div id="labelSingleDiv">
                  <h3 id="labelSingleTitle">Label</h3>
                  <ul id="labelSingleList">
                  {labels.map((label)=>{
                      return(
                        <li id="labelSingle">{label}</li>
                      )
                  })}
                  </ul>
                </div>
              )
            } else {
              return(
                <div id="labelSingleDiv">
                  <h3 id="labelSingleTitle">Label</h3>
                  <text id="labelSingle">Unknown label</text>
                </div>
              )
            }
          })}
        </div>
      )}
    </div>
  );
}

export default SinglePage;