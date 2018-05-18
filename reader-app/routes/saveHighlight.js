const express = require('express');
const router = express.Router();
const fs = require('fs');
var http = require('http');
var download = require('download-pdf');

//const KorisnikSchema = require('../base/models/Korisnik.js');
var NodeSchema = require('../base/models/Node.js');
var HighlightSchema = require('../base/models/Highlight.js');
if (module.hot) {
  module.hot.accept('../base/models/Highlight.js');
}
router.post('/', function(req, res) {
var item = req.body;
  var _node = {
    innerHTML : item.innerHtml,
    data: item.data,
    tagName: item.tagName,
    coordinateLeft: item.left,
    coordinateTop: item.top,
    isStart: item.isStart,
    isEnd: item.isEnd,
    highlightId: item.idH
  };
  if( item.isStart === 1) {
    var _highlight = {
      offsetStart : item.startOffset,
      offsetEnd : item.endOffset,
      documentId : item.idDocument,
      idH: item.idH
    };
    HighlightSchema.collection.insert(_highlight, {}, function(err, ress){

      });
  }
  NodeSchema.collection.insert(_node,  {}, function(err, ress){

  });

  });



module.exports = router;
