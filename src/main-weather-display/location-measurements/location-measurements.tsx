import { useLocation, Link } from "react-router-dom";
import './location-measurements.css'

const LocationMeasurements = (props: any) => {
  const { state }: any = useLocation();
  console.log(state);
  // TODO: 
  // make graphs to show data
  // make cards with data for each individual measurement DONE
  // make a back button to go back to main page DONE
  // either at a page level or within one of the visual representations, 
  // build or incorporate a selection tool to filter and further analyze the data

  // const measurementData = await props.getMeasurementData(selectedLocationId.current);
  // props.navigateToMeasurements(`/measurements/${Number(selectedLocationId.current)}`, {
  //   state: {
  //     measurementData
  //   },

  return (
    <div className="location-measurements-div">
      <Link to="/"><button>Back</button></Link>
      <h2 className="location-measurements-title">Measurements for Location</h2>
      {state.measurementData.results[0].parameters.map((measurement: any, index: any) => {
        return (
          <div key={index}>
            <p>Unit: {measurement.unit}</p>
            <p>Last Value: {measurement.parameter}</p>
            <p>Last Value: {measurement.displayName}</p>
            <p>Last Value: {measurement.lastValue}</p>
            <span>---------------------------------</span>
          </div>
        )
      })}
    </div>
  )
}

export default LocationMeasurements;