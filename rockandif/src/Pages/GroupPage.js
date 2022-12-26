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

    let reqBand_beg = 'SELECT DISTINCT ?g ?name ?abstract ?year ?origin  \
    (GROUP_CONCAT(DISTINCT ?genreName; separator=" ; ") AS ?genre) (GROUP_CONCAT(DISTINCT ?nameMember; separator=" ; ") AS ?members)  WHERE {\
      ?g a dbo:Band; dbo:genre ?genre.\
      ?genre foaf:name ?genreName.\
      ?g foaf:name ?name.\
      ?g dbo:abstract ?abstract. \
      ?g dbo:activeYearsStartYear ?year. \
      ?g dbp:origin ?origin \
      OPTIONAL { ?g dbo:bandMember|dbo:formerBandMember ?p. } \
      OPTIONAL { ?p dbp:name ?nameMember. } \
      FILTER(langMatches(lang(?name),"en") && regex(?genre, "[Rr]ock") \
      && langMatches(lang(?abstract),"en") && regex(lcase(str(?name)), "^';
      
    let reqBand_end = '$"))} ORDER BY ASC(?name) LIMIT 10';

    
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
              <div id="dateGroup">
              <h3>Date création - Date fin</h3>
              <p>
                {this.state.filteredResponse[0].year.value}
              </p>
            </div>
          
          {this.state.filteredResponse.map(item => {
            return(
              <div id="origineGroup">
                {this.state.filteredResponse[0].origin.value}
            </div>
            ); 
          })}
          <div id="descriptionGroup">
            <h3>Description Group</h3>
            <p>
              {this.state.filteredResponse[0].abstract.value}
            </p>
          </div>

          <div id="membresGroup">
           <h3>Members</h3>
            {this.state.filteredResponse[0].members.value.split(';').map(member => {
              return(                
                <p>
                {member}
                </p>
              ); 
            })}
          </div>
          <div id="styleGroup">
            <h3>Style(s)</h3>    
            {this.state.filteredResponse[0].genre.value.split(';').map(style => {
              return(                
                <p>
                {style}
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