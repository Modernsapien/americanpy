import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import L from "leaflet";
import { renderToString } from "react-dom/server";

const PlaceToVisitButton = ({ map }) => {
  const [isAddingPlaceToVisit, setIsAddingPlaceToVisit] = useState(false);
  const [markerIds, setMarkerIds] = useState([]);
  const [clickEventListener, setClickEventListener] = useState(null);
  const [isMouseOverButton, setIsMouseOverButton] = useState(false);

  // Use a ref to target the "Add Memory" button within the popup
  const popupButtonRef = useRef(null); // Initialize with null

  useEffect(() => {
    if (isAddingPlaceToVisit && !isMouseOverButton) {
      const handleMapClick = (event) => {
        if (!isAddingPlaceToVisit) {
          return;
        }

        const { lat, lng } = event.latlng;
        const markerId = `place-to-visit-marker-${Date.now()}`;
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

        const popupContent = `
          <div>
            <img src="your-image-url.jpg" alt="Place Image" style="max-width: 100%; height: auto;">
            <p>Your short description goes here.</p>
            <button class="btn btn-primary popup-button">Add Memory</button>
          </div>
        `;

        marker.bindPopup(popupContent).openPopup();

        // Log the created marker ID
        console.log("Marker ID:", markerId);
      };

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

  // Handle the "Add Memory" button click within the popup
  useEffect(() => {
    if (!isAddingPlaceToVisit && markerIds.length > 0) {
      const handlePopupButtonClick = () => {
        // Navigate to the Memories page
        window.location.href = "/memories";
      };

      const popupButton = popupButtonRef.current;
      if (popupButton) {
        popupButton.addEventListener("click", handlePopupButtonClick);

        return () => {
          popupButton.removeEventListener("click", handlePopupButtonClick);
        };
      }
    }
  }, [isAddingPlaceToVisit, markerIds]);

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
      <div ref={popupButtonRef} style={{ display: "none" }}></div>
    </div>
  );
};

export default PlaceToVisitButton;
