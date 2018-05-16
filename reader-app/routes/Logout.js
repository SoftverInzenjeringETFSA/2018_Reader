const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');

router.get('/', function(req, res) {
    var session = req.query.session;
    
    if (req.session.korisnik == session) {
        req.session.korisnik = null;
        res.end(JSON.stringify({
            'success' : 'yes'
        }));
    }
    else {
        res.end(JSON.stringify({
            'success' : 'null',
            'data' : 'Access denied.'
        }));
    }
});

module.exports = router;