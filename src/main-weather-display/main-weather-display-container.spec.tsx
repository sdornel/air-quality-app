import { render, screen } from '@testing-library/react';
import { shallow, configure } from 'enzyme';
import MainWeatherDisplayContainer from './main-weather-display-container';
import onLoad from "./main-weather-display-container";
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
        shallow(component);
        // onLoad();
        // const setLoading = jest.fn();
        // const useStateSpy = jest.spyOn(React, 'useState');
        // useStateSpy.mockImplementation((loading) => [loading, setLoading]);
        // React.useState = jest.fn();
        // jest
        //     .spyOn(React, 'useState') 
        //     .mockImplementationOnce(() => [setLoading, () => null])
        // // Cache original functionality
        // const realUseState = React.useState

        // // Stub the initial state
        // const stubInitialState = false;

        // // Mock useState before rendering your component
        // jest
        // .spyOn(React, 'useState')
        // .mockImplementationOnce(() => realUseState(stubInitialState));       
            
        const mockSetState = jest.fn();

        jest.mock('react', () => ({
            useState: initial => [initial, mockSetState]
          }));

        const loadingText = screen.queryByText('Loading. Please wait.');
        expect(loadingText).toBeVisible();
    });
  });
});
