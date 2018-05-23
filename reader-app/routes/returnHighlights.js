const express = require('express');
const router = express.Router();
const fs = require('fs');
var http = require('http');
var download = require('download-pdf');

//const KorisnikSchema = require('../base/models/Korisnik.js');
var NodeSchema = require('../base/models/Node.js');
var HighlightSchema = require('../base/models/Highlight.js');


router.get('/', function(req,res) {

//  console.log(req);
  console.log(req.query.dir.toString());
  var sviH = HighlightSchema.collection.find({
    documentId : req.query.dir.toString()
  });
  if(sviH) {

    sviH.toArray(function(err,result) {
      if(!err) {

          var jsonArrayReturn = [];
          var broj = result.length;
          var itemsProcessed = 0;
          result.forEach(function(listItem, index){
            var index2 = index;
            var startOffset = listItem.offsetStart;
            var endOffset = listItem.offsetEnd;
            var index = listItem.idH;
            var objReturn;

            var sviN = NodeSchema.collection.find({
              highlightId : index
            });
            if(sviN) {

              sviN.toArray( function(err, result2) {
                if(!err) {

                  var jsonArray = [];
                  for (var k = 0; k<result2.length; k++) {
                    var jsonObj = {
                      'innerHtml' : result2[k].innerHTML,
                      'data' : result2[k].data,
                      'tagName' :result2[k].tagName,
                      'coordinateLeft' : result2[k].coordinateLeft,
                      'coordinateTop' : result2[k].coordinateTop,
                      'isStart' : result2[k].isStart,
                      'isEnd' : result2[k].isEnd
                    };
                    jsonArray.push(jsonObj);
                  }
                   objReturn = {
                    'startOffset' : startOffset,
                    'endOffset' : endOffset,
                    'nizNode' : jsonArray
                  };

                  jsonArrayReturn.push(objReturn);

                    //console.log('HIYAAA');
                    //console.log(jsonArrayReturn.length);
                    //console.log(jsonArrayReturn);


                }
                itemsProcessed = itemsProcessed + 1;
                if(itemsProcessed === broj) {
                  funkcija();
                }
              });
            }

function funkcija() {
  console.log(jsonArrayReturn);
  res.end(JSON.stringify({'nizHighlight' : jsonArrayReturn}));
}


          });







      }
      else {
        res.end(JSON.stringify({
            'success' : null,
            'data' : 'Access denied.'
        }));
      }
    })
  }
  else {
    res.end(JSON.stringify({
        'success' : null,
        'data' : 'Access denied.'
    }));
  }
});






module.exports = router;
