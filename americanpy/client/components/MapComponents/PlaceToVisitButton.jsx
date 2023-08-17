import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import L from "leaflet";
import { renderToString } from "react-dom/server";
import axios from "axios";
import ecoData from "../../data/ecoData.json";
import { v4 as uuidv4 } from 'uuid';

const PlaceToVisitButton = ({ map }) => {
  const [isAddingPlaceToVisit, setIsAddingPlaceToVisit] = useState(false);
  const [clickEventListener, setClickEventListener] = useState(null);
  const [isMouseOverButton, setIsMouseOverButton] = useState(false);
  const [markers, setMarkers] = useState([]);
  
  const markerRef = useRef({});

  useEffect(() => {
    const handleMapClick = async (event) => {
      if (isAddingPlaceToVisit && !isMouseOverButton) {
        const { lat, lng } = event.latlng;
        const markerId = uuidv4(); 

        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
          );

          const countryName = response.data.address.country;

          if (countryName) {
            // Check if the country is valid and not over oceans or seas
            const countryData = ecoData.find(
              (data) => data.country === countryName
            );

            if (countryData) {
              const customIcon = new L.DivIcon({
                className: "custom-icon",
                html: renderToString(
                  <FontAwesomeIcon
                    icon={faMapPin}
                    style={{ color: "#ff2600", fontSize: "30px" }}
                  />
                ),
                iconSize: [15, 32],
              });

              const marker = L.marker([lat, lng], {
                id: markerId,
                icon: customIcon,
              }).addTo(map);

              const popupContent = `
                <div>
                  <img src="your-image-url.jpg" alt="Place Image" style="max-width: 100%; height: auto;">
                  <p>Your short description goes here.</p>
                  <a href="/memories" class="popup-memory-button">Add Memory</a>
                </div>
              `;

              marker.bindPopup(popupContent).openPopup();

              markerRef.current[markerId] = marker;

              setMarkers((prevMarkers) => [...prevMarkers, marker]);
              console.log(
                `Added pin with ID: ${markerId}, Longitude: ${lng}, Latitude: ${lat}`
              );
            } else {
              console.log("Clicked over oceans or seas, not adding pin.");
            }
          } else {
            console.log("No country information available for clicked location.");
          }
        } catch (error) {
          console.error("Error retrieving country information:", error);
        }
      }
    };

    if (isAddingPlaceToVisit) {
      const clickListener = map.on("click", handleMapClick);
      setClickEventListener(clickListener);
    } else {
      if (clickEventListener) {
        clickEventListener.off();
      }
    }
  }, [isAddingPlaceToVisit, isMouseOverButton, map]);

  const handlePlaceToVisitClick = (event) => {
    event.stopPropagation();
    setIsAddingPlaceToVisit((prevState) => !prevState);
  };

  const handleMouseEnterButton = () => {
    setIsMouseOverButton(true);
  };

  const handleMouseLeaveButton = () => {
    setIsMouseOverButton(false);
  };

  return (
    <div className="map-button" data-testid="visit_button">
      <button
        className={`btn ${isAddingPlaceToVisit ? "btn-danger" : "btn-primary"}`}
        onClick={handlePlaceToVisitClick}
        onMouseEnter={handleMouseEnterButton}
        onMouseLeave={handleMouseLeaveButton}
        id="add-place-button"
      >
        {isAddingPlaceToVisit
          ? "Cancel Places I've Visited"
          : "Places I've Visited"}
      </button>
      {markers.map((marker) => (
        <div key={marker.options.id}>
          {/* Render your marker-specific components here */}
        </div>
      ))}
    </div>
  );
};

export default PlaceToVisitButton;
