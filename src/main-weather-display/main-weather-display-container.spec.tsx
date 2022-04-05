import { render, screen } from '@testing-library/react';
import { shallow, configure } from 'enzyme';
import MainWeatherDisplayContainer from './main-weather-display-container';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import * as React from 'react';
import WorldMap from './world-map/world-map';

configure({ adapter: new Adapter() });

describe('MainWeatherDisplayContainer', () => {

    beforeEach(() => {
        // jest.spyOn(React, "useEffect").getMockImplementation();
    });

    // const mockedUsedNavigate = jest.fn();

    // jest.mock('react-router-dom', () => ({
    // ...jest.requireActual('react-router-dom') as any,
    // useNavigate: () => mockedUsedNavigate,
    // }));
    // useNavigate = jest.fn();
    let component = <BrowserRouter><MainWeatherDisplayContainer /></BrowserRouter>;
    const mUseRef = jest.fn();
  it('renders', () => {
    expect(shallow(component).length).toEqual(1);
  });

  describe('data loading', () => {
    it('renders loading screen', async () => {

    });
  });
});
