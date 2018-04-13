const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/front_end_capstone');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  const fundingSchema = mongoose.Schema({ 
    _id: Number,
    funded_at: Date,
    funding_round_type: String,
    funding_round_code: String,
    raised_amount_usd: Number,
    raised_amount: Number,
    raised_currency_code: String,
    pre_money_valuation_usd: Number,
    pre_money_valuation: Number,
    pre_money_currency_code: String,
    post_money_valuation_usd: Number,
    post_money_valuation: Number,
    post_money_currency_code: String,
    participants: Number,
    is_first_round: Boolean,
    is_last_round: Boolean,
    source_url: String,
    source_description: String,
    created_by: String,
    created_at: Date,
    updated_at: Date,
    company: String
  });

  const Funding = mongoose.model('Funding', fundingSchema);
  

  fs.readFile(path.join(__dirname, 'funding_rounds.json'), (err, data) => {
    let fundings = [];

    data = JSON.parse(data.toString());
    data.slice(0, 200).forEach(round => {
      round.company = round.name;
      round._id = round.funding_round_id;
      delete round.name;
      delete round.funding_round_id;
      delete round.object_id;

      Object.keys(round).forEach(key => {
        round[key] = round[key] === 'NULL' ? '' : round[key];
      });
      
      process.stdout.write('Loading ' + round._id + ' \r');

      const funding = new Funding(round);
      fundings.push(funding);
    });

    Funding.create(fundings, (err) => {
      console.log('\ndone');
      mongoose.disconnect();
      process.exit();
    });
  });
});
