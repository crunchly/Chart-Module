import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ChartModule from '../client/src/components/ChartModule';

const { mount } = Enzyme;

Enzyme.configure({ adapter: new Adapter() });

describe('<ChartModule />', () => {
  test('expect Chart component to exist', () => {
    expect(ChartModule).toBeDefined();
  });

  test('renders canvas', () => {
    const wrapper = mount(<ChartModule />);
    const result = wrapper.find('canvas').length;
    expect(result).toBe(1);
  });
});
