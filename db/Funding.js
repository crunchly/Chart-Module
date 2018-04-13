const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/front_end_capstone');

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
  company: String,
});

const Funding = mongoose.model('Funding', fundingSchema);

const typeByAmount = () => {

};

module.exports.Funding = Funding;
module.exports.typeByAmount = typeByAmount;
