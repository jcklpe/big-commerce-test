const express = require('express');
const app = express();
const bodyParser = require("body-parser")
app.use(bodyParser.json());

// page content
let appBody = `
<style>
* {
    font-family: "Arial";
    background-color: #1f38c5;
    color: white;
    margin: 0;
}

html {
    padding: 50px;
    display: flex;
}

body {
    position: relative;
    left: auto;
    right: auto;
    margin: auto;
}

li, h1 {
    padding-bottom: 1rem;
}
h2 {
    padding-bottom: 0.5rem;
}

.results {
    max-width: 800px;
}

</style>
<h1>To see the contents of the latest webhook push:</h1>
<ol>
<li>Make a change to a product in the Big Commerce admin panel.</li>
<li>This will fire off a webhook response that is targeted at {{ngrok-hash}}.ngrok.io/webhooks.</li>
<li>The app.post function will console.log that data to the localhost node console and save the value to the 'webhookData' variable</li>
<li>If you visit {{ngrok-hash}}.ngrok.io/ the client will perform a GET request.</li>
<li>The app.get function will then use res.send to respond to the client with the contents of 'webhookData'.</li>
</ol>

<h2>Results:</h2>`;

//declare webhookData with default value
let webhookData = `no webhookData yet</p>`;


// when there's a post request to /webhooks...
app.post('/webhooks',
    function (req, res) {
    // log webhook request body to console
    console.log('\x1b[36m%s\x1b[0m', 'WEBHOOK REQUEST RESPONSE:');
    console.log(req.body);

    // save in new data from the webhook
    webhookData = JSON.stringify(req.body);

    // respond with 200 OK
    res.send(req.body);

});

app.get(`/`,
    function (req, res){
        console.log('\x1b[36m%s\x1b[0m', 'GET request fired at root of page');

        // write out appBody with webhookData results
        res.write('<html>');
        res.write('<body>');
        res.write(appBody);
        res.write(`<p class='results'>`);
        res.write(webhookData);
        res.write(`</p>`);
        res.write('</body>');
        res.write('</html>');
        res.end();
    }
);

// get rid of favicon 404 error
app.get('/favicon.ico', (req, res) => res.status(204));

app.listen(3000, function () {
    console.log('Listening for webhooks on port 3000')
})
