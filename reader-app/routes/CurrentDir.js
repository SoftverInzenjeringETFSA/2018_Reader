const express = require('express');
const router = express.Router();
const fs = require('fs');




router.get('/', function(req, res) {

  fs.readFile('currentDir.txt', function (error,data){
    console.log(data);
    res.end(JSON.stringify({
        'dir' : data.toString()
    }));
      //res.send(data);
  });
  /*  if (req.session.korisnik == req.query.sesija) {

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
        }));*/
});

module.exports = router;
