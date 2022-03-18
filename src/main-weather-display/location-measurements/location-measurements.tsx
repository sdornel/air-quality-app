import { useLocation, Link } from "react-router-dom";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import './location-measurements.css';

const LocationMeasurements = (props: any) => {
  const { state }: any = useLocation();
  console.log(state);

  const data: any[] = [];
  state.measurementData.results[0].parameters.forEach((param: any) => {
    if (param.unit === 'µg/m³') {
      data.push({ name: param.displayName, uv: param.average, pv: 2400, amt: 2400 })
    }
  });

  return (
    <div className="location-measurements-div">
      <Link to="/"><button>Back</button></Link>
      <h2 className="location-measurements-title">Measurements for Location</h2>
      {state.measurementData.results[0].parameters.map((measurement: any, index: any) => {
        return (
          <div key={index}>
            <p>Unit: {measurement.unit}</p>
            <p>Parameter: {measurement.parameter}</p>
            <p>Display Name: {measurement.displayName}</p>
            <p>Last Value: {measurement.lastValue}</p>
            <span>---------------------------------</span>
          </div>
        )
      })}
      <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  )
}

export default LocationMeasurements;