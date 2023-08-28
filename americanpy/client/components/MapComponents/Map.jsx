import React, { useEffect, useState } from "react";
import L from "leaflet";
import { GeoSearchControl, EsriProvider } from "leaflet-geosearch";
import customGeoJSON from "../../data/custom.geo.json";
import ecoData from "../../data/ecoData.json";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import PlaceToVisitButton from "./PlaceToVisitButton";
import PinComponent from "./PinComponent";

const Map = ({ id }) => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [isAddingPin, setIsAddingPin] = useState(false);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [colorByEpiScore, setColorByEpiScore] = useState(false);
  const [bordersLayer, setBordersLayer] = useState(null);
  const removePinButtonId = `remove-pin-button-${id}`;
  const [markerIds, setMarkerIds] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);
  const [mapClickEnabled, setMapClickEnabled] = useState(true);
  const [markerCount, setMarkerCount] = useState(1)

  // function to remove a marker
  const removeMarker = (marker) => {
    console.log("here")
    const markerToRemove = markers.find((el) => {
        el == marker
        console.log(marker)
      });

    if (markerToRemove) {
      if (selectedPin === markerToRemove) {
        setSelectedPin(null);
      }

      markerToRemove.closePopup();
      map.removeLayer(markerToRemove);
      setMarkers((prevMarkers) =>
        prevMarkers.filter((marker) => marker.options.id !== markerId)
      );
      setMarkerIds((prevMarkerIds) =>
        prevMarkerIds.filter((id) => id !== markerId)
      );
      console.log("Pin removed successfully.");
    } else {
      console.log("Marker not found with ID:", markerId);
    }
  };

  // Event handlers
  const handleMarkerClick = (marker) => {
    setSelectedPin(marker);
  };

  const handleButtonMouseEnter = () => {
    setIsHoveringButton(true);
  };

  const handleButtonMouseLeave = () => {
    setIsHoveringButton(false);
  };

  const handleRemoveButtonClick = () => {
    console.log("here")
    if (selectedPin) {
      const markerId = selectedPin.options.id;
      setSelectedPin(null);
      setTimeout(() => {
        removeMarker(markerId);
        setMarkers((prevMarkers) =>
          prevMarkers.filter((marker) => marker.options.id !== markerId)
        );
        setMarkerIds((prevMarkerIds) =>
          prevMarkerIds.filter((id) => id !== markerId)
        );
      }, 0);
    }
  };

  const handleCloseModal = () => {
    setSelectedPin(null);
  };

  // Map setup

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
        language: "en",
      }).setView([51.496840937752935, -0.13539235784566644], 2.5);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        zIndex: 0,
      }).addTo(mapInstance);

      const provider = new EsriProvider({
        language: "en",
      });

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

  // Marker event listeners
  useEffect(() => {
    if (map) {
      markers.forEach((marker) => {
        marker.on("click", () => handleMarkerClick(marker));
      });
    }
  }, [map, markers]);

  // Add/remove marker button event listeners
  useEffect(() => {
    if (map) {
      markers.forEach((marker) => {
        const removeButtonId = `remove-pin-button-${marker.options.id}`;
        const removeButton = document.getElementById(removeButtonId);
        console.log(removeButton)

        if (removeButton) {
          if (!marker.options.removeHandler) {
            marker.options.removeHandler = () => {
              removeMarker(marker.options.id);
            };

            removeButton.addEventListener(
              "click",
              marker.options.removeHandler
            );
          }
        }
      });

      return () => {
        markers.forEach((marker) => {
          const removeButtonId = `remove-pin-button-${marker.options.id}`;
          const removeButton = document.getElementById(removeButtonId);

          if (removeButton && marker.options.removeHandler) {
            removeButton.removeEventListener(
              "click",
              marker.options.removeHandler
            );
          }
        });
      };
    }
  }, [map, markers]);

  // Handle color by epi score
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

  // Utility function to get color based on epi score
  function getColorBasedOnEpiScore(epiScore) {
    if (epiScore <= 30) {
      return "#1E8449"; // Dark Green
    } else if (epiScore <= 50) {
      return "#2ECC71"; // Medium Green
    } else {
      return "#82E0AA"; // Light Green
    }
  }
  // Toggle pin placement
  const togglePinPlacement = () => {
    setIsAddingPin((prevState) => !prevState);
    setMapClickEnabled(!isAddingPin); // Toggle the map click event
  };

  // Toggle color by epi score
  const toggleColorByEpiScore = () => {
    setColorByEpiScore((prevState) => !prevState);
  };

  return (
    <div className="map-container" data-testid="map_container">
      <div className="top-bar">
        <div className="map-buttons" data-testid="map_buttons">
          <PlaceToVisitButton
            isAddingPlaceToVisit={isAddingPin} // Use isAddingPin instead of isAddingPlaceToVisit
            setIsAddingPlaceToVisit={setIsAddingPin} // Use setIsAddingPin instead of setIsAddingPlaceToVisit
            map={map}
          />

          <button
            className="btn btn-primary"
            onClick={togglePinPlacement}
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
            id="cancel-pin-button"
            data-testid="pin_button"
          >
            {isAddingPin ? "Cancel Places to visit" : "Places to visit"}
          </button>
          <button
            className="btn btn-success"
            onClick={toggleColorByEpiScore}
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
            id="toggle-color-button"
            data-testid="eco_button"
          >
            {colorByEpiScore ? "Hide Eco colour" : "Show Eco colour"}
          </button>
        </div>
        <div className="destination-form"></div>
      </div>
      <div className="map" style={{ height: "400px", width: "100%" }} data-testid="actual_map">
        <div id={id}></div>
      </div>
      <PinComponent
        map={map}
        isAddingPin={isAddingPin}
        isHoveringButton={isHoveringButton}
        removeMarker={removeMarker}
        markers={markers}
        setMarkers={setMarkers}
        setMarkerIds={setMarkerIds}
        setSelectedPin={setSelectedPin}
        removePinButtonId={removePinButtonId}
        markerCount = {markerCount}
        setMarkerCount={setMarkerCount}
      />
      {selectedPin && (
        <div className="modal-overlay">
          <div className="modal">
            {/* <button className="close-button" onClick={handleCloseModal}>
              Close
            </button>
            <h3>{selectedPin.getLatLng().toString()}</h3>
            <p>{selectedPin.options.description}</p>
            <button
              className="btn btn-danger"
              id={removePinButtonId}
              onClick={handleRemoveButtonClick}
            >
              Remove Pin
            </button> */}
          </div>
        </div>
      )}
      <div className="key">
        <p className="keytitle">Eco-Friendliness key</p>
        <div className="key-item">
          <div className="key-color navy"></div>
          <span className="key-text">
            Very Eco-Friendly
          </span>
        </div>
        <div className="key-item">
          <div className="key-color blue"></div>
          <span className="key-text">
          Mid Eco-Friendly
          </span>
        </div>
        <div className="key-item">
          <div className="key-color light-blue"></div>
          <span className="key-text">
          Low Eco-Friendly
          </span>
        </div>
      </div>
    </div>
  );
};

export default Map;
