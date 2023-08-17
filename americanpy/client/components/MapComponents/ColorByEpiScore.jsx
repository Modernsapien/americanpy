// ColorByEpiScore.jsx
import React, { useEffect } from "react";
import L from "leaflet";
import customGeoJSON from "../../data/custom.geo.json";
import ecoData from "../../data/ecoData.json";
import { getColorBasedOnEpiScore } from "./Map"; 

const ColorByEpiScore = ({ map, colorByEpiScore }) => {
  useEffect(() => {
    const handleColorByEpiScore = () => {
      if (colorByEpiScore) {
        const newBordersLayer = L.geoJSON(customGeoJSON, {
          style: (feature) => {
            const countryName = feature.properties.name;
            const countryData = ecoData.find(
              (data) => data.country === countryName
            );
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
      }
    };

    
    handleColorByEpiScore();
    console.log(    newBordersLayer   )›
    return () => {
      if (colorByEpiScore) {
        map.removeLayer(newBordersLayer);
      }
    };
  }, [map, colorByEpiScore]);

  return null;

};

export default ColorByEpiScore;
