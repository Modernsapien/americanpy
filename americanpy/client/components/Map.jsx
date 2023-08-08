import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import { GeoSearchControl, EsriProvider } from "leaflet-geosearch";
import ".././pages/HomePage/homepage.css";

const Map = ({ id }) => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [isAddingPin, setIsAddingPin] = useState(false);
  const clickListenerRef = useRef(null);

  const handleMapClick = (event) => {
    if (isAddingPin) {
      const { lat, lng } = event.latlng;
      const markerId = generateMarkerId();
      const marker = L.marker([lat, lng], { id: markerId }).addTo(map);
      setMarkers((prevMarkers) => [...prevMarkers, marker]);
      console.log(
        `Added pin with ID: ${markerId}, Longitude: ${lng}, Latitude: ${lat}`
      );
    }
  };

  const generateMarkerId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  };

  const togglePinPlacement = () => {
    setIsAddingPin((prevState) => !prevState);
  };

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

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        mapInstance
      );

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
      if (isAddingPin) {
        const listener = map.on("click", handleMapClick);
        clickListenerRef.current = listener;
      } else {
        const listener = clickListenerRef.current;
        if (listener) {
          listener.off("click", handleMapClick);
        }
      }
    }
  }, [map, isAddingPin]);

  return (
    <div onClick={(event) => event.stopPropagation()} className="add-pin-button">
      <div id={id} style={{ height: "400px", width: "100%" }}></div>
      <button onClick={togglePinPlacement} id="cancel-pin-button">
        {isAddingPin ? "Cancel Adding Pin" : "Add Pin"}
      </button>
    </div>
  );
};

export default Map;
