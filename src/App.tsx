import './App.css';
// import { Route, Switch, withRouter } from "react-router-dom";
import { BrowserRouter, Link } from "react-router-dom";
import MainWeatherDisplayContainer from './main-weather-display/main-weather-display-container';
import LocationMeasurements from './main-weather-display/location-measurements/location-measurements';

function App() {
  return (
    <div className="App">
      <h1>App loads!</h1>
      <MainWeatherDisplayContainer/>
      <Link to="/measurements/:locationId">Measurement Data</Link> |{" "}
      <LocationMeasurements />  
      {/* <Switch>
        <Route path="/measurements/:locationId" />
      </Switch> */}
    </div>
  );
}

export default App;
// export default withRouter(App);
