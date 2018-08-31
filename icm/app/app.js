const express = require('express');
const app = express();
var path = require('path');

app.get(
	'/build/contracts/ICM.json',
	(req, res) => res.sendFile(path.join(__dirname + '/../build/contracts/ICM.json'))
);

app.get(/^(.+)$/, function(req, res){ 
     res.sendFile( __dirname + req.params[0]); 
 });


app.listen(3000, () => console.log('Example app listening on port 3000!'))