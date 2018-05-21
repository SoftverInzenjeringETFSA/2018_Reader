const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {

    var donneRecu = req.body;

    console.log(donneRecu['lien']);

    var url = donneRecu['lien']; //pdf link

    http.get(url, function (response) {

        var chunks = [];

        response.on('data', function (chunk) {

            console.log('Downloading');

            chunks.push(chunk);

        });

        response.on("end", function () {
            console.log('Downloaded');
            var jsfile = new Buffer.concat(chunks).toString('base64');
            console.log('converted to base64');
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header('content-type', 'application/pdf');
            res.send(jsfile);
        });
    }).on("error", function () {
        callback(null);
    });
});

module.exports = router;