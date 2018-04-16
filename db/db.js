const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/front_end_capstone');

module.exports = mongoose.connection;
