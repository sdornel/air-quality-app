import React from 'react'
import shallow from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { cleanup, render, screen } from '@testing-library/react';
import Checkboxes from './checkboxes';

describe('Checkboxes', () => {
  beforeEach(cleanup)
  describe('community', () => {
    it('renders community text and input button', async () => {
      render(<Checkboxes />);
      const communityText = screen.queryByText('Community');
      expect(communityText).toBeVisible();
      
      const communityButton = await screen.findByTitle('community-button');
      expect(communityButton).toBeInTheDocument();
    });
  });

  describe('research', () => {
    it('renders research text and input button', async () => {
      render(<Checkboxes />);
      const researchText = screen.queryByText('Research');
      expect(researchText).toBeVisible();
      
      const researchButton = await screen.findByTitle('research-button');
      expect(researchButton).toBeInTheDocument();
    });
  });

  describe('government', () => {
    it('renders government text and input button', async () => {
      render(<Checkboxes />);
      const governmentText = screen.queryByText('Government');
      expect(governmentText).toBeVisible();
      
      const governmentButton = await screen.findByTitle('government-button');
      expect(governmentButton).toBeInTheDocument();
    });
  });
});