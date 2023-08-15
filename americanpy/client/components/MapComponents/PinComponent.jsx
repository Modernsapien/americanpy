import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import axios from "axios";
import ecoData from "../../data/ecoData.json";
import { v4 as uuidv4 } from 'uuid';


const PinComponent = ({
  map,
  isAddingPin,
  isHoveringButton,
  setMarkers,
  setMarkerIds,
  setSelectedPin,
  isAddingButton,
  setIsAddingButton,
}) => {
  const buttonRef = useRef(null);
  const [markers, setMarkersState] = useState([]);
  const [markerCount, setMarkerCount] = useState(0);
  const markerRef = useRef({});

  useEffect(() => {
    setMarkersState([]);

    if (map) {
      const handleMapClick = async (event) => {
        if (isAddingPin && !isHoveringButton && !isAddingButton) {
          const { lat, lng } = event.latlng;
          const markerId = uuidv4(); 
      
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
                <button class="btn btn-danger" id="${markerId}">Remove Pin</button>
              `;
              marker.getPopup().setContent(newPopupContent);

              marker.options.description = countryDescription;

              setSelectedPin(marker);
            }

            setMarkersState((prevMarkers) => [...prevMarkers, marker]);
            markerRef.current[markerId] = marker;
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
  }, [
    map,
    isAddingPin,
    isHoveringButton,
    setMarkerIds,
    setSelectedPin,
    isAddingButton,
  ]);

  const handleButtonClick = () => {
    setIsAddingButton((prevState) => !prevState);
    setIsAddingPlaceToVisit(false);
  };

  const handleRemovePinClick = (markerId) => {
    const updatedMarkers = markers.filter(
      (marker) => marker.options.id !== markerId
    );

    setMarkersState(updatedMarkers);
    setMarkers((prevMarkers) =>
      prevMarkers.filter((marker) => marker.options.id !== markerId)
    );

    // Remove the marker from the map using Leaflet's API
    const markerToRemove = markerRef.current[markerId];
    if (markerToRemove) {
      map.removeLayer(markerToRemove);
      delete markerRef.current[markerId];
    }
  };

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.addEventListener("mouseenter", () => {
        setIsHoveringButton(true);
      });

      buttonRef.current.addEventListener("mouseleave", () => {
        setIsHoveringButton(false);
      });
    }
  }, []);

  return (
    <div>
      {markers.map((marker) => (
        <div key={marker.options.id}>
          <button
            className="btn btn-danger"
            onClick={() => handleRemovePinClick(marker.options.id)}
            id={`remove-pin-button-${marker.options.id}`}
          >
            Remove Pin
          </button>
        </div>
      ))}
      <button
        ref={buttonRef}
        className={`btn ${isAddingButton ? "btn-danger" : "btn-primary"}`}
        onClick={handleButtonClick}
        id={`add-pin-button-${markers.length}`}
      >
        {isAddingButton ? "Cancel Adding" : "Add Pin"}
      </button>
    </div>
  );
};

export default PinComponent;
