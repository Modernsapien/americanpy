import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import L from "leaflet";
import { renderToString } from "react-dom/server";

const PlaceToVisitButton = ({ map }) => {
  const [isAddingPlaceToVisit, setIsAddingPlaceToVisit] = useState(false);
  const [markerIds, setMarkerIds] = useState([]);
  const [clickEventListener, setClickEventListener] = useState(null);

  useEffect(() => {
    if (isAddingPlaceToVisit) {
      const handleMapClick = (event) => {
        if (!isAddingPlaceToVisit) {
          return; // Return if isAddingPlaceToVisit is false
        }

        const { lat, lng } = event.latlng;
        const markerId = `place-to-visit-marker-${Date.now()}`;

        // Store the marker ID in state
        setMarkerIds((prevIds) => [...prevIds, markerId]);

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

        // Create a popup with your content
        const popupContent = `
          <div>
            <img src="your-image-url.jpg" alt="Place Image" style="max-width: 100%; height: auto;">
            <p>Your short description goes here.</p>
            <button class="btn btn-primary popup-button">Add Memory</button>
          </div>
        `;

        marker.bindPopup(popupContent).openPopup();

        // Handle the button click to navigate to the Memories page
        const popupButton = document.querySelector(".popup-button");
        popupButton.addEventListener("click", () => {
          // Navigate to the Memories page
          window.location.href = "/memories";
        });

        // Log the created marker ID
        console.log("Marker ID:", markerId);
      };

      // Add a click event listener to the map
      const clickListener = map.on("click", handleMapClick);
      setClickEventListener(clickListener);
    } else {
      // Remove the click event listener from the map
      if (clickEventListener) {
        clickEventListener.off();
      }
    }
  }, [isAddingPlaceToVisit, map]);

  const handlePlaceToVisitClick = (event) => {
    event.stopPropagation(); // Prevent click event from propagating to the map
    setIsAddingPlaceToVisit((prevState) => !prevState);
  };

  return (
    <div className="map-button">
      <button
        className={`btn ${isAddingPlaceToVisit ? "btn-danger" : "btn-primary"}`}
        onClick={handlePlaceToVisitClick}
        id="add-place-button"
      >
        {isAddingPlaceToVisit
          ? "Cancel Places I've Visited"
          : "Places I've Visited"}
      </button>
    </div>
  );
};

export default PlaceToVisitButton;
