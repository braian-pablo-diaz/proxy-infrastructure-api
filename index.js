var http = require('http');
var axios = require('axios');
const { exec } = require('child_process');

var TOKEN;
var PORT= 8090;

exec('fury get-token', (err, stdout, stderr) => {
  if (err) {
    console.log("Error");
    console.error(err);
    return;
  }

  TOKEN = `${stdout.slice(0, -1)}`;
  console.log("Ready");
});

http.createServer(function(req, res) {
    
    if (req.url && req.url.startsWith("/?")){
        req.url = req.url.substring(2);
    }

    console.log("URL: " + req.url);

    var config = {
        headers: {
            "x-auth-token": `${TOKEN}`
        }
    }

    axios.get(req.url, config)
    .then(function(response) {
        res.write(JSON.stringify(response.data));
        res.end();
    });

}).listen(PORT);