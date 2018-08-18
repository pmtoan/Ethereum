const express = require('express');
const app = express();
var path = require('path');

app.get(
	'/', 
	(req, res) => res.sendFile(path.join(__dirname + '/index.html'))
);

app.get(
	'/js/app.js', 
	(req, res) => res.sendFile(path.join(__dirname + '/js/app.js'))
);

app.get(
	'/js/bootstrap.min.js',
	(req, res) => res.sendFile(path.join(__dirname + '/js/bootstrap.min.js'))
);

app.get(
	'/js/truffle-contract.js',
	(req, res) => res.sendFile(path.join(__dirname + '/js/truffle-contract.js'))
);

app.get(
	'/js/web3.min.js',
	(req, res) => res.sendFile(path.join(__dirname + '/js/web3.min.js'))
);

app.get(
	'/css/style.css',
	(req, res) => res.sendFile(path.join(__dirname + '/css/style.css'))
);

app.get(
	'/build/contracts/SimpleCoin.json',
	(req, res) => res.sendFile(path.join(__dirname + '/../build/contracts/SimpleCoin.json'))
);

app.listen(3000, () => console.log('Example app listening on port 3000!'))