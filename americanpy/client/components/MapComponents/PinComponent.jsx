import React from "react";
import L from "leaflet";

const PinComponent = ({ map, isAddingPin, isHoveringButton }) => {
  if (map && isAddingPin && !isHoveringButton) {
    const { lat, lng } = map.getCenter(); // You need to get coordinates from the map
    L.marker([lat, lng]).addTo(map);
  }

  return null;
};

export default PinComponent;
