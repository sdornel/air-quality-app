import { useState, useRef, useEffect, Dispatch, SetStateAction, MutableRefObject } from 'react';
import { Link, useNavigate } from "react-router-dom";
import WorldMap from './world-map/world-map';

const MainWeatherDisplayContainer = () => {
  const fetchCommunityLocationDataUrl = 'https://docs.openaq.org/v2/locations?limit=500&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&entity=community&dumpRaw=false';
  const fetchGovernmentLocationDataUrl = 'https://docs.openaq.org/v2/locations?limit=500&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&entity=government&dumpRaw=false';
  const fetchResearchLocationDataUrl = 'https://docs.openaq.org/v2/locations?limit=500&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&entity=research&dumpRaw=false';
  const airQualityData: MutableRefObject<{}> = useRef({});
  const [loading, setLoading]: Array<boolean | Dispatch<SetStateAction<boolean>>> = useState(false);

  const measurementDataForLocation: MutableRefObject<{}> = useRef({});
  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      let cJson;
      let gJson;
      let rJson;
      const results = [];

      const cData = await fetch(fetchCommunityLocationDataUrl);
      cJson = await cData.json();
      results.push(...cJson.results);

      const gData = await fetch(fetchGovernmentLocationDataUrl);
      gJson = await gData.json();
      results.push(...gJson.results);

      const rData = await fetch(fetchResearchLocationDataUrl);
      rJson = await rData.json();
      results.push(...rJson.results);

      airQualityData.current = [...results]
    }
    fetchData();

  }, []);

  const getMeasurementData = async (locationId: number) => { 
    const getMeasurementDataForLocation = `https://docs.openaq.org/v2/locations?limit=100&page=1&offset=0&sort=desc&radius=1000&location_id=${locationId}&order_by=lastUpdated&dumpRaw=false`
    const res = await fetch(getMeasurementDataForLocation);
    const measurementData = res.json();
    measurementDataForLocation.current = measurementData;
    return measurementData;
  }

  let navigate = useNavigate();

  const onLoad = () => {
    console.log('got here');
    // debugger
    // loading = true;
    setLoading(true);
  }

  if (loading) {
    return (
      <div>
        <h1>
          LOADING SCREEN
        </h1>
      </div>
    )
  } else {
    return (
      <div className="App">
        <h1>Main Weather Display</h1>
        <WorldMap airQualityData={airQualityData} getMeasurementData={getMeasurementData} measurementDataForLocation={measurementDataForLocation} navigate={navigate} onLoad={onLoad} />
      </div>
    );

  }

}

export default MainWeatherDisplayContainer;
