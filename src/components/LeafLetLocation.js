import "../Style/Leaflet.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer,Marker } from "react-leaflet";
import React, { useEffect, useRef, useState } from 'react';
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





export default function LeafLetLocation({ address, city, country }) {


  const [viewState, setViewState] = useState({
    latitude: "48.8534951",
    longitude: "2.3483915",
    zoom: 11,
  });
  
  const markerLatRef = useRef(0);
  const markerLongRef = useRef(0);

  useEffect(() => {
    async function geocode() {
      try {
        const response = await axios.get(
          `${MAPBOX_GEOCODING_ENDPOINT}/${encodeURIComponent(
            address
          )},${encodeURIComponent(city)},${encodeURIComponent(
            country
          )}.json?access_token=${TOKEN}&limit=5`
        );

        // Handle if geocode fails
        if (response.data.features.length === 0) {
          throw new Error("No results found");
        }

        const match = response.data.features[0];

        // Handle case when match is undefined
        if (!match || !match.center || match.center.length !== 2) {
          throw new Error("Invalid match");
        }
        markerLatRef.current = match.center[1];
        markerLongRef.current = match.center[0];

        setViewState((prevviewState) => ({
          ...prevviewState,
          latitude: match.center[1],
          longitude: match.center[0],
          zoom: 13,
        }));
      } catch (err) {
        // Handle error case
        console.error(err);
      }
    }

    geocode();
  }, [address, city, country]);
  



  return (
    <MapContainer
      key={`${viewState.latitude}-${viewState.longitude}-${viewState.zoom}`}
      center={[viewState.latitude, viewState.longitude]}
      zoom={viewState.zoom}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[markerLatRef?.current, markerLongRef?.current]} icon={customIcon}></Marker>
    </MapContainer>
  );
}