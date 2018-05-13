const mongoose = require('../mongobase.js');
const Schema = mongoose.Schema;

const Korisnik = require('./Korisnik.js');


const PDFDokumentSchema = new Schema( {
    
    
   ime : {
       type : String//Sequelize.STRING
   },

   opis : {
       type : String//Sequelize.STRING
   },

   direktorij : {
       type : String//Sequelize.STRING
   },

   datum_uploada : {
       type : Date//Sequelize.DATE
   },

   datum_posljednjeg_citanja : {
       type :Date// Sequelize.DATE
   },

   korisnikId : [{
       type : Schema.Types.ObjectId, ref: 'Korisnik'
   }]
}, );



module.exports = mongoose.model('PDFDokument', PDFDokumentSchema);