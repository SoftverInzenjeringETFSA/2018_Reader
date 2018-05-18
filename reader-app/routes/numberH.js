const express = require('express');
const router = express.Router();
const fs = require('fs');




router.get('/', function(req, res) {

  fs.readFile('numberH.txt', function (error,data){
    console.log(data);
    var broj = Number(data.toString()) + 1;
    fs.writeFile('numberH.txt', broj.toString(), function (error, data) {
      res.end(JSON.stringify({
          'broj' : broj
      }));
    });


  });
  
});

module.exports = router;
