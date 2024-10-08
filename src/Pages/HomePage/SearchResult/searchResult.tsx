import React, { useEffect, useState } from "react";
import "./searchResult.css";
// import { propType } from "../../types";
import { searchContext } from "../../../Services/Context/searchResult";
import { search } from "../../../Services/Api/searchAPI";
import { useParams } from "react-router";
import { useContext } from "react";
import { SearchStateContext } from "../../../Services/Context/searchStateContext";


const SearchResult = () => {


    // useEffect(() => {
    //   console.log(searchState);
    // }, [searchState])

  return (
    <div className="searchResult">
      {/* <h1> {artistName}</h1>
      
      {error && <p>{error}</p>}
      <div className="albums">
        {albums.map(album => (
          <div key={album.id} className="album">
            <img src={album.images[0].url} alt={album.name} />
            <p>{album.name}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default SearchResult;
