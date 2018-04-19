import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ChartModule from '../client/src/components/ChartModule';

const { mount } = Enzyme;
Enzyme.configure({ adapter: new Adapter() });

const sampleData = [
  {
    _id: 2,
    funded_at: '2004-09-01T00:00:00Z',
    funding_round_type: 'angel',
    funding_round_code: 'angel',
    raised_amount_usd: 500000,
    raised_amount: 500000,
    raised_currency_code: 'USD',
    pre_money_valuation_usd: null,
    pre_money_valuation: null,
    pre_money_currency_code: 'USD',
    post_money_valuation_usd: null,
    post_money_valuation: null,
    post_money_currency_code: 'USD',
    participants: 2,
    is_first_round: false,
    is_last_round: true,
    source_url: '',
    source_description: '',
    created_by: 'initial-importer',
    created_at: '2007-05-27T13:08:18Z',
    updated_at: '2013-06-29T03:07:23Z',
    company: 'Facebook',
  },
  {
    _id: 3,
    funded_at: '2005-05-01T00:00:00Z',
    funding_round_type: 'series-a',
    funding_round_code: 'a',
    raised_amount_usd: 12700000,
    raised_amount: 12700000,
    raised_currency_code: 'USD',
    pre_money_valuation_usd: 115000000,
    pre_money_valuation: 115000000,
    pre_money_currency_code: 'USD',
    post_money_valuation_usd: null,
    post_money_valuation: null,
    post_money_currency_code: 'USD',
    participants: 3,
    is_first_round: false,
    is_last_round: false,
    source_url: 'http://www.techcrunch.com/2007/11/02/jim-breyer-extra-500-million-round-for-facebook-a-total-fiction/',
    source_description: 'Jim Breyer: Extra $500 Million Round For Facebook A "Total Fiction"',
    created_by: 'initial-importer',
    created_at: '2007-05-27T13:09:10Z',
    updated_at: '2013-06-29T03:07:23Z',
    company: 'Facebook',
  },
  {
    _id: 4,
    funded_at: '2006-04-01T00:00:00Z',
    funding_round_type: 'series-b',
    funding_round_code: 'b',
    raised_amount_usd: 27500000,
    raised_amount: 27500000,
    raised_currency_code: 'USD',
    pre_money_valuation_usd: 525000000,
    pre_money_valuation: 525000000,
    pre_money_currency_code: 'USD',
    post_money_valuation_usd: null,
    post_money_valuation: null,
    post_money_currency_code: 'USD',
    participants: 4,
    is_first_round: false,
    is_last_round: false,
    source_url: 'http://www.facebook.com/press/info.php?factsheet',
    source_description: 'Facebook Funding',
    created_by: 'initial-importer',
    created_at: '2007-05-27T13:09:36Z',
    updated_at: '2013-06-29T03:07:24Z',
    company: 'Facebook',
  },
];

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
