const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const contactRoute = require('./routes/contact');

const PORT = process.env.PORT || 80;

const app = express();
app.use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use('/contact', contactRoute)
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
