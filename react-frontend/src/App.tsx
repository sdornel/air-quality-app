import './App.css';
import { BrowserRouter, Link } from "react-router-dom";
import MainWeatherDisplayContainer from './main-weather-display/main-weather-display-container';
import LocationMeasurements from './main-weather-display/location-measurements/location-measurements';
import React from 'react';

function App() {
  return (
    <div className="App">
      <MainWeatherDisplayContainer/>
    </div>
  );
}

export default App;
// export default withRouter(App);
