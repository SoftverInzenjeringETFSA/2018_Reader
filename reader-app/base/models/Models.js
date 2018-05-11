// svi na jednom mjestu
const Sequelize = require('sequelize');
const sequelize = require('../baza.js');

const PDFDokument = sequelize.import('./PDFDokument.js');
const Korisnik = sequelize.import('./Korisnik.js');

PDFDokument.belongsTo(Korisnik);

sequelize.sync();

module.exports = function(sequelize, DataTypes) {
    return {PDFDokument, Korisnik};
}