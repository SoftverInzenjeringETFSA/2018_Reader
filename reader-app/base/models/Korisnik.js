const Sequelize = require('sequelize');
const db = require('../baza.js');



const Korisnik = db.define('korisnici', {
    email : {
        type : Sequelize.STRING
    },

    lozinka : {
        type : Sequelize.STRING
    },

    ime : {
        type : Sequelize.STRING
    },

    prezime : {
        type : Sequelize.STRING
    }
 });
 
 module.exports = function(db, DataTypes) {
     return Korisnik;
 }