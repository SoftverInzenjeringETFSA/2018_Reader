const mongoose = require('mongoose');
const config = require('./config').database;
mongoose.connect('mongodb://' + config.user + ':' + config.password + '@ds261138.mlab.com:61138/reader');
//mongoose.connect('mongodb://loacalhost/reader'); //dodao zbog testiranja

module.exports = mongoose;