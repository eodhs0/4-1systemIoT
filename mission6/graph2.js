var express = require('express')
var app = express()
fs = require('fs');
mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'sensor',
    password: 'qkr9303362',
    database: 'data'
})
connection.connect();


app.get('/graph', function (req, res) {
    console.log('got app.get(graph)');
    var html = fs.readFile('./graph.html', function (err, html) {
    html = " "+ html
    console.log('read file');

    var qstr = 'select * from sensors ';
    connection.query(qstr, function(err, rows, cols) {
      if (err) throw err;

      var data = "";
      var comma = ""
	//var kr = 2018;
	//krs = kr.toString();
	//console.log(krs.substring(0,2));
      for (var i=0; i< rows.length; i++) {
         r = rows[i];
	 timeTemp = r.time;
 	 //console.log(timeTemp);
	 slice1 = timeTemp.toString();
	 
 	 year1 = slice1.substring(11,15);
	 month1 = slice1.substring(4,7);
	 if(month1 == "Apr"){month1 = "03";}
	 //month1 = "03";
	 day1 = slice1.substring(8,10);
	 hour1 = slice1.substring(16,18);
	 minute1 = slice1.substring(19,21);
	 second1 = slice1.substring(22,24);

         data += comma + "[new Date("+year1+","+month1+","+day1+","+hour1+","+minute1+","+second1+"),"+ r.value +"]";
	 //console.log(data);
         comma = ",";
      }
      var header = "data.addColumn('date', 'Year/Month/Day Hour:Minute:Second');"
      header += "data.addColumn('number', 'Temperature');"
      html = html.replace("<%HEADER%>", header);
      html = html.replace("<%DATA%>", data);

      res.writeHeader(200, {"Content-Type": "text/html"});
      res.write(html);
      res.end();
    });
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
