import React, { useEffect } from "react";
import L from "leaflet";
import customGeoJSON from "../../data/custom.geo.json";
import ecoData from "../../data/ecoData.json";

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

    return () => {
      if (colorByEpiScore) {
        map.removeLayer(newBordersLayer);
      }
    };
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

  return null;
};

export default ColorByEpiScore;
