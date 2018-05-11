const Sequelize = require('sequelize');
const db = require('../baza.js');

//const Korisnik = db.import(__dirname + '/Korisnik.js');

const PDFDokument = db.define('pdf_dokument', {
   ime : {
       type : Sequelize.STRING
   },

   opis : {
       type :Sequelize.STRING
   },

   direktorij : {
       type : Sequelize.STRING
   },

   datum_uploada : {
       type : Sequelize.DATE
   },

   datum_posljednjeg_citanja : {
       type : Sequelize.DATE
   }
});

PDFDokument.dodajDokument = function(dokument, direktorij, fn) {
    PDFDokument.create({
        ime : dokument.ime,
        opis : dokument.opis,
        direktorij : direktorij,
        datum_uploada : new Date(),
        datum_posljednjeg_citanja : new Date()
    })
    .then(noviDokument => {
        if (noviDokument)
            fn('yes', noviDokument);
        else
            fn(null, 'Greška.');
    })
    .catch(error => {
        fn(null, error.message);
    })
}

module.exports = function(db, DataTypes) {
    return PDFDokument;
}