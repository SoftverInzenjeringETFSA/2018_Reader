const express = require('express');
const router = express.Router();
const fs = require('fs');
var http = require('http');
var download = require('download-pdf');

//const KorisnikSchema = require('../base/models/Korisnik.js');
var PDFDokumentSchema = require('../base/models/PDFDokument.js');

router.post('/', function(req, res) {
    console.log(req.session.korisnik+'\n' + req.body.sesija);
    if (req.session.korisnik = req.body.sesija) {
        var pdf = req.body.url;
        var fileName = generisiIme();
        var options = {
            directory : './pdfs',
            filename: fileName
        }
        var dokument = req.body;
        download(pdf, options, function(err){
            if (err) throw err;
            var _dokument = {
                ime : dokument.ime,
                opis : dokument.opis,
                direktorij : './pdfs/' + fileName,
                datum_uploada : new Date(),
                datum_posljednjeg_citanja : new Date(),
                korisnikId : dokument.korisnikId // id korisnika
                //korisnikId : korisnik._id
            }
            PDFDokumentSchema.collection.insert(_dokument, {}, function(err, ress) {
                if (!err) 
                    res.end(JSON.stringify({
                        'success' : 'yes',
                        'pdfName' : fileName,
                        'dir' : _dokument.direktorij 
                    }));
                else    res.end(JSON.stringify({
                        'success' : null,
                        'message' : err
                    }));
            });
        
        }); 
    }
    else 
        res.end(JSON.stringify({
            'success' :null,
            'data' : 'Access denied.'
        }))
});

generisiIme = function() {
    return ((new Date()).toString() + Math.floor((Math.random() * 100) + 1).toString()).replace(/[\., :, \s, (, ), +]/g,'') + '.pdf';
}

module.exports = router; 