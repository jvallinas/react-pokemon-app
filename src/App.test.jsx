import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';

import App from './App';
import { Overview, Selection } from './views';

describe('Basic tests', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });
});

describe('Views rendered for each route', () => {
  it('Root path should render Overview component', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    expect(wrapper.find(Overview)).toHaveLength(1);
    expect(wrapper.find(Selection)).toHaveLength(0);
  });

  it('Selection path should render Selection component', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/selection']}>
        <App />
      </MemoryRouter>,
    );
    expect(wrapper.find(Overview)).toHaveLength(0);
    expect(wrapper.find(Selection)).toHaveLength(1);
  });

  it('Invalid path should not show any of the views', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/invalid']}>
        <App />
      </MemoryRouter>,
    );
    expect(wrapper.find(Overview)).toHaveLength(0);
    expect(wrapper.find(Selection)).toHaveLength(0);
  });
});
