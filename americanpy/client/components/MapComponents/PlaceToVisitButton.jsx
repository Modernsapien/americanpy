import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import L from "leaflet";
import { renderToString } from "react-dom/server";

const PlaceToVisitButton = ({ map }) => {
  const [isAddingPlaceToVisit, setIsAddingPlaceToVisit] = useState(false);

  useEffect(() => {
    if (isAddingPlaceToVisit) {
      const clickListener = map.on("click", (event) => {
        const { lat, lng } = event.latlng;
        const markerId = `place-to-visit-marker-${Date.now()}`;

        const customIcon = new L.DivIcon({
          className: "custom-icon",
          html: renderToString(
            <FontAwesomeIcon icon={faMapPin} style={{ color: "#ff2600", fontSize: "30px" }} />
          ),
          iconSize: [15, 32],
        });

        const marker = L.marker([lat, lng], {
          id: markerId,
          icon: customIcon,
        }).addTo(map);

        // Add your additional logic here, like binding popups, etc.

        // Remove the click event listener to stop adding pins
        map.off("click", clickListener);
        setIsAddingPlaceToVisit(false); // Reset the state
      });

      return () => {
        map.off("click", clickListener);
      };
    }
  }, [isAddingPlaceToVisit, map]);

  const handlePlaceToVisitClick = () => {
    setIsAddingPlaceToVisit((prevState) => !prevState);
  };

  return (
    <button className="btn btn-primary" onClick={handlePlaceToVisitClick}>
      {isAddingPlaceToVisit ? "Cancel Adding Place" : "Add Place to Visit"}
    </button>
  );
};

export default PlaceToVisitButton;
