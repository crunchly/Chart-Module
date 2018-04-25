const mongoose = require('mongoose');

mongoose.connect('mongodb://mongodb/front_end_capstone')
  .catch(() => mongoose.connect('mongodb://localhost/front_end_capstone'))

module.exports = mongoose.connection;
