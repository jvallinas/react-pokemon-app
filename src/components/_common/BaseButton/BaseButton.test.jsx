import React from 'react';
import { mount } from 'enzyme';
import BaseButton from './BaseButton';

describe('Test Button component', () => {
  it('Test click event', () => {
    const mockCallBack = jest.fn();
    const buttonComponent = mount(<BaseButton label="Label" onClickHandler={mockCallBack} />);
    const button = buttonComponent.find('button').first();
    button.find('button').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
