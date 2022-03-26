import { useState, useRef, useEffect, Dispatch, SetStateAction, MutableRefObject } from 'react';
import { Link, useNavigate } from "react-router-dom";
import MapOfUsa from './world-map/map-of-usa';

const MainWeatherDisplayContainer = () => {
  const fetchCommunityLocationDataUrl = 'https://docs.openaq.org/v2/locations?limit=500&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&entity=community&dumpRaw=false';
  const fetchGovernmentLocationDataUrl = 'https://docs.openaq.org/v2/locations?limit=500&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&entity=government&dumpRaw=false';
  const fetchResearchLocationDataUrl = 'https://docs.openaq.org/v2/locations?limit=500&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&entity=research&dumpRaw=false';
  const airQualityData: MutableRefObject<{}> = useRef({});
  const [communityButton]: Array<boolean | Dispatch<SetStateAction<boolean>>> = useState(true);
  const [governmentButton]: Array<boolean | Dispatch<SetStateAction<boolean>>> = useState(true);
  const [researchButton]: Array<boolean | Dispatch<SetStateAction<boolean>>> = useState(true);

  const measurementDataForLocation: MutableRefObject<{}> = useRef({});
  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
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

  const getMeasurementData = async (locationId: number) => { 
    const getMeasurementDataForLocation = `https://docs.openaq.org/v2/locations?limit=100&page=1&offset=0&sort=desc&radius=1000&location_id=${locationId}&order_by=lastUpdated&dumpRaw=false`
    const res = await fetch(getMeasurementDataForLocation);
    const measurementData = res.json();
    measurementDataForLocation.current = measurementData;
    return measurementData;
  }

  let navigate = useNavigate(); 

  return (
    <div className="App">
      <h1>Main Weather Display</h1>
      <MapOfUsa airQualityData={airQualityData} getMeasurementData={getMeasurementData} measurementDataForLocation={measurementDataForLocation} navigate={navigate} />
    </div>
  );
}

export default MainWeatherDisplayContainer;
