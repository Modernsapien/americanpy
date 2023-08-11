import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import L from "leaflet";
import { renderToString } from "react-dom/server";

const PlaceToVisitButton = ({ map }) => {
  const [isAddingPlaceToVisit, setIsAddingPlaceToVisit] = useState(false);

  useEffect(() => {
    if (isAddingPlaceToVisit) {
        const handleMapClick = (event) => {
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
          
            // Create a popup with your content
            const popupContent = `
              <div>
                <img src="your-image-url.jpg" alt="Place Image" style="max-width: 100%; height: auto;">
                <p>Your short description goes here.</p>
              </div>
            `;
          
            marker.bindPopup(popupContent).openPopup();
          
            // Remove the click event listener to stop adding pins
            map.off("click", handleMapClick);
            setIsAddingPlaceToVisit(false); // Reset the state here
          };
          

      // Add a click event listener to the map
      map.on("click", handleMapClick);

      return () => {
        // Clean up by removing the click event listener when the component unmounts
        map.off("click", handleMapClick);
      };
    }
  }, [isAddingPlaceToVisit, map]);

  const handlePlaceToVisitClick = () => {
    setIsAddingPlaceToVisit((prevState) => !prevState);
  };
  

  return (
    <div className="map-button">
      <button
        className={`btn ${isAddingPlaceToVisit ? "btn-danger" : "btn-primary"}`}
        onClick={handlePlaceToVisitClick}
        id="add-place-button"
      >
        {isAddingPlaceToVisit ? "Cancel Places i've visited" : "Places i've visited"}
      </button>
    </div>
  );
};

export default PlaceToVisitButton;
