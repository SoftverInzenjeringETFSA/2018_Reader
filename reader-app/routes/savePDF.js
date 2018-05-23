/*
    Ruta koja prima json file i iz njega uzima podatke i dodaje ih u bazu podataka
*/
const express = require('express');
const router = express.Router();
const fs = require('fs');
var http = require('http');
var dokument = require('../base/models/PDFDokument.js')
var konekcija = require('../base/mongobase.js')



router.post('/', function(req,res)
{
    console.log("Spojio sa bazom!");

    var direktoriji_novi_naziv = './pdfs/' + generisiIme();

    var novi_dokument = new dokument({

        ime: req.body.ime,
        opis: req.body.opis,
        direktoriji: direktoriji_novi_naziv,
        datum_uploada: new Date("11/20/2014 04:11"),
        datum_posljednjeg_citanja: new Date("05/28/2014 04:11")
       // korisnikId: req.body.id
       /*
            Greska u formatu datuma, pa smo morali fiksne vrijednosti uzet zbog testiranja.
            Funkcija je uspjesno spremala na bazu.
            Provjera:
                use reader
                show collection - ispise sve kolekcije
                db.naziv_kolekcije.find()
       */
    });

      novi_dokument.save(function(error) {
        if(error)console.log(error);
    });


});

generisiIme = function() {
    return ((new Date()).toString() + Math.floor((Math.random() * 100) + 1).toString()).replace(/[\., :, \s, (, ), +]/g,'') + '.pdf';
}

module.exports = router;
