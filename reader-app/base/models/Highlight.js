const mongoose = require('../mongobase.js');
const Schema = mongoose.Schema;
const PDFDokument = require('./PDFDokument.js');
const HighlightSchema = new Schema({
    offsetStart : {
        type : String
    },
    offsetEnd : {
        type : String
    },
    idH : {
      type: Number
    },
    documentId : {
      type: String
    }
 });

 module.exports = mongoose.model('Highlight', HighlightSchema);
