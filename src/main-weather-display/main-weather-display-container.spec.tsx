import { render, screen } from '@testing-library/react';
import { shallow, configure } from 'enzyme';
import MainWeatherDisplayContainer from './main-weather-display-container';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter, useNavigate } from 'react-router-dom';

configure({ adapter: new Adapter() });

describe('MainWeatherDisplayContainer', () => {

    // const mockedUsedNavigate = jest.fn();

    // jest.mock('react-router-dom', () => ({
    // ...jest.requireActual('react-router-dom') as any,
    // useNavigate: () => mockedUsedNavigate,
    // }));
    // useNavigate = jest.fn();


  it('renders', () => {
    expect(shallow(
        <BrowserRouter>
            <MainWeatherDisplayContainer />
        </BrowserRouter>
    ).length).toEqual(1);
  });

  describe('', () => {
    it('', () => {
        // expect();
    });
  });
});
