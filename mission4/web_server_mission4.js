var express = require('express');
var app = express();
bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var fs = require("fs");
var df = require('dateformat');


function insert_sensor(user, type, value, user2, serial, ip)
{
  obj = {};
  obj.user = user;
  obj.type = type;
  obj.value = value;
  obj.user2 = user2;
  obj.serial = serial;
  obj.ip = ip
  obj.date = df(new Date(), "yyyy-mm-dd HH:MM:ss");
  var d = JSON.stringify(obj);
  ret = " "+ type + user2 +"="+ value;
  //console.log("RET "+ ret);

  fs.appendFile("Data.txt", d+'\n', function(err) {
    if(err) console.log("File Write Err: %j", r);
  });
  return(ret);
}

function do_get_post(cmd, r, req, res)
{
  console.log(" %j", r);

  ret_msg = "serial:"+ r;

  if (r.format == '2') {
    //console.log("got format 2");
    var items = r.items.split(',');
    for (var i=0; i< items.length; i++) {
      if (items[i].length < 3) continue;
      var v = items[i].split('-');
          ret_msg += insert_sensor(r.user, v[1], v[2], v[0], r.serial, req.connection.remoteAddress);
    }
  }
  ret_msg += "";


  // writing at webpage
  res.writeHead(200, {'Content-Type': 'text/plain'});

  res.end(ret_msg);
}

app.get('/logone', function(req, res) {
  console.log("receive temperature from sensor")

  // save temperature in txtFile
  r = req.query;
  fs.appendFile("Data.txt", "temperature: "+r.temperature+"\n", function(err){});
  
  // nodejs server save
  // console.log("GET %j", r);

  do_get_post("GET", r, req, res);
});

app.post('/logone', function(req, res) {
  r = req.body;
  //console.log("POST %j", r);
  do_get_post("POST", r, req, res);
});


var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('listening at http://'+ host+':'+ port)
});
