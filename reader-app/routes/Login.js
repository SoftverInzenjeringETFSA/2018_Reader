const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');

var KorisnikSchema = require('../base/models/Korisnik.js');

router.get('/', function(req, res) {
    var rEmail = req.query.email,
        rLozinka = req.query.lozinka;
    

    // ako nema nikog...
    /*var imaLiKorisnika = false;
    KorisnikSchema.count({}, function(err, count) {
        imaLiKorisnika = (count > 0);
    });

    if (!imaLiKorisnika) {
        var _korisnik = {
            'email' : rEmail,
            'lozinka' : rLozinka
        }
        KorisnikSchema.create(_korisnik, {}, function(err, kor) {
        });
    }*/


    KorisnikSchema.findOne({$and : [
        {email : rEmail},
        {lozinka : rLozinka}
    ]}).exec(function(err, korisnik) {
        if (err)
            res.end(JSON.stringify({
                'success' : null, 
                'data' : err
            }));
        else {
            if (korisnik) {
                req.session.korisnik = rEmail + korisnik._id;
                res.end(JSON.stringify({
                    'success' : 'yes',
                    'data' : korisnik._id,
                    'session' : req.session.korisnik
                }));
            }
            else
                res.end(JSON.stringify({
                    'success' : 'no',
                    'data' : 'The e-mail adress and password you have entered are incorrect'
                }));
        }
    });
});

module.exports = router;