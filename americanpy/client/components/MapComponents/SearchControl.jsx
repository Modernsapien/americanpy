import React, { useEffect } from "react";
import L from "leaflet";
import { GeoSearchControl, EsriProvider } from "leaflet-geosearch";

const SearchControl = ({ map }) => {
  useEffect(() => {
    const provider = new EsriProvider();
    const searchControl = new GeoSearchControl({
      provider,
      showPopup: false, 
      popupFormat: ({ query, result }) => result.label,
      maxMarkers: 1,
      retainZoomLevel: false,
      animateZoom: true,
    });

    map.addControl(searchControl);

    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return null;
};

export default SearchControl;
