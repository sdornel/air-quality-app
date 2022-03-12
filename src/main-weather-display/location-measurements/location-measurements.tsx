import { useLocation } from "react-router-dom";

const LocationMeasurements = (props: any) => {
  const { state } = useLocation();
  console.log(state);
  // TODO: make graphs to show data
  // make cards with all the data for each individual measurement
  // make a back button to go back to main page
  // either at a page level or within one of the visual representations, 
  // build or incorporate a selection tool to filter and further analyze the data
  return (
    <div className="location-measurements">
      <div className="route-metric-row">
        <h4 className="row-title">Route #</h4>
      </div>
      <div className="route-metric-row">
        <h4 className="row-title">Route Type</h4>
      </div>
    </div>
  )
}

export default LocationMeasurements;