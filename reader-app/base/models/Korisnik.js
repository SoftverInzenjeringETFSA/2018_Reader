const mongoose = require('../mongobase.js');
const Schema = mongoose.Schema;

const KorisnikSchema = new Schema({
    email : {
        type : String
    },

    lozinka : {
        type : String
    },

    ime : {
        type : String
    },
 
    prezime : {
        type : String
    }
 });
 
 module.exports = mongoose.model('Korisnik', KorisnikSchema);
