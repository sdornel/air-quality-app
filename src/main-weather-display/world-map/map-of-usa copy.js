// import * as mapboxgl from '!mapbox-gl';
// import mapboxgl from '/Users/kaidornel/Development/code/weather-app/node_modules/mapbox-gl/dist';
// import mapboxgl from 'weather-app/node_modules/mapbox-gl/dist'
import * as mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
// import mapboxgl from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useRef } from 'react';
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
    console.log('props.measurementDataForLocation', props.measurementDataForLocation);   
    const mapContainer = useRef(null);
    const map = useRef(null);
    const buttonRef = useRef(null);
    // this.buttonRef = React.createRef();
    // const [map, setMap] = useState(null);
    const [lng, setLng] = useState(42.932125);
    const [lat, setLat] = useState(-85.60236);
    const [zoom, setZoom] = useState(0);

    useEffect(() => {    
        const filterGroup = document.getElementById('filter-group');
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [lng, lat],
            zoom: zoom,
        });

        map.on('load', () => {
            const features = []
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
                            'description': `
                                <div>
                                    <strong>${props.airQualityData.current[i].entity}</strong>
                                    <div>
                                        <button id="modal-btn"> click me, I make a modal</button>
                                        <div class="modal">
                                        <div class="modal-content">
                                            <span class="close-btn">&times;</span>
                                            <p>this is the text inside the modal</p>
                                            <p>${props.mData.current.location}</p>
                                        </div>
                                        </div>
                                        // I could append something here to open a modal with more data
                                        // 1) add element
                                        // 2) add event listener to open modal with all data
                                        <button class="see-more-button" id="see-more-button">See more</button>
                                        <p>id: ${props.airQualityData.current[i].id}</p>
                                        <p>City: ${props.airQualityData.current[i].city || 'N/A'}<p/>
                                        <p>Location: ${props.airQualityData.current[i].name || 'N/A'}<p/>
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

            const places = {
                'type': 'FeatureCollection',
                'features': features,
            };

            // Add a GeoJSON source containing place coordinates and information.
            map.addSource('places', {
                'type': 'geojson',
                'data': places
            });

            // const seeMoreButton = document.querySelector('.see-more-button')
            // seeMoreButton.addEventListener('click', () => {
            //     debugger
            // })

            for (const feature of places.features) {
                const symbol = feature.properties.icon;
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
    
                    // Add checkbox and label elements for the layer.
                    const input = document.createElement('input');
                    input.type = 'checkbox';
                    input.id = LayerID;
                    input.checked = true;
                    filterGroup.appendChild(input);
    
                    const label = document.createElement('label');
                    label.setAttribute('for', LayerID);
                    label.textContent = symbol;
                    filterGroup.appendChild(label);
    
                    // When the checkbox changes, update the visibility of the layer.
                    input.addEventListener('change', (e) => {
                        map.setLayoutProperty(
                            LayerID,
                            'visibility',
                            e.target.checked ? 'visible' : 'none'
                        );
                    });

            // When a click event occurs on a feature in the places layer, open a popup at the
            // location of the feature, with description HTML from its properties.
            map.on('click', LayerID, (e) => {
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
                    .addTo(map);
                // debugger
                // see-more-button
                // debugger
                // document.getElementById('see-more-button').addEventListener('click', handleClick)
                // document.querySelectorAll('see-more-button').addEventListener('click', handleClick)
                // console.log(document.getElementsByClassName('see-more-button'));
                const seeMoreButton = document.getElementsByClassName('see-more-button');
                for (let i = 0; i < seeMoreButton.length; i++) {
                    // seeMoreButton[i].addEventListener('click', handleClick(Number(feature.properties.id)));
                    let modalBtn = document.getElementById("modal-btn")
                    let modal = document.querySelector(".modal")
                    let closeBtn = document.querySelector(".close-btn")
                    // debugger
                    // modalBtn.addEventListener('click', handleClick(Number(feature.properties.id)));
                    // modalBtn.addEventListener('click', setMeasurementData(props.getMeasurementData(Number(feature.properties.id))));
                    modalBtn.addEventListener('click', handleClick(e));
                    modalBtn.onclick = () => {
                        modal.style.display = "block"
                    }
                    closeBtn.onclick = () => {
                        modal.style.display = "none"
                    }
                    window.onclick = () => {
                    if(e.target == modal){
                        modal.style.display = "none"
                    }
                    }
                }
                // debugger
            }); 

                // Change the cursor to a pointer when the mouse is over the places layer.
                map.on('mouseenter', LayerID, () => {
                    map.getCanvas().style.cursor = 'pointer';
                });
                
                // Change it back to a pointer when it leaves.
                map.on('mouseleave', LayerID, () => {
                    map.getCanvas().style.cursor = '';
                });

                map.on('mousemove', (e) => {
                    document.getElementById('info').innerHTML =
                        // `e.point` is the x, y coordinates of the `mousemove` event
                        // relative to the top-left corner of the map.
                        JSON.stringify(e.point) +
                        '<br />' +
                        // `e.lngLat` is the longitude, latitude geographical position of the event.
                        JSON.stringify(e.lngLat.wrap());
                });
                }
            }
        });
    });
    const handleClick = async (event) => {
        // debugger
        // console.log("hello", Number(event.features[0].properties.id));
        // alert("hello");
        // console.log(props.getMeasurementData(Number(locationId)));
        // console.log(await props.getMeasurementData(Number(event.features[0].properties.id)));
        const locationId = Number(event?.features[0].properties.id);
        console.log('locationId', locationId);
        // setMeasurementData(await props.getMeasurementData(locationId));
        measurementDataForLocation.current = await props.getMeasurementData(locationId);
        console.log('mdc c', measurementDataForLocation.current);
        // const modal = document.querySelector(".modal");
        // modal.innerHTML = `<p>asdfasdfasdfd</p>`
    };

    // const [measurementData, setMeasurementData] = useState({});

    // const measurementDataForLocation = useState( () => props.getMeasurementData(locationId) );
    const measurementDataForLocation = useRef({});
    return (
        <div className="world-map">
            <div ref={mapContainer} className="map-container" />
            <pre id="info"></pre>
            <nav id="filter-group" className="filter-group"></nav>
        </div>
        );
}

export default MapOfUsa;