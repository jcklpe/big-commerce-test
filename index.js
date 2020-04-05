const express = require('express');
const app = express();
const bodyParser = require("body-parser")
app.use(bodyParser.json());

// when there's a post request to /webhooks...
app.post('/webhooks', function (req, res) {

    // log webhook request body to console
    console.log('\x1b[36m%s\x1b[0m', 'WEBHOOK REQUEST RESPONSE:');
    console.log(req.body);
    // respond with 200 OK
    res.send("okey-dokey!");



});


//app.get('/', (req, res) => res.send(request.body));

app.listen(3000, function () {
    console.log('Listening for webhooks on port 3000')
})
