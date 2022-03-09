import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { ButtonType } from '../enum/enums'
import MapOfUsa from './world-map/map-of-usa';

const MainWeatherDisplayContainer = () => {
  const fetchCommunityLocationDataForUSA = 'https://docs.openaq.org/v2/locations?limit=100&page=1&offset=0&sort=desc&radius=1000&country=US&order_by=lastUpdated&entity=community&dumpRaw=false';
  const fetchGovernmentLocationDataForUSA = 'https://docs.openaq.org/v2/locations?limit=100&page=1&offset=0&sort=desc&radius=1000&country=US&order_by=lastUpdated&entity=government&dumpRaw=false';
  const fetchResearchLocationDataForUSA = 'https://docs.openaq.org/v2/locations?limit=100&page=1&offset=0&sort=desc&radius=1000&country=US&order_by=lastUpdated&entity=research&dumpRaw=false';
  const airQualityData = useRef({});
  const [communityButton, selectedCommunity] = useState(true);
  const [governmentButton, selectedGovernment] = useState(true);
  const [researchButton, selectedResearch] = useState(true);

  // const measurementDataForLocation = useRef({});
  // const [measurementDataForLocation, setMeasurementData] = useState({});
  const measurementDataForLocation = useState({});
  useEffect(() => {
    const fetchData = async () => {
      let cJson;
      let gJson;
      let rJson;
      const results = [];
      if (communityButton) {
        const cData = await fetch(fetchCommunityLocationDataForUSA);
        cJson = await cData.json();
        results.push(...cJson.results);
      }
      if (governmentButton) {
        const gData = await fetch(fetchGovernmentLocationDataForUSA);
        gJson = await gData.json();
        results.push(...gJson.results);
      }
      if (researchButton) {
        const rData = await fetch(fetchResearchLocationDataForUSA);
        rJson = await rData.json();
        results.push(...rJson.results);
      }
      airQualityData.current = [...results]
    }
    fetchData();
  }, [airQualityData.current]);

  const fetchCommunityLocationData = async () => {
    let airQualityDataArray: any = [];
    fetch(fetchCommunityLocationDataForUSA)
    .then(res => res.json())
    .then(data => {
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
    switch (event) {
      case ButtonType.Community:
        selectedCommunity(!communityButton);
      break;
      case ButtonType.Government:
        selectedGovernment(!governmentButton);
      break;

      case ButtonType.Research:
        selectedResearch(!researchButton);
      break;
    }
    // console.log(communityButton, governmentButton, researchButton);
  }

  // useEffect(() => {

  // }, [measurementDataForLocation.current])

  const getMeasurementData = async (locationId: number) => { 
    console.log('CLICKED', locationId);
    const getMeasurementDataForLocation = `https://docs.openaq.org/v2/measurements?date_from=2022-03-04T02%3A16%3A00%2B00%3A00&date_to=2022-03-05T02%3A16%3A00%2B00%3A00&limit=100&page=1&offset=0&sort=desc&radius=1000&country=US&location_id=${locationId}&order_by=datetime`
    const res = await fetch(getMeasurementDataForLocation);
    // const data = await res.json();
    // console.log('res', res);
    // measurementDataForLocation.current = await res.json();
    // setMeasurementData(await res.json());
    const measurementData = await res.json();
    mData.current = measurementData;
    return measurementData;
    // const measurementDataForLocation = useState( () => getMeasurementData(locationId) );
  }

  const mData = useRef({});

  return (
    <div className="App">
      <h1>Main Weather Display</h1>
      <MapOfUsa airQualityData={airQualityData} getMeasurementData={getMeasurementData} mData={mData}/>
    </div>
  );
}

export default MainWeatherDisplayContainer;
