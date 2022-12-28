import React, { useState } from 'react'
import Header from '../Components/Header';
import { useParams } from 'react-router-dom';
import './GroupPage.css';
class GroupPage extends React.Component {
  constructor(props){
    super(props); 
    this.state = {
      filteredResponse: [], 
      wordEntered: "", 
      request: "", 
      nom: ""
    }
  }
  componentDidMount(){
    this.setState({nom: this.props.params.nom}); 
    this.rechercher(this.props.params.nom);      
  }

  rechercher(nom){
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

    let reqBand_beg = 'SELECT DISTINCT ?g ?name ?abstract ?year ?origin (GROUP_CONCAT(DISTINCT ?genre; separator=" ; ") AS ?genre) WHERE {\
      ?g a dbo:Band; dbo:genre ?genre.\
      ?g foaf:name ?name.\
      ?g dbo:abstract ?abstract.\
      ?g dbo:activeYearsStartYear ?year.\
      ?g dbp:origin ?origin\
      FILTER(langMatches(lang(?name),"en") && regex(?genre, "[Rr]ock")\
      && langMatches(lang(?abstract),"en")) FILTER(lcase(str(?name)) = "'
    let reqBand_end = '")} ORDER BY ASC(?name)';

    
    var request = prefixRq + reqBand_beg + nom.toLowerCase() + reqBand_end; 
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
  getElementsFromRequest(response) {
    console.log("************ START getElementsFromRequest ***************"); 
    this.setState({filteredResponse: response});
      response.map(item  => {
        console.log("item name: " + item.name.value); 
      }); 
    console.log("************ END getElementsFromRequest ***************"); 
  }
  render() {
  return (
    <div id="groupPage">
      <Header titre={"Group: " + this.state.nom} />
      {this.state.filteredResponse.length != 0 && 
       this.state.filteredResponse.map((item) => {
        console.log("name:" +  item.name.value); 
      }) 
      &&(
        <div id="groupPageContent">
          <div id="photoGroup"/>
          <div id="nomGroupe">{this.state.nom}</div>
          <div id="dateGroup"></div>
          {this.state.filteredResponse.map(item => {
            return(
              <div id="dateGroup">
              <h3>Date création - Date fin</h3>
              <p>
                {item.year.value}
              </p>
            </div>
            ); 
          })}
          {this.state.filteredResponse.map(item => {
            return(
              <div id="origineGroup">
                {item.origin.value}
            </div>
            ); 
          })}
          {this.state.filteredResponse.map(item => {
            return(
              <div id="descriptionGroup">
              <h3>Description Group</h3>
              <p>
                {item.abstract.value}
              </p>
            </div>
            ); 
          })}
          <div id="membresGroup">Membres</div>
          <div id="styleGroup">
            <h3>Style</h3>
            {this.state.filteredResponse.map(item => {
            return(              
              <p>
                {item.genre.value}
              </p>
            ); 
          })}
          </div>
          
          <div id="singlesGroup">Singles</div>
          <div id="labelGroup">Label</div>
          <div id="albumsGroup">Albums</div>
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