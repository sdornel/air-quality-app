import { useState, useRef, useEffect, Dispatch, SetStateAction, MutableRefObject } from 'react';
import { useNavigate } from "react-router-dom";
import WorldMap from './world-map/world-map';
import './main-weather-display.css';
import React from 'react';

const MainWeatherDisplayContainer = () => {
  //seems that this url is possibly incorrect? need to get valid response here but is causing console errors. possibly due to general breakage at the API level or due to improper implementation? (entity=community might be the wrong thing?)

  // const fetchCommunityLocationDataUrl = 'https://api.openaq.org/v2/locations?limit=500&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&entity=community&dumpRaw=false';
  const fetchGovernmentLocationDataUrl = 'https://api.openaq.org/v2/locations?limit=500&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&entity=government&dumpRaw=false';
  const fetchResearchLocationDataUrl = 'https://api.openaq.org/v2/locations?limit=500&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&entity=research&dumpRaw=false';
  const airQualityData: MutableRefObject<{}> = useRef({});
  const [loading, setLoading]: Array<boolean | Dispatch<SetStateAction<boolean>>> = useState(false);

  const measurementDataForLocation: MutableRefObject<{}> = useRef({});
  useEffect((): void => {
    fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    let cJson;
    let gJson;
    let rJson;
    const results = [];

    //commented this out due to previously mentioned issue. we are removing all reference to the community location data for now until API issue can be resolved. 
    
    // const cData = await fetch(fetchCommunityLocationDataUrl);
    // console.log('cData', cData);
    // cJson = await cData.json();
    // results.push(...cJson.results);

    const gData = await fetch(fetchGovernmentLocationDataUrl);
    gJson = await gData.json();
    results.push(...gJson.results);

    const rData = await fetch(fetchResearchLocationDataUrl);
    rJson = await rData.json();
    results.push(...rJson.results);

    airQualityData.current = [...results]
  }

  const getMeasurementData = async (locationId: number) => { 
    const getMeasurementDataForLocation = `https://api.openaq.org/v2/locations/${locationId}?limit=100&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&dumpRaw=false`;
    const res = await fetch(getMeasurementDataForLocation);
    console.log('res', res);
    const measurementData = res.json();
    console.log('measurementData', measurementData);
    measurementDataForLocation.current = measurementData;
    return measurementData;
  }

  let navigate = useNavigate();

  const onLoad = () => {
    setLoading(true);
  }

  if (loading) {
    return (
      <div>
        <div className="location-data-loader"/>
        <h3 className="loading-text">Loading. Please wait.</h3>
      </div>
    )
  } else {
    return (
      <div className="main-weather-display-container-div">
        <h1 className="main-air-quality-display-title">Main Air Quality Display</h1>
        <WorldMap airQualityData={airQualityData} getMeasurementData={getMeasurementData} measurementDataForLocation={measurementDataForLocation} navigate={navigate} onLoad={onLoad} />
      </div>
    );

  }

}

export default MainWeatherDisplayContainer;
