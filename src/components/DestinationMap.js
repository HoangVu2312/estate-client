import React, { useEffect, useState } from 'react';
import ReactMapGl, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

const TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const MAPBOX_GEOCODING_ENDPOINT = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

function DestinationMap({ addresses, city }) {
  const [viewState, setViewState] = useState({
    longitude: 1000,
    latitude: 40,
    zoom: 11,
  });

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    async function geocode() {
      try {
        const addressPromises = addresses.map(async (address) => {
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
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactMapGl
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        interactiveLayerIds={['streets-v9']}
        mapboxApiAccessToken={TOKEN}
      >
        {markers.map((marker, index) => (
          <Marker key={index} latitude={marker.latitude} longitude={marker.longitude}>
          </Marker>
        ))}

        <NavigationControl position="bottom-right" />
      </ReactMapGl>
    </div>
  );
}

export default DestinationMap;

