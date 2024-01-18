import React, { useEffect, useRef } from 'react';
import ReactMapGl, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

const TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const MAPBOX_GEOCODING_ENDPOINT = 'https://api.mapbox.com/geocoding/v5/mapbox.places';



function LocationMap({ address, city, country }) {
    const [viewState, setViewState] = React.useState({
        longitude: 1000,
        latitude: 40,
        zoom: 13
      });

      const markerLatRef = useRef(0);
      const markerLongRef = useRef(0);

      useEffect(() => {
        async function geocode() {
          try {
            const response = await axios.get(
              `${MAPBOX_GEOCODING_ENDPOINT}/${encodeURIComponent(address)},${encodeURIComponent(city)},${encodeURIComponent(country)}.json?access_token=${TOKEN}&limit=1`
            );
    
            // Handle if geocode fails
            if (response.data.features.length === 0) {
              throw new Error('No results found');
            }
    
            const match = response.data.features[0];
    
            // Handle case when match is undefined
            if (!match || !match.center || match.center.length !== 2) {
              throw new Error('Invalid match');
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
        <div style={{ width: '500px', height: '370px' }}>
          <ReactMapGl
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            interactiveLayerIds={['streets-v9']}
            mapboxApiAccessToken={TOKEN} 

          >
             <Marker latitude={markerLatRef.current} longitude={markerLongRef.current} />
    
            <NavigationControl position="bottom-right" />
          </ReactMapGl>
        </div>
      );
}

export default LocationMap;

