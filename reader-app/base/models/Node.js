const mongoose = require('../mongobase.js');
const Schema = mongoose.Schema;
const PDFDokument = require('./PDFDokument.js');
const NodeSchema = new Schema({
    innerHtml : {
        type : String
    },
    data : {
        type : String
    },
    tagName : {
        type : String
    },
    coordinateLeft : {
        type : Number
    },
    coordinateTop : {
        type : Number
    },
    isStart : {
        type : Number
    },
    isEnd : {
        type : Number
    },
    highlightId : {
        type : Number
    }
 });

 module.exports = mongoose.model('Node', NodeSchema);
