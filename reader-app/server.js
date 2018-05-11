const express = require('express');
const app = express(); 
const routes = express.Router();

const bodyParser = require('body-parser'); 
const fs = require('fs'); 

var OnlinePdf = require('./routes/OnlinePdf');
var PdfToClient = require('./routes/PdfToClient');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/downloadOnline', OnlinePdf);
app.use('/pdfToClient', PdfToClient);


app.get('/proba', function(req, res) {
    res.end(JSON.stringify({'poruka' : 'Uspješno je!'}));
});



app.listen(5000);