const fs = require('fs');
const path = require('path');
const db = require('./db.js');
const { Funding } = require('./Funding.js');

fs.readFile(path.join(__dirname, 'funding_rounds.json'), (err, data) => {
  const fundings = [];

  data = JSON.parse(data.toString());
  data.slice(0, 200).forEach((round) => {
    round.company = round.name;
    round._id = round.funding_round_id;
    delete round.name;
    delete round.funding_round_id;
    delete round.object_id;

    Object.keys(round).forEach((key) => {
      round[key] = round[key] === 'NULL' ? '' : round[key];
    });

    process.stdout.write(`Loading ${round._id} \r`);

    const funding = new Funding(round);
    fundings.push(funding);
  });

  Funding.create(fundings, () => {
    process.stdout.write('\ndone\n');
    db.close();
    process.exit();
  });
});
