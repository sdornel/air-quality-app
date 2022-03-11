import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import MapOfUsa from './world-map/map-of-usa';

const MainWeatherDisplayContainer = () => {
  const fetchCommunityLocationDataUrl = 'https://docs.openaq.org/v2/locations?limit=500&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&entity=community&dumpRaw=false';
  const fetchGovernmentLocationDataUrl = 'https://docs.openaq.org/v2/locations?limit=500&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&entity=government&dumpRaw=false';
  const fetchResearchLocationDataUrl = 'https://docs.openaq.org/v2/locations?limit=500&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&entity=research&dumpRaw=false';
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
        const cData = await fetch(fetchCommunityLocationDataUrl);
        cJson = await cData.json();
        results.push(...cJson.results);
      }
      if (governmentButton) {
        const gData = await fetch(fetchGovernmentLocationDataUrl);
        gJson = await gData.json();
        results.push(...gJson.results);
      }
      if (researchButton) {
        const rData = await fetch(fetchResearchLocationDataUrl);
        rJson = await rData.json();
        results.push(...rJson.results);
      }
      airQualityData.current = [...results]
    }
    fetchData();
  }, [airQualityData.current]);


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

  let navigateToMeasurements = useNavigate(); 

  return (
    <div className="App">
      <h1>Main Weather Display</h1>
      <MapOfUsa airQualityData={airQualityData} getMeasurementData={getMeasurementData} mData={mData} navigateToMeasurements={navigateToMeasurements} />
    </div>
  );
}

export default MainWeatherDisplayContainer;
