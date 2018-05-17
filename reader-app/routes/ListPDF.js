const express = require('express');
const router = express.Router();
const fs = require('fs');
var http = require('http');
var dokument = require('../base/models/PDFDokument.js')

router.get('/', function(req, res){
  var lista = [];
  fs.readdirSync('./pdfs', (err, files) => {
    files.forEach(file => {
      lista.push(file);
    });
    res.send(lista);
  });
});

module.exports = router;
