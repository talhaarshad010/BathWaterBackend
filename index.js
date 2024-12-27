/** @format */

const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

require('./src/config/db');
app.get('/', (req, res) => {
  res.send('BathWater is running Ok');
});

app.use('/', require('./src/Routes/User.Routes'));
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
