/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const Funding = require('../db/Funding.js');

const app = express();

// Middleware
app.use(morgan('tiny'));

// Dynamic
app.get('/funding-rounds/:company', (req, res) => {
  Funding.typeByAmount(req.params.company)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(404);
    });
});

// Static
app.use('/', express.static(path.join(__dirname, '../client/dist')));

module.exports = app;
