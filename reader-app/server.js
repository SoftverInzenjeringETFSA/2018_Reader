const express = require('express');
const app = express(); 

const bodyParser = require('body-parser'); 
const fs = require('fs'); 

app.get('/proba', function(req, res) {
    res.end(JSON.stringify({'poruka' : 'Uspješno je!'}));
});

app.listen(5000);