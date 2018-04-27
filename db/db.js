const mongoose = require('mongoose');

const attemptConnection = () => (
  mongoose.connect('mongodb://mongodb/front_end_capstone')
    .catch(() => mongoose.connect('mongodb://localhost/front_end_capstone'))
);

attemptConnection()
  .catch(() => setTimeout(attemptConnection, 1000));

module.exports = mongoose.connection;
