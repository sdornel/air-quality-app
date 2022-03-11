import { useLocation } from "react-router-dom";

const LocationMeasurements = (props: any) => {
  console.log('props', props);
  const { state } = useLocation();
  console.log(state);
  // debugger
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