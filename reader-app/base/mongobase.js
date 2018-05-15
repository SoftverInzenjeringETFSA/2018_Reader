const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/reader');
//mongoose.connect('mongodb://loacalhost/reader'); //dodao zbog testiranja

module.exports = mongoose;