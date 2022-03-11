import React, { useRef, useEffect, useState, ChangeEventHandler } from 'react';
import './map-of-usa.css';
import mapboxgl, { MapboxGeoJSONFeature } from 'mapbox-gl';
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { Feature } from 'geojson';
import Popup from '../location-measurements/location-measurements';
import ReactDOM from 'react-dom';
import { ChangeEvent } from 'react';
import Checkboxes from '../../checkboxes/checkboxes';
import { CheckboxButton } from '../../enum/enums';
import LocationMeasurements from '../location-measurements/location-measurements';
import { Link, Routes, Route, Router, BrowserRouter } from "react-router-dom";
import App from '../../App';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2Rvcm5lbCIsImEiOiJjbDBidTE5Z3YxMHE0M2NtbjN5ZzJkMDk1In0.kRcnZyDcmcDMs7DvPmXvGg';

const MapOfUsa = (props: any) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const popupRef = useRef(new mapboxgl.Popup({ offset: 15 }));

    const [lng, setLng] = useState(5);
    const [lat, setLat] = useState(34);
    const [zoom, setZoom] = useState(1.5);
    const [map, setMap] = useState<mapboxgl.Map>({} as any);
    const selectedLocationId = useRef(null);
    // Initialize map when component mounts
    useEffect(() => {
      const map: mapboxgl.Map = new mapboxgl.Map({
        container: mapContainerRef.current as any,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom
      });
  
      // Add navigation control (the +/- zoom buttons)
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      map.on('load', () => {
        const features: Feature<Geometry, GeoJsonProperties>[] = []
        for (let i = 0; i < props.airQualityData.current.length; i++) {
            let entityImage;
            // eslint-disable-next-line default-case
            switch(props.airQualityData.current[i].entity) {
                case 'government':
                    entityImage = 'museum';
                    break;
                case 'community':
                    entityImage = 'theatre';
                    break;
                case 'research':
                    entityImage = 'rocket';
                    break;
            }
            features.push(
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [
                            props.airQualityData.current[i].coordinates?.longitude, props.airQualityData.current[i].coordinates?.latitude
                        ]
                    },
                    'properties': {
                        'id': `${props.airQualityData.current[i].id}`,
                        'title': `${props.airQualityData.current[i].entity}`,
                        'description': 
                          // <LocationMeasurements/>
                        `
                            <div>
                                <strong>${props.airQualityData.current[i].entity}</strong>
                                <div className="location-data-div">
                                  <button class="more-info-button" id="more-info-button">More info</button>
                                  <p>id: ${props.airQualityData.current[i].id}</p>
                                  <p>Country: ${props.airQualityData.current[i].country || 'N/A'}<p/>
                                  <p>City: ${props.airQualityData.current[i].city || 'N/A'}<p/>
                                  <p>Location: ${props.airQualityData.current[i].name || 'N/A'}<p/>
                                  <p>Sensor Type: ${props.airQualityData.current[i].sensorType}<p/>
                                  <p>Coordinates: ${props.airQualityData.current[i].coordinates?.longitude} - ${props.airQualityData.current[i].coordinates?.latitude}<p/>
                                  <p>First Updated: ${props.airQualityData.current[i].firstUpdated}<p/>
                                  <p>Last Updated: ${props.airQualityData.current[i].lastUpdated}<p/>
                                </div>
                            </div>
                            `
                            ,
                        'icon': `${entityImage}`
                    }
                },
            )
        }

        const places: string | Feature<Geometry, GeoJsonProperties> | FeatureCollection<Geometry, GeoJsonProperties> | undefined = {
            'type': 'FeatureCollection',
            'features': features,
        };

        // Add a GeoJSON source containing place coordinates and information.
        map.addSource('places', {
            'type': 'geojson',
            'data': places
        });

        for (const feature of places.features) {
          const symbol = feature.properties?.icon;
          const LayerID = `poi-${symbol}`;
          // Add a layer for this symbol type if it hasn't been added already.
          if (!map.getLayer(LayerID)) {
              map.addLayer({
                  'id': LayerID,
                  'type': 'symbol',
                  'source': 'places',
                  'layout': {
                      'icon-image': `${symbol}-15`,
                      'icon-allow-overlap': true
                  },
                  'filter': ['==', 'icon', symbol]
                });
                
                // When a click event occurs on a feature in the places layer, open a popup at the
                // location of the feature, with description HTML from its properties.
                // map.on("click", LayerID, (e: mapboxgl.MapboxGeoJSONFeature[]) => {
                map.on("click", LayerID, (e: any) => {
                  if (e.features.length) {
                    // const feature = features[0];
                    // Copy coordinates array.]
                    const coordinates = e.features[0].geometry.coordinates.slice();
                    const description = e.features[0].properties.description;
                    selectedLocationId.current = e.features[0].properties.id;
                    // Ensure that if the map is zoomed out such that multiple
                    // copies of the feature are visible, the popup appears
                    // over the copy being pointed to.
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }

                    popupRef.current
                      .setLngLat(coordinates)
                      // .setDOMContent(description)
                      .setHTML(description)
                      .addTo(map)
                  }

                  const seeMoreButton = document.getElementById('more-info-button');
                  console.log('seeMoreButton', seeMoreButton);
                  let clickedSeeMoreButton = false;
                  seeMoreButton?.addEventListener('click', (event) => {
                    console.log('event', event);
                    console.log('selectedLocationId.current', selectedLocationId.current);

                    props.navigateToMeasurements(`/measurements/${Number(selectedLocationId.current)}`, {
                      state: {
                        id: Number(selectedLocationId.current),
                      },
                    });
                  });
                });

                // Change the cursor to a pointer when the mouse is over the places layer.
                map.on('mouseenter', LayerID, () => {
                  map.getCanvas().style.cursor = 'pointer';
                });
                
                // Change it back to a pointer when it leaves.
                map.on('mouseleave', LayerID, () => {
                    map.getCanvas().style.cursor = '';
                });
              }
            }
    });
  
      map.on('move', () => {
        setLng(Number(map.getCenter().lng.toFixed(4)));
        setLat(Number(map.getCenter().lat.toFixed(4)));
        setZoom(Number(map.getZoom().toFixed(2)));
      });
      setMap(map);
      // Clean up on unmount
      return () => map.remove();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  const toggleVisibility = (event: ChangeEvent<HTMLInputElement>) => {
    let layerId: string = '';
    switch(event.target.name) {
      case CheckboxButton.Community:
        layerId = 'poi-theatre'
        break;
      case CheckboxButton.Research:
        layerId = 'poi-rocket'
        break;
      case CheckboxButton.Government:
        layerId = 'poi-museum'
        break;
    }
    map.setLayoutProperty(
      layerId,
      'visibility',
      event.target.checked ? 'visible' : 'none',
    )
  }

  return (
    <div>
      <div className='sidebarStyle'>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className='map-container' ref={mapContainerRef} />
      <Checkboxes
        toggleVisibility={toggleVisibility}
      />
    </div>
  );
};

export default MapOfUsa;