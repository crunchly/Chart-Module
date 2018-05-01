const mongoose = require('mongoose');

const mongoUri = process.env.NODE_DB || 'mongodb://localhosta/front_end_capstone';
const maxTries = 3;
const tryInterval = 1000;

let tries = 1;
const retryOnErr = (err) => {
  if (tries <= maxTries) {
    setTimeout(() => {
      tries += 1;
      mongoose.connect(mongoUri)
        .catch(retryOnErr);
    }, tryInterval);
  } else {
    throw err;
  }
};

mongoose.connect(mongoUri)
  .catch(retryOnErr);

module.exports = mongoose.connection;
