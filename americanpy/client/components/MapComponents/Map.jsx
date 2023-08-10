import React, { useEffect, useState } from "react";
import L from "leaflet";
import { GeoSearchControl, EsriProvider } from "leaflet-geosearch";
import customGeoJSON from "../../data/custom.geo.json";
import ecoData from "../../data/ecoData.json";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Map = ({ id }) => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [isAddingPin, setIsAddingPin] = useState(false);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [colorByEpiScore, setColorByEpiScore] = useState(false);
  const [bordersLayer, setBordersLayer] = useState(null);
  const [startDestination, setStartDestination] = useState("");
  const [endDestination, setEndDestination] = useState("");
  const [routeLayer, setRouteLayer] = useState(null);
  const [selectedPin, setSelectedPin] = useState(null);
  
  

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

        setBordersLayer(newBordersLayer);
      } else if (bordersLayer) {
        map.removeLayer(bordersLayer);
        setBordersLayer(null);
      }
    }
  }, [map, colorByEpiScore]);

  useEffect(() => {
    if (map) {
      if (routeLayer) {
        map.removeLayer(routeLayer);
      }

      if (startDestination && endDestination) {
        const startMarker = L.marker([
          startDestination.lat,
          startDestination.lng,
        ]).addTo(map);
        const endMarker = L.marker([
          endDestination.lat,
          endDestination.lng,
        ]).addTo(map);

        const routeLine = L.polyline([
          [startDestination.lat, startDestination.lng],
          [endDestination.lat, endDestination.lng],
        ]).addTo(map);

        setRouteLayer(routeLine);
      }
    }
  }, [map, startDestination, endDestination]);

  useEffect(() => {
    if (map) {
      const handleMapClick = async (event) => {
        if (isAddingPin && !isHoveringButton) {
          const { lat, lng } = event.latlng;
          const markerId =
            Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
          const marker = L.marker([lat, lng], { id: markerId }).addTo(map);

          try {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
            );

            const countryName = response.data.address.country;
            const countryData = ecoData.find(
              (data) => data.country === countryName
            );

            if (countryData) {
              const countryDescription = countryData.description;
              marker
                .bindPopup(`<b>${countryName}</b><br>${countryDescription}`)
                .openPopup();

              marker.options.description = countryDescription;

              setSelectedPin(marker);
            }

            setMarkers((prevMarkers) => [...prevMarkers, marker]);
            console.log(
              `Added pin with ID: ${markerId}, Longitude: ${lng}, Latitude: ${lat}`
            );
          } catch (error) {
            console.error("Error retrieving country information:", error);
          }
        }
      };

      map.on("click", handleMapClick);

      return () => {
        map.off("click", handleMapClick);
      };
    }
  }, [map, isAddingPin, isHoveringButton]);

  function getColorBasedOnEpiScore(epiScore) {
    if (epiScore <= 30) {
      return "red";
    } else if (epiScore <= 50) {
      return "orange";
    } else {
      return "green";
    }
  }

  const handleRouteSubmit = () => {
    if (startDestination && endDestination) {
      const startLatLng = { lat: parseFloat(startDestination.lat), lng: parseFloat(startDestination.lng) };
      const endLatLng = { lat: parseFloat(endDestination.lat), lng: parseFloat(endDestination.lng) };
  
      if (routeLayer) {
        map.removeLayer(routeLayer);
      }
  
      const startMarker = L.marker(startLatLng).addTo(map);
      const endMarker = L.marker(endLatLng).addTo(map);
  
      const routeLine = L.polyline([startLatLng, endLatLng], { color: 'purple' }).addTo(map);
  
      setRouteLayer(routeLine);
    }
  };
  

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
  const handleMarkerClick = (marker) => {
    setSelectedPin(marker);
  };

  const handleCloseModal = () => {
    setSelectedPin(null);
  };

  useEffect(() => {
    if (map) {
      markers.forEach((marker) => {
        marker.on("click", () => handleMarkerClick(marker));
      });
    }
  }, [map, markers]);

  return (
    <div className="map-container">
      <div className="top-bar">
        <div className="map-buttons">
          <button
            className="btn btn-primary"
            onClick={togglePinPlacement}
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
            id="cancel-pin-button"
          >
            {isAddingPin ? "Cancel Adding Pin" : "Add Pin"}
          </button>
          <button
            className="btn btn-success"
            onClick={toggleColorByEpiScore}
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
            id="toggle-color-button"
          >
            {colorByEpiScore ? "Hide Eco colour" : "Show Eco colour"}
          </button>
        </div>
        <div className="destination-form">
  <div className="input-group">
    <input
      type="text"
      className="form-control"
      id="start-destination-input"
      placeholder="Start Destination"
      value={startDestination}
      onChange={(e) => setStartDestination(e.target.value)}
    />
    <input
      type="text"
      className="form-control"
      placeholder="End Destination"
      id="end-destination-input"
      value={endDestination}
      onChange={(e) => setEndDestination(e.target.value)}
    />
    <button className="btn btn-primary" type="button" onClick={handleRouteSubmit}>
      Submit
    </button>
  </div>
</div>
      </div>
      <div className="map" style={{ height: "400px", width: "100%" }}>
        <div id={id}></div>
      </div>
      {selectedPin && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={handleCloseModal}>
              Close
            </button>
            <h3>{selectedPin.getLatLng().toString()}</h3>
            <p>{selectedPin.options.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
