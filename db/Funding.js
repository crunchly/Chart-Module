const mongoose = require('mongoose');
const connection = require('./db.js');

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

const Funding = connection.model('Funding', fundingSchema);

const typeByAmount = (company, model = Funding) => (
  model.aggregate([
    {
      $match: { company },
    },
    {
      $group: {
        _id: { funding_round_type: '$funding_round_type' },
        totalAmt: { $sum: '$raised_amount_usd' },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ])
);

module.exports.Model = Funding;
module.exports.schema = fundingSchema;
module.exports.typeByAmount = typeByAmount;

