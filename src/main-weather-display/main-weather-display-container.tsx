import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import Toggle from './toggle/toggle';
import { ButtonType } from '../enum/enums'
import MapOfUsa from './world-map/map-of-usa';

const MainWeatherDisplayContainer = () => {
  let fetchLocationDataForUSA = 'https://docs.openaq.org/v2/locations?limit=100&page=1&offset=0&sort=desc&radius=1000&country=US&order_by=lastUpdated&entity=community&entity=government&entity=research&dumpRaw=false';
  const fetchCommunityLocationDataForUSA = 'https://docs.openaq.org/v2/locations?limit=100&page=1&offset=0&sort=desc&radius=1000&country=US&order_by=lastUpdated&entity=community&dumpRaw=false';
  const fetchGovernmentLocationDataForUSA = 'https://docs.openaq.org/v2/locations?limit=100&page=1&offset=0&sort=desc&radius=1000&country=US&order_by=lastUpdated&entity=government&dumpRaw=false';
  const fetchResearchLocationDataForUSA = 'https://docs.openaq.org/v2/locations?limit=100&page=1&offset=0&sort=desc&radius=1000&country=US&order_by=lastUpdated&entity=research&dumpRaw=false';
  const airQualityData = useRef({});
  const [communityButton, selectedCommunity] = useState(false);
  const [governmentButton, selectedGovernment] = useState(false);
  const [researchButton, selectedResearch] = useState(false);
  useEffect(() => {
    // fetchCommunityLocationData();
    // fetchGovernmentLocationData();
    // fetchResearchLocationData();

    
  
    const fetchData = async () => {
      // console.log(await fetchCommunityLocationData())
      const cData = await fetch(fetchCommunityLocationDataForUSA);
      const cJson = await cData.json();
      // airQualityData.current = cJson;

      const gData = await fetch(fetchGovernmentLocationDataForUSA);
      const gJson = await gData.json();

      const rData = await fetch(fetchResearchLocationDataForUSA);
      const rJson = await rData.json();

      airQualityData.current = [...cJson.results, ...gJson.results, ...rJson.results];
    }

    fetchData();
  }, [airQualityData.current]);

  const fetchCommunityLocationData = async () => {
    let airQualityDataArray: any = [];
    fetch(fetchCommunityLocationDataForUSA)
    .then(res => res.json())
    .then(data => {
      console.log('data', data);
      // const airQualityDataArray: any = [];
      for (let i = 0; i < data.results.length; i++) {
        airQualityDataArray.push(data.results[i]);
      }
      // setAirQualityData(oldData => [...oldData, ...airQualityDataArray]);
      return airQualityDataArray;
    });
    // debugger
    return await airQualityDataArray;
  };

  const fetchGovernmentLocationData = async () => {
    let airQualityDataArray: any = [];
    fetch(fetchGovernmentLocationDataForUSA)
    .then(res => res.json())
    .then(data => {
      const airQualityDataArray: any = [];
      // setState(data);
      for (let i = 0; i < data.results.length; i++) {
        airQualityDataArray.push(data.results[i]);
      }
      // setAirQualityData(oldData => [...oldData, ...airQualityDataArray]);
      return airQualityDataArray;
    });
    return await airQualityDataArray;
  };

  const fetchResearchLocationData = async () => {
    let airQualityDataArray: any = [];
    fetch(fetchResearchLocationDataForUSA)
    .then(res => res.json())
    .then(data => {
      const airQualityDataArray: any = [];
      // setState(data);
      for (let i = 0; i < data.results.length; i++) {
        airQualityDataArray.push(data.results[i]);
      }
      // setAirQualityData(oldData => [...oldData, ...airQualityDataArray]);
      return airQualityDataArray;
    });
    return await airQualityDataArray;
  };

  const updateLocationFetchRequest = (event: ButtonType) => {
    console.log('event', event);
    switch (event) {
      case ButtonType.Community:
        // hook here
      break;
      case ButtonType.Government:

      break;

      case ButtonType.Research:

      break;
    }
  }

  return (
    <div className="App">
      <h1>Main Weather Display</h1>
      <Toggle updateLocationFetchRequest={updateLocationFetchRequest}/>
      <MapOfUsa airQualityData={airQualityData}/>
    </div>
  );
}

export default MainWeatherDisplayContainer;
