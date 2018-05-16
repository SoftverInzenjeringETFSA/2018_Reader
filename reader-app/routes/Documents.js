const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');


//const KorisnikSchema = require('../base/models/Korisnik.js');
var PDFDokumentSchema = require('../base/models/PDFDokument.js');

router.get('/', function(req, res) {
    PDFDokumentSchema.collection.find({
        korisnikId : mongoose.Types.ObjectId(req.query.id)
    }).toArray(function(err, result) {
        if (err) res.end(JSON.stringify({'success' : null, 'data' : err}));
        res.end(JSON.stringify({'success' : 'yes', 'data' : result}));
    });
});





module.exports = router; 