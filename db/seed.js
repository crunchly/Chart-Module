const mongoose = require('mongoose');
const funding = require('./Funding.js');
const data = require('./funding_rounds.json');

const fundings = [];

data.forEach((round) => {
  const modRound = { ...round };
  if (round.funding_round_id !== undefined) {
    modRound.company = round.name;
    modRound._id = round.funding_round_id;
    delete modRound.name;
    delete modRound.funding_round_id;
    delete modRound.object_id;

    Object.keys(modRound).forEach((key) => {
      modRound[key] = modRound[key] === 'NULL' ? '' : modRound[key];
    });

    process.stdout.write(`Loading ${modRound._id} \r`);

    const newFunding = new funding.Model(modRound);
    fundings.push(newFunding);
  }
});

funding.Model.create(fundings, () => {
  process.stdout.write('\ndone\n');
  mongoose.disconnect();
  process.exit();
});
