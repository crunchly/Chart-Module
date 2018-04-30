import mongoose from 'mongoose';
import Funding from '../db/Funding';
import sampleData from '../db/__mockData__/mockData';

const fundingModel = mongoose.model('TestFunding', Funding.schema);

describe('Funding Model', () => {
  beforeAll(() => fundingModel.create(sampleData));

  afterAll(() => (
    mongoose.connection.dropCollection('testfundings')
      .then(() => mongoose.disconnect())
  ));

  test('typeByAmount should return a list of funding_round_type with summed raised_amount_usd', () => (
    Funding.typeByAmount('Facebook', fundingModel)
      .then((data) => {
        expect(data[0]._id.funding_round_type).toBe('angel');
        expect(data[0].totalAmt).toBe(500000);
      })
  ));
});
