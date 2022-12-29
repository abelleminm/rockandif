import React, { useEffect, useState } from "react";

function Photo({ nom }) {
  const [imgURL, setImgURL] = useState([]);
  const [wikiURL, setWikiURL] = useState([]);

  useEffect(() => {
    sendRequest(nom).then(res => { 
      getPhoto(res).then(img => {
        setImgURL(img);
      })
    })
  }, []); 

  console.log("finally:"+imgURL);

  return (
    <img src={imgURL}/>
  );
}

async function sendRequest (nom) {
  // Encodage de l'URL à transmettre à DBPedia
  const request_content = defineRequest(nom);
  var url_base = "http://dbpedia.org/sparql";
  var url =
    url_base +
    "?query=" +
    encodeURIComponent(request_content) +
    "&format=json";
  
  const response = await fetch(url).then(res => res.json())
  console.log("response:" + response.results.bindings[0].url.value);
  return response.results.bindings[0].url.value;
}

async function getPhoto (wiki) {
  let wikiName = wiki.toString().substring("http://en.wikipedia.org/wiki/".length);
  console.log("wikiname: " + wikiName);
  var wikiReqDeb = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&pithumbsize=300&prop=pageimages&titles=";
  var req = wikiReqDeb + wikiName;
  console.log(req);

  const response = await fetch(req).then(res => res.json());
  console.log("response:" + JSON.stringify(response));
  const str = JSON.stringify(response);
  const regex = /"source":"(.*)",/g;
  const src = regex.exec(str);
  const finalSrc = src[1];
  console.log("src:"+src);
  console.log("finalSrc:"+finalSrc);

  return finalSrc;
};

const defineRequest = (nom) => {
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

  let reqBand_arg1 =
    'SELECT ?url WHERE {\
    ?p a dbo:Band; dbp:name ?name.\
    ?p foaf:isPrimaryTopicOf ?url.\
    FILTER(regex(?name, "';
  let reqBand_arg2 = '$") && regex(?name, "^';
  let reqBand_end = '")) }';
  
  let request = prefixRq + reqBand_arg1 + nom + reqBand_arg2 + nom + reqBand_end;
  return request;
};

export default Photo;
