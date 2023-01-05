import React, { useState } from 'react'
import Header from '../Components/Header';
import { useParams, Link } from 'react-router-dom';
import './GroupPage.css';
import Photo from '../Components/Photo.js'
class GroupPage extends React.Component {
  constructor(props){
    super(props); 
    this.state = {
      filteredResponse: [], 
      filteredAlbumResponse: [],
      wordEntered: "", 
      request: "", 
      nom: ""
    }
    this.prefixRq = 'PREFIX owl: <http://www.w3.org/2002/07/owl#>\n '+
    'PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n '+
    'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n '+
    'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n '+
    'PREFIX foaf: <http://xmlns.com/foaf/0.1/>\n '+
    'PREFIX dc: <http://purl.org/dc/elements/1.1/>\n '+
    'PREFIX : <http://dbpedia.org/resource/>\n '+
    'PREFIX dbpedia2: <http://dbpedia.org/property/>\n '+
    'PREFIX dbpedia: <http://dbpedia.org/>\n '+
    'PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\n ';

    this.reqBand_beg = 'SELECT DISTINCT ?g ?name ?abstract ?year ?origin  \
    (GROUP_CONCAT(DISTINCT ?genreName; separator=" ; ") AS ?genre) (GROUP_CONCAT(DISTINCT ?nameMember; separator=" ; ") AS ?members) (GROUP_CONCAT(DISTINCT ?nameOldMember; separator=" ; ") AS ?oldmembers)   (GROUP_CONCAT(DISTINCT ?l; separator=" ; ") AS ?label)  WHERE {\
      ?g a dbo:Band; dbo:genre ?genre.\
      ?genre foaf:name ?genreName.\
      ?g foaf:name ?name.\
      ?g dbo:abstract ?abstract. \
      ?g dbo:activeYearsStartYear ?year. \
      ?g dbp:origin ?origin \
      OPTIONAL {?g dbp:currentMembers ?nameMember}\
      OPTIONAL {?g dbp:pastMembers ?nameOldMember}\
      OPTIONAL { ?g dbo:recordLabel ?l }.\
      FILTER(langMatches(lang(?name),"en") && regex(?genre, "[Rr]ock") \
      && langMatches(lang(?abstract),"en") && regex(lcase(str(?name)), "^';
      
    this.reqBand_end = '$"))} ORDER BY ASC(?name) LIMIT 10';


    


  }
  componentDidMount(){
    this.setState({nom: this.props.params.nom}); 
    this.rechercher(this.props.params.nom);      
    this.findAlbums(this.props.params.nom);
  }

