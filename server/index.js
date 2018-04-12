const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();

// Middleware
app.use(morgan('tiny'));

// Static
app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.listen(3001, () => console.log('server listening on port 3001...'));
