import { render, screen } from '@testing-library/react';
import App from './App';
import { shallow, configure } from 'enzyme';
import MainWeatherDisplayContainer from './main-weather-display/main-weather-display-container';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// npm i -D --exact jest-watch-typeahead@0.6.5 was used as a workaround to run npm run test
describe('App', () => {
  it('renders', () => {
    shallow(<App />);
  });
});
