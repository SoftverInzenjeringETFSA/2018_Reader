/*
    Ruta koja prima json file i iz njega uzima podatke i dodaje ih u bazu podataka
*/
const express = require('express');
const router = express.Router();
const fs = require('fs');
var http = require('http');
var dokument = require('../base/models/PDFDokument.js')


router.post('/', function(req,res)
{
    //dodati funkciju za dodijeljivanje random naziva
    var direktoriji_novi_naziv = './pdfs/' + generisiIme();
   
    
    var novi_dokument = new dokument({
            
        ime: req.body.ime,
        opis: req.body.opis,
        direktoriji: direktoriji_novi_naziv,
        datum_uploada: Date.now,
        datum_posljednjeg_citanja: Date.now
        /*
            korisnikId: req.body.id
            Kad kolege zavrse svoj dio sa login-om onda cu dodati ovaj dio
        */ 
    });

    novi_dokument.save(function(error) {
        res.sendStatus(500).send(error);
    });

    
});

generisiIme = function() {
    return ((new Date()).toString() + Math.floor((Math.random() * 100) + 1).toString()).replace(/[\., :, \s, (, ), +]/g,'') + '.pdf';
}

module.exports = router; 