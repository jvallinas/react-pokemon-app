import React from 'react';
import { shallow } from 'enzyme';
import useHttpRequest from '../useHttpRequest';

/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */

function HookWrapper(props) {
  const hook = props.hook ? props.hook() : undefined;
  return <div hook={hook} />;
}

describe('Data initialization', () => {
  test('response should be null on init', () => {
    const wrapper = shallow(<HookWrapper hook={() => useHttpRequest('http://example.com')} />);

    const { hook } = wrapper.find('div').props();
    const { response } = hook;
    expect(response).toEqual(null);
  });
  test('error should be null on init', () => {
    const wrapper = shallow(<HookWrapper hook={() => useHttpRequest('http://example.com')} />);

    const { hook } = wrapper.find('div').props();
    const { error } = hook;
    expect(error).toEqual(null);
  });
});
