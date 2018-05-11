const express = require('express');
const router = express.Router();
const fs = require('fs');
var http = require('http');

var download = require('download-pdf');

router.post('/', function(req, res) {
    var pdf = req.body.url;
    var fileName = generisiIme();
    var options = {
        directory : './pdfs',
        filename: fileName
    }

    download(pdf, options, function(err){
        if (err) throw err;
        res.end(JSON.stringify({
            'success' : 'yes',
            'pdfName' : fileName
        }));
    }); 
});

generisiIme = function() {
    return ((new Date()).toString() + Math.floor((Math.random() * 100) + 1).toString()).replace(/[\., :, \s, (, ), +]/g,'') + '.pdf';
}

module.exports = router; 