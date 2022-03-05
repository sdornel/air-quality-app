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
        const options = [
        {
          name: 'Population',
          description: 'Estimated total population',
          property: 'pop_est',
          stops: [
            [0, '#f8d5cc'],
            [1000000, '#f4bfb6'],
            [5000000, '#f1a8a5'],
            [10000000, '#ee8f9a'],
            [50000000, '#ec739b'],
            [100000000, '#dd5ca8'],
            [250000000, '#c44cc0'],
            [500000000, '#9f43d7'],
            [1000000000, '#6e40e6']
          ]
        },
        {
          name: 'GDP',
          description: 'Estimate total GDP in millions of dollars',
          property: 'gdp_md_est',
          stops: [
            [0, '#f8d5cc'],
            [1000, '#f4bfb6'],
            [5000, '#f1a8a5'],
            [10000, '#ee8f9a'],
            [50000, '#ec739b'],
            [100000, '#dd5ca8'],
            [250000, '#c44cc0'],
            [5000000, '#9f43d7'],
            [10000000, '#6e40e6']
          ]
        }
    ];
    
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
        // debugger
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [lng, lat],
            // center: [lat, lng],
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
        // debugger
        map.current.on('load', () => {
            // Add an image to use as a custom marker
            map.current.loadImage(
                'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
                (error, image) => {
                    if (error) throw error;
                    map.current.addImage('custom-marker', image);
                    // Add a GeoJSON source with 2 points

                    const features = []
                    for (let i = 0; i < props.coordinates.current.length; i++) {
                        features.push(
                            {
                                // feature for Mapbox DC
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [
                                        props.coordinates.current[i][1], props.coordinates.current[i][0]
                                    ]
                                },
                                'properties': {
                                    'title': `Location ${i}`
                                }
                            },
                        )
                    }
                    // console.log('features', features[0]);
                    map.current.addSource('points', {
                        'type': 'geojson',
                        'data': {
                            'type': 'FeatureCollection',
                            'features': features,
                            // 'features': [
                            //     {
                            //         // feature for Mapbox DC
                            //         'type': 'Feature',
                            //         'geometry': {
                            //             'type': 'Point',
                            //             // 'coordinates': props.coordinates.current,
                            //             'coordinates': [
                            //                 -76.53063297271729, 39.18174077994108
                            //                 // -94.57055, 39.10465
                            //             ]
                            //         },
                            //         'properties': {
                            //             'title': 'Mapbox DC'
                            //         }
                            //     },
                            //     {
                            //         // feature for Mapbox SF
                            //         'type': 'Feature',
                            //         'geometry': {
                            //             'type': 'Point',
                            //             'coordinates': [-122.414, 37.776]
                            //         },
                            //         'properties': {
                            //             'title': 'Mapbox SF'
                            //         }
                            //     }
                            // ]
                        }
                    });

                    // Add a symbol layer
                    map.current.addLayer({
                        'id': 'points',
                        'type': 'symbol',
                        'source': 'points',
                        'layout': {
                        'icon-image': 'custom-marker',
                        // get the title name from the source's "title" property
                        'text-field': ['get', 'title'],
                        'text-font': [
                            'Open Sans Semibold',
                            'Arial Unicode MS Bold'
                        ],
                        'text-offset': [0, 1.25],
                        'text-anchor': 'top'
                        }
                    });
                }
            );              
        })
    });

    // useEffect(() => {
    //     // console.log('map', map);
    //     if (!map.current) return; // wait for map to initialize
    //     map.current.on('move', () => {
    //         setLng(map.current.getCenter().lng.toFixed(4));
    //         setLat(map.current.getCenter().lat.toFixed(4));
    //         setZoom(map.current.getZoom().toFixed(2));
    //     });
    // });

    // console.log('got here');
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