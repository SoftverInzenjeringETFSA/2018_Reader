const express = require('express');
const router = express.Router();
const fs = require('fs');
var http = require('http');
var download = require('download-pdf');
const multer = require('multer');
var upload = multer({ dest: 'pdfs/' });

//const KorisnikSchema = require('../base/models/Korisnik.js');
var PDFDokumentSchema = require('../base/models/PDFDokument.js');

router.post('/', upload.single('file'), function(req, res) {

    if (req.session.korisnik && req.session.korisnik == req.body.sesija) {
        dokument = req.body;
        var _dokument = {
            ime : dokument.ime,
            opis : dokument.opis,
            direktorij : './pdfs/' + req.file.filename,
            datum_uploada : new Date(),
            datum_posljednjeg_citanja : new Date(),
            korisnikId : dokument.korisnikId
        };

        PDFDokumentSchema.collection.insert(_dokument, {}, function(err, ress) {
            if (!err) 
                res.end(JSON.stringify({
                    'success' : 'yes',
                    'pdfName' : req.file.filename,
                    'dir' : _dokument.direktorij 
                }));
            else    
                res.end(JSON.stringify({
                    'success' : null,
                    'message' : err
                }));
        });
    }
    else {
        res.end(JSON.stringify({
            'success' :null,
            'data' : 'Access denied.'
        }))
    }
});

module.exports = router;