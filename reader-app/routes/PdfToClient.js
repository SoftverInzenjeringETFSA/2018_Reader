const express = require('express');
const router = express.Router();
const fs = require('fs');
var http = require('http');

router.get('/', function(req, res) {
    var pdfName = './pdfs/' + req.query.pdfName;
    fs.readFile(pdfName, function (error,data){
        res.contentType("application/pdf");
        res.send(data);
    });
});

module.exports = router;
