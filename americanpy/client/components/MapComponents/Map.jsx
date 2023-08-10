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
  const [markerPositions, setMarkerPositions] = useState([]);
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

  const removeSelectedPin = (markerId) => {
    const markerIndex = markers.findIndex((marker) => marker.options.id === markerId);

    if (markerIndex !== -1) {
      const markerToRemove = markers[markerIndex];
      const popup = markerToRemove.getPopup();
      if (popup) {
        popup.remove();
      }

      map.removeLayer(markerToRemove);

      setMarkers((prevMarkers) => prevMarkers.filter((_, index) => index !== markerIndex));
      setMarkerPositions((prevPositions) =>
        prevPositions.filter((_, index) => index !== markerIndex)
      );

      setSelectedPin(null);
      console.log("Pin removed successfully.");
    } else {
      console.log("Marker not found with ID:", markerId);
    }
  };
  
  
  
  

  useEffect(() => {
    if (map) {
      markers.forEach((marker) => {
        const markerId = marker.options.id;
        const removeButton = document.getElementById(`remove-pin-button-${markerId}`);
        if (removeButton) {
          const removeHandler = () => {
            removeSelectedPin(markerId);
          };
          removeButton.addEventListener("click", removeHandler);
          marker.options.removeHandler = removeHandler; 
        }
      });
      return () => {
        markers.forEach(marker => {
          const markerId = marker.options.id;
          const removeButton = document.getElementById(`remove-pin-button-${markerId}`);
          if (removeButton) {
            const removeHandler = marker.options.removeHandler;
            if (removeHandler) {
              removeButton.removeEventListener("click", removeHandler);
            }
          }
        });
      };
    }
  }, [map, markers]);
  

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
                weight: 1,
                fillColor: fillColor,
                fillOpacity: 0.7,
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
            
              const popupContent = marker.getPopup().getContent();
              const newPopupContent = `
                ${popupContent}
                <button class="btn btn-danger" id="remove-pin-button-${marker.options.id}">Remove Pin</button>
              `;
              marker.getPopup().setContent(newPopupContent);

              const removeButton = document.getElementById(`remove-pin-button-${marker.options.id}`);
              if (removeButton) {
                removeButton.addEventListener("click", () => {
                  removeSelectedPin(markerId);
                });
              }

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
      return "navy"; 
    } else if (epiScore <= 50) {
      return "#428BCA"; 
    } else {
      return "#66B3FF"; 
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
  
  const handleMarkerClick = (marker) => {
    setSelectedPin(marker);
  };
  const handleRemoveButtonClick = () => {
    if (selectedPin) {
      removeSelectedPin(selectedPin.options.id);
      handleCloseModal();
    }
  };
  

  const handleCloseModal = () => {
    if (selectedPin) {
      const removeButton = document.getElementById(`remove-pin-button-${selectedPin.options.id}`);
      if (removeButton) {
        removeButton.removeEventListener("click", handleRemoveButtonClick);
      }
    }
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
        <div className="destination-form"></div>
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
            <button className="btn btn-danger" onClick={() => removeSelectedPin(selectedPin.options.id)}>
              Remove Pin
            </button>
          </div>
        </div>
      )}
      <div className="key">
        <div className="key-item">
          <div
            className="key-color"
            style={{ backgroundColor: getColorBasedOnEpiScore(30) }}
          ></div>
          <div className="key-text">Low</div>
        </div>
        <div className="key-item">
          <div
            className="key-color"
            style={{ backgroundColor: getColorBasedOnEpiScore(40) }}
          ></div>
          <div className="key-text">Medium</div>
        </div>
        <div className="key-item">
          <div
            className="key-color"
            style={{ backgroundColor: getColorBasedOnEpiScore(60) }}
          ></div>
          <div className="key-text">High</div>
        </div>
      </div>
    </div>
  );
  
};

export default Map;
