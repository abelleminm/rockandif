import React, { useEffect, useState } from "react";

function Photo({ nom, fromPage }) {
  const [imgURL, setImgURL] = useState([]);
  const [err, setErr] = useState(0);

  let chooseReq;
  if(fromPage.toString().includes("person")) {
    chooseReq = 1; // on cherche une photo de quelqu'un = 1
  } else {
    chooseReq = 0; // pour un groupe (groupCard ou Group) = 0
  }

  useEffect(() => {
    sendRequest(nom, chooseReq).then(res => { 
      if(res === null) { // if no result was found = error
        setErr(1);
      } else {
        getPhoto(res).then(img => {
          if(img === null) { // if nothing found = error
            setErr(1);
          } else {
            setImgURL(img);
          }
        })
      }
    })
  }, []); 

  console.log("finally:"+imgURL);

  // error handling
  if(err) {
    return (
      <div id="photoErr"/>
    )
  } else {
    return (
      <img src={imgURL}/>
    );
  }
}

async function sendRequest (nom, choose) {
  // Encodage de l'URL à transmettre à DBPedia
  const request_content = defineRequest(nom, choose);
  var url_base = "http://dbpedia.org/sparql";
  var url =
    url_base +
    "?query=" +
    encodeURIComponent(request_content) +
    "&format=json";
  
  const response = await fetch(url).then(res => res.json())
  //console.log("response:" + response.results.bindings[0].url.value);
  if( response.length === 0 ) { // if nothing was found = error : we return null
    return null;
  } else {
    return response.results.bindings[0].url.value;
  }
}

async function getPhoto (wiki) {
  let wikiName = wiki.toString().substring("http://en.wikipedia.org/wiki/".length);
  //console.log("wikiname: " + wikiName);
  var wikiReqDeb = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&pithumbsize=300&prop=pageimages&titles=";
  var req = wikiReqDeb + wikiName;
  //console.log(req);

  const response = await fetch(req).then(res => res.json());
  //console.log("response:" + JSON.stringify(response));
  let finalSrc;
  if( response.length === 0 ) {
    finalSrc = null;
  } else {
    const str = JSON.stringify(response);
    const regex = /"source":"(.*)",/g;
    const src = regex.exec(str);
    finalSrc = src[1];
    console.log("src:"+src);
    console.log("finalSrc:"+finalSrc);
  }

  return finalSrc;
};

const defineRequest = (nom, choose) => {
  const prefixRq =
    "PREFIX owl: <http://www.w3.org/2002/07/owl#>\n " +
    "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n " +
    "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n " +
    "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n " +
    "PREFIX foaf: <http://xmlns.com/foaf/0.1/>\n " +
    "PREFIX dc: <http://purl.org/dc/elements/1.1/>\n " +
    "PREFIX : <http://dbpedia.org/resource/>\n " +
    "PREFIX dbpedia2: <http://dbpedia.org/property/>\n " +
    "PREFIX dbpedia: <http://dbpedia.org/>\n " +
    "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\n ";
  
  let req_arg1;
  let req_arg2;
  let req_end;
  if(choose === 1) { // photo d'une personne
    req_arg1 = 
      'SELECT ?url WHERE{\
      ?p a dbo:Artist; dbp:name ?name.\
      ?p foaf:isPrimaryTopicOf ?url.\
      FILTER(regex(?name, "';
    req_arg2 = '$") && regex(?name, "^';
    req_end = '")) }';
  } else { // photo d'un groupe
    req_arg1 =
    'SELECT ?url WHERE {\
    ?p a dbo:Band; dbp:name ?name.\
    ?p foaf:isPrimaryTopicOf ?url.\
    FILTER(regex(?name, "';
    req_arg2 = '$") && regex(?name, "^';
    req_end = '")) }';
  }
  
  let request = prefixRq + req_arg1 + nom + req_arg2 + nom + req_end;
  return request;
};

export default Photo;
