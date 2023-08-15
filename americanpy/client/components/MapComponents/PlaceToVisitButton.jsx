import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import L from "leaflet";
import { renderToString } from "react-dom/server";

const PlaceToVisitButton = ({ map }) => {
  const [isAddingPlaceToVisit, setIsAddingPlaceToVisit] = useState(false);
  const [clickEventListener, setClickEventListener] = useState(null);
  const [isMouseOverButton, setIsMouseOverButton] = useState(false);

  

  useEffect(() => {
    const handleMapClick = (event) => {
      if (isAddingPlaceToVisit && !isMouseOverButton) {
        const { lat, lng } = event.latlng;
        const markerId = `place-to-visit-marker-${Date.now()}`;

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

        console.log("Marker ID:", markerId);
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
    setIsAddingButton(false);
  };

  const handleMouseEnterButton = () => {
    setIsMouseOverButton(true);
  };

  const handleMouseLeaveButton = () => {
    setIsMouseOverButton(false);
  };

  return (
    <div className="map-button">
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
    </div>
  );
};

export default PlaceToVisitButton;
