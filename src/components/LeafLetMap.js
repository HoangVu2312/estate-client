import "../Style/Leaflet.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer,Marker} from "react-leaflet";
import React, { useEffect, useState } from 'react';
import axios from 'axios';


import { Icon } from "leaflet";

const TOKEN = `pk.eyJ1IjoiaG9hbmcyMzEyIiwiYSI6ImNscjgwMTBiZDB1ZXcya3BhaG53ZTBoZzYifQ.ayezKkd5oN9Lnw-bmbxQ3A`;
const MAPBOX_GEOCODING_ENDPOINT = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

// create custom icon
const customIcon = new Icon({
   iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  //iconUrl: require("./icons/placeholder.png"),
  iconSize: [38, 38] 
});





export default function LeafLetMap({ addresses, city }) {

  const [viewState, setViewState] = useState({
    latitude: "",
    longitude: "",
    zoom: 11,
  });
  
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    async function geocode() {
      try {
        if (!addresses || !city || addresses.length === 0) {
          // Handle the case where addresses or cities are missing
          setMarkers([]);
          return;
        }
        const addressPromises = addresses?.map(async (address) => {
          const response = await axios.get(
            `${MAPBOX_GEOCODING_ENDPOINT}/${encodeURIComponent(
              address
            )},${encodeURIComponent(city)}.json?access_token=${TOKEN}&limit=5`
          );

          // Handle if geocode fails
          if (response.data.features.length === 0) {
            throw new Error(`No results found for address: ${address}`);
          }

          const feature = response.data.features[0];
          return {
            latitude: feature.center[1],
            longitude: feature.center[0],
          };
        });

        const newMarkers = await Promise.all(addressPromises);
        setMarkers(newMarkers);


        // Center the map to the first marker
        if (newMarkers.length > 0) {
          
          setViewState((prevViewState) => ({
            ...prevViewState,
            latitude: newMarkers[0].latitude,
            longitude: newMarkers[0].longitude,
          }));
        }
      } catch (err) {
        // Handle error case
        console.error(err);
      }
    }

    geocode();
  }, [addresses, city]);
  



  return (
    <MapContainer key={`${viewState.latitude}-${viewState.longitude}-${viewState.zoom}`} center={[viewState.latitude, viewState.longitude]} zoom={viewState.zoom}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {Array.isArray(markers) &&
        markers.length > 0 &&
        markers.map((marker, index) => (
          <Marker
            key={index}
            position={[marker?.latitude, marker?.longitude]}
            icon={customIcon}
          ></Marker>
        ))}
    </MapContainer>
  );
}