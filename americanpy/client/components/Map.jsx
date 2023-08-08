import React, { useEffect, useState } from "react";
import L from "leaflet";
import { GeoSearchControl, EsriProvider } from "leaflet-geosearch";
import customGeoJSON from "../data/custom.geo.json";
import ecoData from "../data/ecoData.json";

const Map = ({ id }) => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [isAddingPin, setIsAddingPin] = useState(false);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [colorByEpiScore, setColorByEpiScore] = useState(false);
  const [bordersLayer, setBordersLayer] = useState(null);

  useEffect(() => {
    const mapContainer = document.getElementById(id);
    if (!mapContainer) {
      console.error(`Map container with ID '${id}' not found.`);
      return;
    }

    if (!mapContainer._leaflet_id) {
      const mapInstance = L.map(id, {
        minZoom: 2,
        maxZoom: 18,
        maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)),
      }).setView([51.496840937752935, -0.13539235784566644], 2.5);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        zIndex: 0,
      }).addTo(mapInstance);

      const provider = new EsriProvider();
      const searchControl = new GeoSearchControl({
        provider,
        showPopup: false,
        popupFormat: ({ query, result }) => result.label,
        maxMarkers: 1,
        retainZoomLevel: false,
        animateZoom: true,
      });

      mapInstance.addControl(searchControl);
      setMap(mapInstance);

      return () => {
        mapInstance.remove();
      };
    }
  }, [id]);

  useEffect(() => {
    if (map) {
      const handleMapClick = (event) => {
        if (isAddingPin && !isHoveringButton) {
          const { lat, lng } = event.latlng;
          const markerId =
            Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
          const marker = L.marker([lat, lng], { id: markerId }).addTo(map);
          setMarkers((prevMarkers) => [...prevMarkers, marker]);
          console.log(
            `Added pin with ID: ${markerId}, Longitude: ${lng}, Latitude: ${lat}`
          );
        }
      };

      map.on("click", handleMapClick);

      return () => {
        map.off("click", handleMapClick);
      };
    }
  }, [map, isAddingPin, isHoveringButton]);

  useEffect(() => {
    if (map) {
      if (colorByEpiScore) {
        const newBordersLayer = L.geoJSON(customGeoJSON, {
          style: (feature) => {
            const countryName = feature.properties.name;
            const countryData = ecoData.find((data) => data.country === countryName);
            if (countryData) {
              const epiScore = countryData.epi_score;
              const fillColor = getColorBasedOnEpiScore(epiScore);
              return {
                color: "blue",
                weight: 0.5,
                fillColor: fillColor,
                fillOpacity: 0.5,
              };
            } else {
              return {
                color: "blue",
                weight: 0.5,
                fillOpacity: 0.2,
              };
            }
          },
        }).addTo(map);

        setBordersLayer(newBordersLayer);
      } else if (bordersLayer) {
        // Remove the borders layer if colorByEpiScore is disabled
        map.removeLayer(bordersLayer);
        setBordersLayer(null);
      }
    }
  }, [map, colorByEpiScore]);

  function getColorBasedOnEpiScore(epiScore) {
    if (epiScore <= 30) {
      return "red";
    } else if (epiScore <= 50) {
      return "orange";
    } else {
      return "green";
    }
  }

  const togglePinPlacement = () => {
    setIsAddingPin((prevState) => !prevState);
  };

  const handleButtonMouseEnter = () => {
    setIsHoveringButton(true);
  };

  const handleButtonMouseLeave = () => {
    setIsHoveringButton(false);
  };

  const toggleColorByEpiScore = () => {
    setColorByEpiScore((prevState) => !prevState);
  };

  return (
    <div
      onClick={(event) => event.stopPropagation()}
      className="add-pin-button"
    >
      <div id={id} style={{ height: "400px", width: "100%" }}></div>
      <button
        onClick={togglePinPlacement}
        onMouseEnter={handleButtonMouseEnter}
        onMouseLeave={handleButtonMouseLeave}
        id="cancel-pin-button"
      >
        {isAddingPin ? "Cancel Adding Pin" : "Add Pin"}
      </button>
      <button
        onClick={toggleColorByEpiScore}
        onMouseEnter={handleButtonMouseEnter}
        onMouseLeave={handleButtonMouseLeave}
        id="toggle-color-button"
      >
        {colorByEpiScore ? "Hide Eco colour" : "Show Eco colour"}
      </button>
    </div>
  );
};

export default Map;