  rechercher(nom){
    var request = this.prefixRq + this.reqBand_beg + nom.toLowerCase() + this.reqBand_end; 
    console.log("print out " + request);
    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(request) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    var response  = []; 
    var that = this; 
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log("readyState : " + this.readyState + ", status: " + this.status);     
        console.log("response lenght " + JSON.parse(this.responseText).results.bindings.length);
        response = JSON.parse(this.responseText).results.bindings; 
        that.setState({filteredResponse: response}); 
      }
      
    };
    console.log("response length post traitement: " + response.length);
    if(response.length != 0 ) {
      this.setState({filteredResponse: response}); 
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  } 

  findAlbums(bandName){
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
      FILTER(regex(lcase(str(?artist)),"'+bandName.toLowerCase()+'"))\
      }\
 ';
      var request = this.prefixRq + reqAlbum ; 
      console.log("request for albums:  " + reqAlbum);
      var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(request) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    var response  = []; 
    var that = this; 
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log("readyState : " + this.readyState + ", status: " + this.status);     
        console.log("response lenght " + JSON.parse(this.responseText).results.bindings.length);
        response = JSON.parse(this.responseText).results.bindings; 
        that.setState({filteredAlbumResponse: response}); 
      }
      
    };
    console.log("response length post traitement: " + response.length);
    if(response.length != 0 ) {
      this.setState({filteredAlbumResponse: response}); 
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }
  replaceLinkToName(link){
    return link.replace("http://dbpedia.org/resource/", ""); 
  }
  render() {
  return (
    <div id="groupPage">
      <Header titre={"Group: " + this.state.nom} />
      {this.state.filteredResponse.length != 0 
      &&(
        <div id="groupPageContent">
          <div id="image"><Photo nom={this.props.params.nom} fromPage={window.location.pathname}/></div>
          <div id="nomGroupe"><p>{this.state.nom}</p></div>
              <div id="dateGroup">
              <h3>Date création: </h3>
              <p>
                {this.state.filteredResponse[0].year.value}
              </p>
            </div>
            <div id="origineGroup">
              <h3>Origine: </h3>
                {this.state.filteredResponse[0].origin.value.replace("http://dbpedia.org/resource/", "")}
            </div>

          <div id="descriptionGroup">
            <h3>Description Group</h3>
            
              <p>{this.state.filteredResponse[0].abstract.value}</p>
            
          </div>

          <div id="membresGroup">
           <h3>Members</h3>
           <ul>
            <h4>current Members:</h4>
            {this.state.filteredResponse[0].members.value.split(';').map((member, index) => {
             return(
              <div>
              {  member.includes("*") &&  member.split("*").map((etoileMember, etoileIndex) => {
                    console.log("splitted - index:" + etoileIndex + " => "  + etoileMember); 
                    etoileMember.replace("http://dbpedia.org/resource/", ""); 
                    if(etoileMember !== " " && etoileMember !== "" )
                      return(    
                        <a key = {etoileIndex} className= "link"href= {"/person/" + etoileMember}><p>{etoileMember}</p></a>            
                      )     
                  })
              }
              {! member.includes("*") && 
                <a key = {index} className= "link"href= {"/person/" + member.replace("http://dbpedia.org/resource/", "")}><p>{member.replace("http://dbpedia.org/resource/", "")}</p></a>            
              }
                </div>
             ); 
            })}
            </ul>
            <ul>
              {this.state.filteredResponse[0].oldmembers.value != null &&
                <h4> old member: </h4>
              }
              {this.state.filteredResponse[0].oldmembers.value.split(";").map((member, index) => {
                             return(
                              <div>
                              { member.includes("*") &&  member.split("*").map((etoileMember, etoileIndex) => {
                                    console.log("splitted - index:" + etoileIndex + " => "  + etoileMember); 
                                    if(etoileMember !== " " && etoileMember !== "" )
                                      return(                
                                        <a key = {etoileIndex} className= "link"href= {"/person/" + etoileMember.replace("http://dbpedia.org/resource/", "")}><p>{etoileMember.replace("http://dbpedia.org/resource/", "")}</p></a>            
                                      )     
                                  })
                              }
                              {! member.includes("*") && 
                                <a key = {index} className= "link"href= {"/person/" + member.replace("http://dbpedia.org/resource/", "")}><p>{member.replace("http://dbpedia.org/resource/", "")}</p></a>            
                              }
                                </div>
                             );
              })}
            </ul>
          </div>
          <div id="styleGroup">
            <h3>Style(s)</h3>    
            {this.state.filteredResponse[0].genre.value.split(';').map((style, index) => {
              return(                
                <p key={index}>
                {style}
                </p>
              ); 
            })}     
          </div>
          <div id="singlesGroup">
            <h3 id="singlesAlbumTitle">Singles</h3>
            <ul id="singlesAlbumList">
              {this.state.filteredAlbumResponse.map((item)=> {
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
                  <div>
                      {titles.map((title)=> {
                        return (
                          <li id="singlesAlbumItem">{title}</li>
                        )
                      })}
                      {titlesLink.map((title)=> {
                        var linkSingle = "/single/"+ this.props.params.nom +"/"+ item.name.value+"/"+title;
                        return (
                          <Link to={linkSingle}>
                            <li className="li"id="singlesAlbumItemLinked">{title}</li>
                          </Link>
                        )
                      })}
                  </div>
                )
              } else {
                return (
                    <p id="singlesAlbum">No singles</p>
                )
              }
            })}
          </ul>
            </div>
          <div id="labelGroup">
            <h3>Label</h3>

              {this.state.filteredResponse[0].label.value.split(';').map((item, index) => {
                return(
                  
                  <p key={index}>{item.replace("http://dbpedia.org/resource/", "")}</p>
                );
              })}

          </div>
          <div id="albumsGroup">
            <h3>Album</h3>
              <div>
          {this.state.filteredAlbumResponse.map((item, index) => {
            return(
            <a key = {index} className= "link"href= {"/album/" + this.props.params.nom + "/" + item.name.value}><p>{item.name.value}</p></a>

            ); 
          })}
            </div>
          </div>
      </div> 
      )
      }
    </div>
  );
 }
}

export default (props) => (
  <GroupPage
      {...props}
      params={useParams()}
/>)