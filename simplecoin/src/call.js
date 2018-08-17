module.exports = function(callback) {	/* This is important */
	const artifacts = require('./../build/contracts/SimpleCoin.json')
	const contract = require('truffle-contract')
	const SimpleCoin = contract(artifacts);
	SimpleCoin.setProvider(web3.currentProvider);
	var account_one = "0xF0c496513fa9fBaCf654Cb84e7D019df37A50210"; // an address
	var account_two = "0xDb2d12d956d93977818dfBeaca8f0Cc61f76eF3F";
	var meta;

	SimpleCoin.deployed().then(function(instance) {
	  	meta = instance;
	  	return meta.transfer(account_two, 10, {from: account_one});
	}).then(function(result) {
	  	var transInfo = web3.eth.getTransaction(result.receipt.transactionHash);
	  	console.log("    hash: " + transInfo.hash);
	  	console.log("    nonce: " + transInfo.nonce);
	  	console.log("    blockHash: " + transInfo.blockHash);
	  	console.log("    blockNumber: " + transInfo.blockNumber);
	  	console.log("    transactionIndex: " + transInfo.transactionIndex);
	  	console.log("    from: " + transInfo.from);
	  	console.log("    to: " + transInfo.to);
	  	console.log("    value: " + transInfo.value.toNumber());
	  	console.log("    gas: " + transInfo.gas);
	  	console.log("    gasPrice: " + transInfo.gasPrice.toNumber());
	  	console.log("    input: " + transInfo.input);
	}).catch(function(e) {
	  	console.log("Error transaction");
	})

	// SimpleCoin.deployed().then(function(instance) {
	//   	meta = instance;
	//   	return meta.balanceOf.call(account_two, {from: account_two});
	// }).then(function(result) {
	//   	console.log(result.toNumber());
	// }).catch(function(e) {
	//   	console.log("Error call function");
	// })

	/* Get ether balance of account */
	// console.log(web3.fromWei(web3.eth.getBalance(account_one).toNumber(), 'ether'));
}