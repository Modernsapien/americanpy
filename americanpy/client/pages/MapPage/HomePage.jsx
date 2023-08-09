import React from "react";
import Map from "../../components/MapComponents/Map";
import "./homepage.css";

const HomePage = () => {
  const mapId = "map-container";

  return (
    <>
      <div id="map-container">
        <Map id={mapId} />
      </div>
    </>
  );
};

export default HomePage;
