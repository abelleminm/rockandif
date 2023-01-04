import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import './AlbumPage.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Photo from '../Components/Photo';

function AlbumPage() {
  const [filteredResponse, setFilteredResponse] = useState([]);
  const {band, nom} = useParams();
  var titrePage = "Album : "+nom;


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

  const reqAlbum = 'SELECT ?a ?abstract ?name ?artist (GROUP_CONCAT(DISTINCT ?award ; separator="*") AS ?awards) ?sales ?reldate (GROUP_CONCAT(DISTINCT ?titleName ; separator="*") AS ?titlesLink) (GROUP_CONCAT(DISTINCT ?title1 ; separator="*") AS ?titles) WHERE {\
    ?a a dbo:Album; dbo:abstract ?abstract; dbp:artist ?artiste; dbp:name ?name; dbp:award ?award.\
    { ?artiste a dbo:Band. } UNION { ?artiste a dbo:Artist. }\
    OPTIONAL { ?a dbp:salesamount ?sales. }\
    OPTIONAL { ?a dbp:released ?reldate. }\
    OPTIONAL { ?a dbp:title ?title1. }\
    OPTIONAL { ?a dbp:title ?title2. }\
    ?title2 dbp:name ?titleName.\
    ?artiste dbp:name ?artist.\
    FILTER(langMatches(lang(?abstract),"EN"))\
    FILTER(regex(lcase(str(?name)),"'+nom.toLowerCase()+'"))\
    FILTER(regex(lcase(str(?artist)),"'+band.toLowerCase()+'"))\
    }\
    LIMIT 1';

  let request = prefixRq + reqAlbum;
  
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
    <div id="albumPage">
      <Header titre={titrePage} />
      {filteredResponse.length != 0 && (
      <div id="albumPageContent">
        <Photo nom={nom} fromPage={window.location.pathname}/>
        {filteredResponse.map((item)=> {
          return (
            <text id="nomAlbum">{item.name.value}</text>
          )
        })}
        {filteredResponse.map((item)=> {
          var linkGroup = "/group/"+item.artist.value;
          return (
            <Link to={linkGroup} id="groupeAlbum">
              <text id="artisteAlbum">{item.artist.value}</text>
            </Link>
          )
        })}
        {filteredResponse.map((item)=> {
          if(item.relDate != null) {
            return (
              <text id="dateAlbum">{item.relDate.value}</text>
            )
          } else {
            return (
              <text id="dateAlbum">Unknown released date</text>
            )
          }
        })}
        {filteredResponse.map((item)=> {
          return (
            <div id="descriptionAlbumDiv">
              <h3 id="descriptionAlbumTitle">Description</h3>
              <p id="descriptionAlbum">{item.abstract.value}</p>
            </div>
          )
        })}
        {filteredResponse.map((item)=> {
          if(item.awards != null) {
            var awards = item.awards.value.split("*");
            return (
              <div id="awardAlbumDiv">
                <h3 id="awardAlbumTitle">Awards</h3>
                <ul id="awardAlbumList">
                  {awards.map((award)=> {
                    return (
                      <li id="awardAlbumItem">{award}</li>
                    )
                  })}
                </ul>
              </div>
            )
          } else {
            return (
              <div id="awardAlbumDiv">
                <h3 id="awardAlbumTitle">Awards</h3>
                <p id="awardAlbum">No awards</p>
              </div>
            )
          }
        })}
        {filteredResponse.map((item)=> {
          if(item.titles != null) {
            var titles = item.titles.value.split("*");
            var titlesLink = item.titlesLink.value.split("*");
            //trier les titres en mettant url en premier
            titles.sort(function(a, b) {
              if(a.includes("dbpedia.org")) {
                return -1;
              } else {
                return 1;
              }
            });
            //count number of url in titles
            var count = 0;
            for(var i = 0; i < titles.length; i++) {
              if(titles[i].includes("dbpedia.org")) {
                count++;
              }
            }
            //delete url from titles
            for(var i = 0; i < count; i++) {
              titles.shift();
            }
            //delete title from titles that are in titlesLink
            for(var i = 0; i < titlesLink.length; i++) {
              for(var j = 0; j < titles.length; j++) {
                if(titlesLink[i] == titles[j]) {
                  titles.splice(j, 1);
                }
              }
            }
            return (
              <div id="singlesAlbumDiv">
                <h3 id="singlesAlbumTitle">Singles</h3>
                <ul id="singlesAlbumList">
                  {titles.map((title)=> {
                    return (
                      <li id="singlesAlbumItem">{title}</li>
                    )
                  })}
                  {titlesLink.map((title)=> {
                    var linkSingle = "/single/"+band+"/"+nom+"/"+title;
                    return (
                      <Link to={linkSingle}>
                        <li id="singlesAlbumItemLinked">{title}</li>
                      </Link>
                    )
                  })}
                </ul>
              </div>
            )
          } else {
            return (
              <div id="singlesAlbumDiv">
                <h3 id="singlesAlbumTitle">Singles</h3>
                <p id="singlesAlbum">No singles</p>
              </div>
            )
          }
        })}
        {filteredResponse.map((item)=> {
          if(item.sales != null) {
            return (
              <div id="salesAlbumDiv">
                <h3 id="salesAlbumTitle">Sales</h3>
                <p id="salesAlbum">${item.sales.value}</p>
              </div>
            )
          } else {
            return (
              <div id="salesAlbumDiv">
                <h3 id="salesAlbumTitle">Sales</h3>
                <p id="salesAlbum">Unknown sales</p>
              </div>
            )
          }
        })}
      </div>
      )}
    </div>
  );
}

export default AlbumPage;