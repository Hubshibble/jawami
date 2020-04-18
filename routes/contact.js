const express = require('express');
const Router = express.Router();
const dbConnection = require('../dbConnection');

Router.get('/', (req, res) => {
    console.log('I have been routed to /contact');
    dbConnection.query('SELECT * FROM Contact', (err, rows, fields) => {
        if (!err) {
            console.log('I got the DB data', rows);
            res.send();
        } else {
            console.log(err);
        }
    });
});

Router.post('/', (req, res) => {
    console.log('Making a POST request', req.body);
    const body = req.body;
    const contactData = { FNAME: body.firstName, LNAME: body.lastName, EMAIL: body.email, PHONE: body.phone };
    const companyData = { NAME: body.company, FIELD: body.industry };
    const requestData = { NEED: body.need, CASH: body.budget, MORE: body.details };
    const user = "Web";
    const newContactId = dbConnection.query(`INSERT INTO JawamiDB.Contact (FirstName, LastName, Email, Phone, CreatedBy, ModifiedBy) VALUES ("${contactData.FNAME}", "${contactData.LNAME}", "${contactData.EMAIL}", "${contactData.PHONE}", "${user}", "${user}"); SELECT LAST_INSERT_ID();`,
        (err, rows, fields) => !err ? res.send(rows) : console.log(err)
    );
    const newCompanyId = dbConnection.query(`INSERT INTO JawamiDB.Company (ContactId, Name, Industry, CreatedBy, ModifiedBy) VALUES ("${newContactId}", "${companyData.NAME}", "${companyData.FIELD}", "${user}", "${user}"); SELECT LAST_INSERT_ID();`,
        (err, rows, fields) => !err ? res.send(rows) : console.log(err)
    );
    const newInquiryId = dbConnection.query(`INSERT INTO JawamiDB.Inquiry (ContactId, CompanyId, Service, Budget, Details, CreatedBy, ModifiedBy) VALUES ("${newContactId}", "${newCompanyId}", "${requestData.NEED}", "${requestData.CASH}", "${requestData.MORE}", "${user}", "${user}"); SELECT LAST_INSERT_ID();`,
        (err, rows, fields) => !err ? res.send(rows) : console.log(err)
    );

    console.log('new Contact Id:', newContactId);
    console.log('new Company Id:', newCompanyId);
    console.log('new Inquiry Id:', newInquiryId);
});

module.exports = Router;
