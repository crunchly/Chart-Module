import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ChartModule from '../client/src/components/ChartModule';
import sampleData from '../db/__mockData__/mockData';

const { mount } = Enzyme;
Enzyme.configure({ adapter: new Adapter() });

global.fetch = jest.fn(() => new Promise((resolve) => {
  const responseDummy = {};
  responseDummy.json = function getDummyJsonObj() {
    return sampleData;
  };

  return resolve(responseDummy);
}));

describe('<ChartModule />', () => {
  test('expect Chart component to exist', () => {
    expect(ChartModule).toBeDefined();
  });

  test('renders canvas', () => {
    const wrapper = mount(<ChartModule company="Facebook" />);
    const result = wrapper.find('canvas').length;
    expect(result).toBe(1);
  });

  test('handleClick should toggle hidden state', () => {
    const wrapper = mount(<ChartModule company="Facebook" />);
    wrapper.instance().handleClick();

    const result = wrapper.state('hidden');
    expect(result).toBe(true);
  });

  test('fetchData should return a promise with json data', () => {
    const wrapper = mount(<ChartModule company="Facebook" />);
    const promise = wrapper.instance().fetchData();

    return promise.then(data => expect(data).toEqual(sampleData));
  });

  test('handleKeyDown should add chart-module__canvas-wrap--hidden class to char', () => {
    const wrapper = mount(<ChartModule company="Facebook" />);
    wrapper.instance().handleKeyDown({ keyCode: 13 });
    wrapper.update();

    const result = wrapper.find('.chart-module__canvas-wrap--hidden').length;
    expect(result).toBe(1);
  });
});
