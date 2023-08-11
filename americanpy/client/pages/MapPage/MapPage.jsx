import React from "react";
import Map from "../../components/MapComponents/Map";
import "./MapPage.css";

const MapPage = () => {
  const mapId = "map-container";

  return (
    <>
      <div id="map-container">
        <Map id={mapId} />
      </div>
    </>
  );
};

export default MapPage;
