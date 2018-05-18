const express = require('express');
const router = express.Router();
const fs = require('fs');
var http = require('http');

router.get('/', function(req, res) {
    var pdfName = req.query.dir;//'./pdfs/' + req.query.pdfName;
    fs.writeFile('currentDir.txt', req.query.dir, (err) => {
  if (err) throw err;
  //console.log('The file has been saved!');
});
    fs.readFile(pdfName, function (error,data){
        res.contentType("application/pdf");
        res.send(data);
    });
});


module.exports = router;
