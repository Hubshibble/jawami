const mysql = require('mysql');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request')
const https = require('https');

const PORT = process.env.PORT || 5000;
const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "xxx",
  database: "xxx",
  port: 3306,
  multipleStatements: true
});
mysqlConnection.connect((err) => {
  if(!err) console.log("MySQL connection created successfully");
  else console.log("MySQL connection failed\n", err);
});

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/contact', (req, res) => {
    const contactData = req.body;

    res.send(JSON.stringify({
      data_body: contactData
    }));

    console.log('you posted:', req.body);

  }).listen(PORT, () => console.log(`Listening on ${ PORT }`));
