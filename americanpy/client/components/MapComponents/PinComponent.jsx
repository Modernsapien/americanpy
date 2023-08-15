import React, { useEffect, useRef } from "react";
import L from "leaflet";
import axios from "axios";
import ecoData from "../../data/ecoData.json";

const PinComponent = ({
  map,
  isAddingPin,
  isHoveringButton,
  removeMarker,
  setMarkers,
  setMarkerIds,
  setSelectedPin,
  removePinButtonId,
  isAddingButton,
  setIsAddingButton,
}) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (map) {
      let markerCount = 1;

      // Event handler for clicking on the map
      const handleMapClick = async (event) => {
        if (isAddingPin && !isHoveringButton && !isAddingButton) {
          const { lat, lng } = event.latlng;
          const markerId = `marker-${markerCount}`;
          markerCount++;

          // Update the marker IDs
          setMarkerIds((prevMarkerIds) => [...prevMarkerIds, markerId]);

          // Create a new marker and add it to the map
          const marker = L.marker([lat, lng], { id: markerId }).addTo(map);

          try {
            // Retrieve country information based on coordinates
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
            );

            const countryName = response.data.address.country;

            // Find corresponding data for the country from ecoData
            const countryData = ecoData.find(
              (data) => data.country === countryName
            );

            if (countryData) {
              const countryDescription = countryData.description;

              // Bind a popup to the marker with country information
              marker
                .bindPopup(`<b>${countryName}</b><br>${countryDescription}`)
                .openPopup();

              // Add a "Remove Pin" button to the popup content
              const popupContent = marker.getPopup().getContent();
              const newPopupContent = `
                ${popupContent}
                <button class="btn btn-danger" id="${removePinButtonId}">Remove Pin</button>
              `;
              marker.getPopup().setContent(newPopupContent);

              // Add a click event listener to the "Remove Pin" button
              const removeButton = document.getElementById(removePinButtonId);
              if (removeButton) {
                removeButton.addEventListener("click", () => {
                  removeMarker(markerId);
                });
              }

              // Store country description in marker options
              marker.options.description = countryDescription;

              // Set the selected pin to the current marker
              setSelectedPin(marker);
            }

            // Update markers state with the new marker
            setMarkers((prevMarkers) => [...prevMarkers, marker]);
            console.log(
              `Added pin with ID: ${markerId}, Longitude: ${lng}, Latitude: ${lat}`
            );
          } catch (error) {
            console.error("Error retrieving country information:", error);
          }
        }
      };

      // Add a "click" event listener to the map
      map.on("click", handleMapClick);

      // Clean up by removing the "click" event listener when the component unmounts
      return () => {
        map.off("click", handleMapClick);
      };
    }
  }, [
    map,
    isAddingPin,
    isHoveringButton,
    removeMarker,
    setMarkers,
    setMarkerIds,
    setSelectedPin,
    removePinButtonId,
    isAddingButton,
  ]);

  const handleButtonClick = () => {
    setIsAddingButton((prevState) => !prevState);
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

  // Return the button
  return (
    <button
      ref={buttonRef}
      className={`btn ${isAddingButton ? "btn-danger" : "btn-primary"}`}
      onClick={handleButtonClick}
    >
      {isAddingButton ? "Cancel Adding" : "Add Pin"}
    </button>
  );
};

export default PinComponent;
