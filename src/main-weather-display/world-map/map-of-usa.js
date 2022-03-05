// import * as mapboxgl from '!mapbox-gl';
// import mapboxgl from '/Users/kaidornel/Development/code/weather-app/node_modules/mapbox-gl/dist';
// import mapboxgl from 'weather-app/node_modules/mapbox-gl/dist'
import * as mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
// import mapboxgl from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import './map-of-usa.css';

// access token: pk.eyJ1Ijoic2Rvcm5lbCIsImEiOiJjbDBidTNteGYwMTZ6M2tteW5jYmtmbHo1In0.b_yAVfUZK8tevV9dIXGqEA
// public access token: pk.eyJ1Ijoic2Rvcm5lbCIsImEiOiJjbDBidTE5Z3YxMHE0M2NtbjN5ZzJkMDk1In0.kRcnZyDcmcDMs7DvPmXvGg
mapboxgl.accessToken = 'pk.eyJ1Ijoic2Rvcm5lbCIsImEiOiJjbDBidTE5Z3YxMHE0M2NtbjN5ZzJkMDk1In0.kRcnZyDcmcDMs7DvPmXvGg';

const endpoint = 'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/locations/tiles/tiles.json?'
const mobileendpoint = 'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/locations/tiles/mobile/tiles.json?'
const mobilegenendpoint = 'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/locations/tiles/mobile-generalized/tiles.json?'

const MapOfUsa = (props) => {
        // console.log('props', props);
    
    const mapContainer = useRef(null);
    const map = useRef(null);
    // const [map, setMap] = useState(null);
    const [lng, setLng] = useState(42.932125);
    const [lat, setLat] = useState(-85.60236);
    const [zoom, setZoom] = useState(0);
    // const [zoom, setZoom] = useState(9);
    // const [active, setActive] = useState(options[0]);

    useEffect(() => {
        if (map.current) {
            return;
        } // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [lng, lat],
            zoom: zoom,
            // load: {
            //     loadImage: {}
            // }
        });
        // map.current = new mapboxgl.Map({
        //     container: mapContainer,
        //     style: 'mapbox://styles/mapbox/light-v10',
        //     center: [lng, lat],
        //     zoom: zoom
        // });
        map.current.on('load', () => {
            // Add an image to use as a custom marker
            // map.current.loadImage(
                // 'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
                // (error, image) => {
                    // console.log('error', error);
                    // if (error) throw error;
                    // map.current.addImage('custom-marker', image);
                    // Add a GeoJSON source with 2 points

                    console.log('props.airQualityData.current', props.airQualityData.current);
                    const features = []
                    for (let i = 0; i < props.airQualityData.current.length; i++) {
                        // debugger
                        let entityImage;
                        // eslint-disable-next-line default-case
                        switch(props.airQualityData.current[i].entity) {
                            case 'government':
                                entityImage = 'museum-15';
                                break;
                            case 'community':
                                entityImage = 'theatre-15';
                                break;
                            case 'research':
                                entityImage = 'rocket-15';
                                break;
                        }
                        console.log(props.airQualityData.current[i])
                        // debugger
                        features.push(
                            {
                                // feature for Mapbox DC
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [
                                        props.airQualityData.current[i].coordinates?.longitude, props.airQualityData.current[i].coordinates?.latitude
                                    ]
                                },
                                'properties': {
                                    'title': `${props.airQualityData.current[i].entity}`,
                                    'description': `
                                        <div>
                                            <strong>${props.airQualityData.current[i].entity}</strong>
                                            <div>
                                                <p>City: ${props.airQualityData.current[i].city}<p/>
                                                <p>Location: ${props.airQualityData.current[i].name}<p/>
                                                <p>Sensor Type: ${props.airQualityData.current[i].sensorType}<p/>
                                                <p>Coordinates: ${props.airQualityData.current[i].coordinates?.longitude} - ${props.airQualityData.current[i].coordinates?.latitude}<p/>
                                                <p>First Updated: ${props.airQualityData.current[i].firstUpdated}<p/>
                                                <p>Last Updated: ${props.airQualityData.current[i].lastUpdated}<p/>
                                            </div>
                                        </div>`,
                                    'icon': `${entityImage}`
                                }
                            },
                        )
                    }
                    map.current.addSource('points', {
                        'type': 'geojson',
                        'data': {
                            'type': 'FeatureCollection',
                            'features': features,
                        }
                    });
                    map.current.addSource('places', {
                        'type': 'geojson',
                        'data': {
                            'type': 'FeatureCollection',
                            'features': features,
                        }
                    });

                    // // Add a symbol layer
                    // map.current.addLayer({
                    //     'id': 'points',
                    //     'type': 'symbol',
                    //     'source': 'points',
                    //     'layout': {
                    //     // 'icon-image': 'custom-marker',
                    //     'icon-image': '{icon}',
                    //     // get the title name from the source's "title" property
                    //     'text-field': ['get', 'title'],
                    //     'text-font': [
                    //         'Open Sans Semibold',
                    //         'Arial Unicode MS Bold'
                    //     ],
                    //     'text-offset': [0, 1.25],
                    //     'text-anchor': 'top'
                    //     }
                    // });
                    // Add a layer showing the places.
                    map.current.addLayer({
                        'id': 'places',
                        'type': 'symbol',
                        'source': 'places',
                        'layout': {
                        'icon-image': '{icon}',
                        'icon-allow-overlap': true
                        }
                    });

                    // When a click event occurs on a feature in the places layer, open a popup at the
                    // location of the feature, with description HTML from its properties.
                    map.current.on('click', 'places', (e) => {
                        // Copy coordinates array.
                        const coordinates = e.features[0].geometry.coordinates.slice();
                        const description = e.features[0].properties.description;
                        
                        // Ensure that if the map is zoomed out such that multiple
                        // copies of the feature are visible, the popup appears
                        // over the copy being pointed to.
                        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                        }
                        
                        new mapboxgl.Popup()
                        .setLngLat(coordinates)
                        .setHTML(description)
                        // .addTo(map);
                        .addTo(map.current);
                        });
                    // });     
                    
            // Change the cursor to a pointer when the mouse is over the places layer.
            map.current.on('mouseenter', 'places', () => {
                map.current.getCanvas().style.cursor = 'pointer';
            });
            
            // Change it back to a pointer when it leaves.
            map.current.on('mouseleave', 'places', () => {
                map.current.getCanvas().style.cursor = '';
            });
        });
    });

    return (
        <div className="world-map">
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" />
        </div>
        );
}

export default MapOfUsa;