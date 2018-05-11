const express = require('express');
const router = express.Router();
const fs = require('fs');
var http = require('http');
var download = require('download-pdf');

const Sequelize = require('sequelize');
const sequelize = require('../base/baza.js');
const Op = Sequelize.Op;

var PDFDokument = sequelize.import('../base/models/PDFDokument.js');

router.post('/', function(req, res) {
    var pdf = req.body.url;
    var fileName = generisiIme();
    var options = {
        directory : './pdfs',
        filename: fileName
    }

    download(pdf, options, function(err){
        if (err) throw err;
        PDFDokument.dodajDokument(req.body, './pdfs/' + fileName, function(success, data) {
            if (success) {
                res.end(JSON.stringify({
                    'success' : 'yes',
                    'pdfName' : fileName 
                }));
            }
            else {
                res.end(JSON.stringify({
                    'success' : null,
                    'message' : data
                }));
            }
        });
    }); 
});

generisiIme = function() {
    return ((new Date()).toString() + Math.floor((Math.random() * 100) + 1).toString()).replace(/[\., :, \s, (, ), +]/g,'') + '.pdf';
}

module.exports = router; 