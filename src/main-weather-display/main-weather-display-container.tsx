import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
// import '../App.css';
import MapOfUsa from './world-map/map-of-usa';

const MainWeatherDisplayContainer = () => {
  const fetchLocationDataForUs = 'https://docs.openaq.org/v2/latest?limit=100&page=1&offset=0&sort=desc&radius=1000&country=US&order_by=lastUpdated&sensorType=reference%20grade&dumpRaw=false';
  const [data, setState] = useState([]);
  const coordinates = useRef({});
    // componentDidMount() {

    // }
  useEffect((): void => {
    fetchLocationData();
    // fetchTileData();
    // 'https://docs.openaq.org/v2/locations/tiles/viewer'
    // fetch('https://docs.openaq.org/v2/locations/tiles/tiles.json')
    // .then(res => res.json())
    // .then(data => {
    //   console.log('data1', data);
    // })
  }, []);

  const fetchLocationData = (): void => {
    fetch(fetchLocationDataForUs)
    .then(res => res.json())
    .then(data => {
      setState(data);
      console.log('data2', data);
      // if i had more control of the api i would make a get request to only retrieve an array of coordinates
      // const coordinates = [];
      // console.log(data.results[0].coordinates);
      const coordinatesArray = [];
      for (let i = 0; i < data.results.length; i++) {
        coordinatesArray.push(Object.values(data.results[i].coordinates));
        // coordinatesArray.push(data.results[i].coordinates);
      }
      // console.log('coordinatesArray', coordinatesArray);
      coordinates.current = coordinatesArray;
      // debugger
      // coordinates.current = [];
    });
  };

  return (
    <div className="App">
      <h1>Main Weather Display</h1>
      {/* {console.log('data', data)} */}
      <MapOfUsa coordinates={coordinates}/>
      {/* <div ref={MapOfUsa} className="map-container" /> */}


    </div>
  );
}

export default MainWeatherDisplayContainer;
