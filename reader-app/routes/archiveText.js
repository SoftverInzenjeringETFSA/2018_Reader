const express = require('express');
const router = express.Router();
const fs = require('fs');
var http = require('http');

router.post('/', function(req, res) {
    var citat  = req.body.citat;//'./pdfs/' + req.query.pdfName;
    var id = req.body.id;


    fs.open('./citati/citati' + id.toString() + '.txt', 'a', 666, function( e, id ) {
      fs.write( id, citat + "-.-\r\n", null, 'utf8', function(){
       fs.close(id, function(){
        console.log('file is updated');
        res.send('');
       });
      });
     });

});



module.exports = router;
