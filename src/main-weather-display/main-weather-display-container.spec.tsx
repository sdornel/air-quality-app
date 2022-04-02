import { render, screen } from '@testing-library/react';
import { shallow, configure } from 'enzyme';
import MainWeatherDisplayContainer from './main-weather-display-container';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import React, { useRef } from 'react';

configure({ adapter: new Adapter() });

describe('MainWeatherDisplayContainer', () => {

    beforeAll(() => {
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

  describe('fetchData()', () => {
      // just check if function runs properly on component init
    it('returns a promise of undefined', () => {
        
    });
  });
});
