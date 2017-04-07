var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World Londa!')
})

app.get('/update', function(req, res) {
  console.log("got it!");
  console.log(req.query);
  console.log(typeof req.query);
  console.log(typeof JSON.stringify(req.query));
  console.log(typeof req.query.api_key);
  res.send('hello world!!!');
})

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})

