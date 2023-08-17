import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import axios from "axios";
import ecoData from "../../data/ecoData.json";
import { v4 as uuidv4 } from 'uuid';


const PinComponent = ({
  map,
  isAddingPin,
  markers,
  isHoveringButton,
  removeMarker,
  setMarkers,
  setMarkerIds,
  setSelectedPin,
  isAddingButton,
  setIsAddingButton,
}) => {
  const buttonRef = useRef(null);
  // const [markers, setMarkersState] = useState([]);
  const markerRef = useRef({});

  useEffect(() => {
    setMarkers([]);

    if (map) {
      const handleMapClick = async (event) => {
        console.log("Map clicked");
        if (isAddingPin && !isHoveringButton && !isAddingButton) {
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
                const marker = L.marker([lat, lng], { id: markerId }).addTo(map);
                
              // const markers = []
              // const marker = L.marker(marker.latLng, { id: markerId }).addTo(map);
              // markers.push(marker);
              marker._icon.id = markerId;


      
                const countryDescription = countryData.description;
      
                marker
                  .bindPopup(`<b>${countryName}</b><br>${countryDescription}`)
                  .openPopup();
      
                const popupContent = marker.getPopup().getContent();
                const newPopupContent = `
                  ${popupContent}
                  <button class="btn btn-danger" id="${markerId}" >Remove Pin</button>
                `;
                marker.getPopup().setContent(newPopupContent);
      
                marker.options.description = countryDescription;
      
                setSelectedPin(marker);
      
                setMarkerIds((prevMarkerIds) => [...prevMarkerIds, markerId]);
                setMarkers((prevMarkers) => [...prevMarkers, marker]);
                markerRef.current[markerId] = marker;
      
                console.log(
                  `Added pin with ID: ${markerId}, Longitude: ${lng}, Latitude: ${lat}`
                );
                setMarkers([...markers,marker])
                console.log(markers)
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
        console.log(markers)
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

  const handleRemovePinClick = (marker) => {

    console.log(markerId);
    console.log("Clicked Remove Pin button for marker with ID:", markerId);
    console.log("Markers array:", markers);
  
    const updatedMarkers = markers.filter(
      (el) => el !== marker,
      console.log(marker)
    );
    setMarkers(updatedMarkers);
    // setMarkers((prevMarkers) =>
    //   prevMarkers.filter((marker) => marker.options.id !== markerId)
    // );
  
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
          {/* <button
            className="btn btn-danger"
            onClick={() => removeMarker(marker)}
            id={`remove-pin-button-${marker.options.id}`}
          >
            Remove Pin
          </button> */}
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
