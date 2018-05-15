const express = require('express');
const app = express(); 
const routes = express.Router();

const bodyParser = require('body-parser'); 
const fs = require('fs'); 

var OnlinePdf = require('./routes/OnlinePdf');
var PdfToClient = require('./routes/PdfToClient');
var savePDF = require('./routes/savePDF'); //dodana ruta za spremanje putem mobilne aplikacije

//const Sequelize = require('sequelize');
//const sequelize = require('./base/baza.js');
//const mongo = require('./base/mongobase.js');
//const PDFDokumentSchema = require('./base/models/PDFDokument.js');

//const Op = Sequelize.Op;

//const { PDFDokument, Korisnik } = sequelize.import('./base/models/Models.js');


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/downloadOnline', OnlinePdf);
app.use('/pdfToClient', PdfToClient);
app.use('/savePDF',savePDF); // ruta za spremanje sa mobilne aplikacije


app.get('/proba', function(req, res) {
    res.end(JSON.stringify({'poruka' : 'Uspješno je!'}));
});



app.listen(5000);