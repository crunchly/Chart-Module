const path = require('path');
const express = require('express');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(morgan('tiny'));

// Dynamic
app.get('/funding-rounds/', (req, res) => {
  res.send('hello!');
});

// Static
app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.listen(3001);
