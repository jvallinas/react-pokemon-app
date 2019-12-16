import React from 'react';
import { shallow } from 'enzyme';
import Overview from './Overview';
import OverviewStep from './elements/OverviewStep';
import BaseButton from '../_common/BaseButton/BaseButton';

// Workaround for useHistory since react-router context isn't set in this component
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

const mockTitle = 'Welcome to React Pokemon app';
const mockSubtitle = 'An app for learning React';

describe('Layout rendering in Overview page', () => {
  it('Renders correct number of button elements', () => {
    const wrapper = shallow(<Overview title={mockTitle} subtitle={mockSubtitle} />);
    expect(wrapper.find(BaseButton).length).toEqual(2);
  });

  it('Renders correct number of Step items', () => {
    const wrapper = shallow(<Overview title={mockTitle} subtitle={mockSubtitle} />);
    expect(wrapper.find(OverviewStep).length).toEqual(3);
  });
});
