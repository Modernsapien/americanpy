import React, { useEffect, useState } from "react";
import L from "leaflet";
import { GeoSearchControl, EsriProvider } from "leaflet-geosearch";
import customGeoJSON from "../data/custom.geo.json"; 

const Map = ({ id }) => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [isAddingPin, setIsAddingPin] = useState(false);
  const [isHoveringButton, setIsHoveringButton] = useState(false);

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
        zIndex: 0, // Ensure the tile layer is below the GeoJSON borders
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
        } else {
          console.log("Not adding pin because isAddingPin is false or hovering button");
        }
      };

      map.on("click", handleMapClick);

      return () => {
        map.off("click", handleMapClick);
      };
    }
  }, [map, isAddingPin, isHoveringButton]);

  const togglePinPlacement = () => {
    setIsAddingPin((prevState) => !prevState);
  };

  const handleButtonMouseEnter = () => {
    setIsHoveringButton(true);
  };

  const handleButtonMouseLeave = () => {
    setIsHoveringButton(false);
  };

  useEffect(() => {
    if (map) {
      // Create a GeoJSON layer for the custom borders
      const bordersLayer = L.geoJSON(customGeoJSON, {
        style: {
          color: "blue", // Adjust the border color
          weight: 0.5,
          fillOpacity: 0,
        },
      }).addTo(map);

      return () => {
        bordersLayer.remove(); // Remove the borders layer when component unmounts
      };
    }
  }, [map]);

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
    </div>
  );
};

export default Map;
