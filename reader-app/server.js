const express = require('express');
const app = express();
const routes = express.Router();

const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');

var OnlinePdf = require('./routes/OnlinePdf'),
    UploadLocal = require('./routes/UploadLocal.js'),
    PdfToClient = require('./routes/PdfToClient'),
    Documents = require('./routes/Documents'),
    savePDF = require('./routes/savePDF'), //dodana ruta za spremanje putem mobilne aplikacije
    savePdfToMobile = require('./routes/savePdfToMobile'),
    Login = require('./routes/Login'),
    Logout = require('./routes/Logout'),
    ListPDF = require('./routes/ListPDF');
	var saveHighlight = require('./routes/saveHighlight');
var currentDir = require('./routes/currentDir');
var returnHighlights = require('./routes/returnHighlights');
var numberH = require('./routes/numberH');
var archiveText = require('./routes/archiveText');
var ArchiveQuotes = require('./routes/ArchiveQuotes');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'Mk9292iksk9e9e9edj1jkdikL',
    resave: true,
    saveUninitialized: true
}));

app.use('/downloadOnline', OnlinePdf);
app.use('/pdfToClient', PdfToClient);
app.use('/savePDF', savePDF); // ruta za spremanje sa mobilne aplikacije
app.use('/documents', Documents);
app.use('/login', Login);
app.use('/logout', Logout);
app.use('/listPDF', ListPDF);
app.use('/savePdfToMobile', savePdfToMobile);
app.use('/uploadLocal', UploadLocal);
app.use('/saveHighlight', saveHighlight);
app.use('/currentDir', currentDir);
app.use('/returnHighlights', returnHighlights);
app.use('/numberH', numberH);
app.use('/archiveText', archiveText);
app.use('/archiveQuotes', ArchiveQuotes);


app.get('/proba', function (req, res) {
    res.end(JSON.stringify({ 'poruka': 'Uspješno je!' }));
});



app.listen(5000);
console.log("Uspjesno pokrenuta stranica na portu 5000");
