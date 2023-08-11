import React, { useEffect, useState } from "react";
import L from "leaflet";
import { GeoSearchControl, EsriProvider } from "leaflet-geosearch";
import customGeoJSON from "../../data/custom.geo.json";
import ecoData from "../../data/ecoData.json";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import PlaceToVisitButton from "./PlaceToVisitButton";


const Map = ({ id }) => {
  // State variables
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [isAddingPin, setIsAddingPin] = useState(false);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [colorByEpiScore, setColorByEpiScore] = useState(false);
  const [bordersLayer, setBordersLayer] = useState(null);
  const [selectedPin, setSelectedPin] = useState(null);
  const removePinButtonId = `remove-pin-button-${id}`;
  const [markerIds, setMarkerIds] = useState([]); 
  const [isAddingPlaceToVisit, setIsAddingPlaceToVisit] = useState(false);

  // function to remove a marker
  const removeMarker = (markerId) => {
    const markerToRemove = markers.find(
      (marker) => marker.options.id == markerId
    );

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

  // Handle pin placement and color by epi score
  useEffect(() => {
    if (map) {
      let markerCount = 1;

      const handleMapClick = async (event) => {
        if (isAddingPin && !isHoveringButton) {
          const { lat, lng } = event.latlng;
          const markerId = `marker-${markerCount}`; // Generate marker ID
          markerCount++; // Increment the marker count

          setMarkerIds((prevMarkerIds) => [...prevMarkerIds, markerId]);

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
                <button class="btn btn-danger" id="${removePinButtonId}">Remove Pin</button>
              `;
              marker.getPopup().setContent(newPopupContent);

              const removeButton = document.getElementById(removePinButtonId);
              if (removeButton) {
                removeButton.addEventListener("click", () => {
                  removeMarker(markerId); //
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
      return "navy";
    } else if (epiScore <= 50) {
      return "#428BCA";
    } else {
      return "#66B3FF";
    }
  }
  // Toggle pin placement
  const togglePinPlacement = () => {
    setIsAddingPin((prevState) => !prevState);
  };

  // Toggle color by epi score
  const toggleColorByEpiScore = () => {
    setColorByEpiScore((prevState) => !prevState);
  };
  // Toggle place to visit button
  const togglePlaceToVisit = () => {
    setIsAddingPlaceToVisit((prevState) => !prevState);
  };

  return (
    <div className="map-container">
      <div className="top-bar">
        <div className="map-buttons">
        <PlaceToVisitButton
            onToggleAddPin={togglePlaceToVisit} // Use the new togglePlaceToVisit function
            isAddingPin={isAddingPlaceToVisit}  // Use the isAddingPlaceToVisit state
            map={map} // Pass the map instance
          />
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
            <button
              className="btn btn-danger"
              id={removePinButtonId}
              onClick={handleRemoveButtonClick}
            >
              Remove Pin
            </button>
          </div>
        </div>
      )}``
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
