import L from "leaflet";

const PinComponent = ({ map, isAddingPin, isHoveringButton }) => {
  if (map && isAddingPin && !isHoveringButton) {
    const { lat, lng } = map.getCenter();
    L.marker([lat, lng]).addTo(map);
  }

  return null;
};

export default PinComponent;
