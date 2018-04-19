import sampleData from '../__mockData__/mockData';

const typeByAmount = (company) => {
  if (company === 'Facebook') {
    return new Promise(resolve => resolve(sampleData));
  }
  return Promise.reject();
};

module.exports.typeByAmount = typeByAmount;
