const mysql = require('mysql');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request')
const https = require('https');

const PORT = process.env.PORT || 5000;
const mailChimpApiCred = {
  user: "xxx",
  key: "xxx",
  listId: "xxx",
  dataCenter: "xxx",
  url: ""
}

express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/contact', (req, res) => {
    const contactData = req.body;

    const endpoint = 'https://' + mailChimpApiCred.dataCenter + '.api.mailchimp.com/3.0/lists/' + mailChimpApiCred.listId + '/members/';
    const base64encodedData = new Buffer(mailChimpApiCred.user + ':' + mailChimpApiCred.key).toString('base64');
    const dataBody = {
      status: "subscribed",
      emailAddress: contactData.email,
      merge_fields: {
        FNAME: contactData.firstName,
        LNAME: contactData.lastName,
        PHONE: contactData.phone
      },
      interests: {
        title: contactData.need
      }
    };

    const dataString =  JSON.stringify(dataBody);
    const options = {
      hostname: endpoint,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': dataString.length,
        'Authorization': 'Basic ' + base64encodedData
      }
    };
    
    console.log('Making a request with this data:', dataString);
    console.log('Making a request with these options:', options);

    const httpsReq = https.request(options, httpsRes => {
      console.log(`statusCode: ${httpsRes.statusCode}`);
    
      let body = '';

      httpsRes.on('data', d => {
        console.log('Res return value:', d);
        
        body += d;
        // process.stdout.write(d);
      });

      httpsRes.on('end', () => {
        console.log('Body of data:', body.length);
        httpsRes.statusCode != 200 ? console.log('API call failed:', httpsRes.statusCode) : console.log('API call successful:', httpsRes.statusCode);
      });
    });

    httpsReq.on('error', error => {
      console.error(error);
    });
    
    httpsReq.write(dataString);
    httpsReq.end();

    res.send(JSON.stringify({
      data_body: req.body
    }));

    console.log('you posted:', req.body);

  }).listen(PORT, () => console.log(`Listening on ${ PORT }`));
