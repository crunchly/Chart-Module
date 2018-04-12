const express = require('express');
const morgan = require('morgan');
const app = express();

// Middleware
app.use(morgan('tiny'));

// Static
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('server listening on port 3001...'));
