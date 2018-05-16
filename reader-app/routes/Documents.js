const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');


//const KorisnikSchema = require('../base/models/Korisnik.js');
var PDFDokumentSchema = require('../base/models/PDFDokument.js');

router.get('/', function(req, res) {
    if (req.session.korisnik == req.query.sesija) {
        
        var doc = PDFDokumentSchema.collection.find({
            korisnikId : req.query.id
        });
        if (doc)
            doc.toArray(function(err, result) {
            if (err) res.end(JSON.stringify({'success' : null, 'data' : err}));
            res.end(JSON.stringify({'success' : 'yes', 'data' : result}));
        });
    }
    else   
        res.end(JSON.stringify({
            'success' : null,
            'data' : 'Access denied.'
        }));
});

module.exports = router; 