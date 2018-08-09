module.exports = function(callback) {	/* This is important */
	const artifacts = require('./../build/contracts/SimpleCoin.json')
	const contract = require('truffle-contract')
	const SimpleCoin = contract(artifacts);
	SimpleCoin.setProvider(web3.currentProvider);
	var account_one = "0x242E88935c968fa5c9E4a8c3795FE9b11772160f"; // an address
	var account_two = "0x81723B832A5A2BbCb35AD2b7643b21c4f60E9A56";
	var meta;

	/*SimpleCoin.deployed().then(function(instance) {
	  	meta = instance;
	  	return meta.transfer(account_two, 10, {from: account_one});
	}).then(function(result) {
	  	console.log("Success transaction");
	}).catch(function(e) {
	  	console.log("Error transaction");
	})*/

	SimpleCoin.deployed().then(function(instance) {
	  	meta = instance;
	  	return meta.balanceOf.call(account_two, {from: account_two});
	}).then(function(result) {
	  	console.log(result.toNumber());
	}).catch(function(e) {
	  	console.log("Error call function");
	})

	/* Get ether balance of account */
	// console.log(web3.fromWei(web3.eth.getBalance(account_one).toNumber(), 'ether'));
}