const express = require('express');
const router = express.Router();
const fs = require('fs');
var http = require('http');

router.get('/', function(req, res) {
    var id = req.query.id;

  console.log(id) 
    fs.readdir("./citati", (err, files) => {
      if(err == null){
        //console.log(files)
        files.forEach(file => {
          if(file == 'citati' + id.toString() + '.txt'){
              fs.readFile('./citati/' + file, (err1, data) => {
                if(err1 == null){
                   var citati = data.toString().split("-.-\r\n");
                  res.end(JSON.stringify({'success' : 'yes', 'data' : citati}));
                }
                else { console.log(err1)
                  res.end(JSON.stringify({'success' : null, 'data' : err}));}
              }) 
          }
        });}
        else {console.log(err)
          res.end(JSON.stringify({'success' : null, 'data' : err}));}
    })
});



module.exports = router;
