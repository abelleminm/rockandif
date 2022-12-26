import React, {useEffect, useState} from 'react';
import Header from '../Components/Header';
import './SinglePage.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function SinglePage() {
  const [filteredResponse, setFilteredResponse] = useState([]);
  const {band, album, title} = useParams();
  var linkAlbum = "/album/" + band + "/" + album;
  var linkBand = "/group/" + band;
  var titrePage = "Single : "+title;
  return (
    <div id="singlePage">
      <Header titre={titrePage} />
      <div id="singlePageContent">
        <div id="coverSingle"/>
        <text id="nomSingle">{title}</text>
        <Link to={linkAlbum} id="nomAlbumSingle">{album}</Link>
        <Link to={linkBand} id="groupeSingle">{band}</Link>
        <text id="dateSingle">Date</text>
        <text id="descriptionSingle">Description</text>
        <text id="styleSingle">Style</text>
        <text id="writersSingle">Writers</text>
        <text id="awardSingle">Award</text>
        <text id="labelSingle">Label</text>
      </div>
    </div>
  );
}

export default SinglePage;