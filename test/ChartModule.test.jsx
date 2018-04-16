import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ChartModule from '../client/src/components/ChartModule';

const { shallow } = Enzyme;

global.fetch = jest.fn(() => new Promise(resolve => resolve()));

Enzyme.configure({ adapter: new Adapter() });

describe('<ChartModule />', () => {
  test('expect Chart component to exist', () => {
    expect(ChartModule).toBeDefined();
  });

  test('renders canvas', () => {
    const wrapper = shallow(<ChartModule company="Facebook" />);
    const result = wrapper.find('canvas').length;
    expect(result).toBe(1);
  });
});
