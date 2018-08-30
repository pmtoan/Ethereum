module.exports = function (callback) {
	const artifacts = require('./../build/contracts/ICM.json')
	const contract = require('truffle-contract')
	const ICM = contract(artifacts);
	var account = "0x3FEE0E819f8F18Be62144f042D1110cD70DfC809";
	ICM.setProvider(web3.currentProvider);
	var meta;
	/*ICM.deployed().then(function (instance) {
		meta = instance;
		return meta.addWallet("toan", "phamminhtoan304@gmail.com", "0926632482", {from: account, gas:3000000});
	}).then(function (result) {
		console.log(result.logs.length);
	}).catch(function (e) {
		console.log(e);
	})*/

	ICM.deployed().then(function (instance) {
		meta = instance;
		return meta.request(account, "name", {from: account, gas:3000000});
	}).then(function (result) {
		console.log(result);
	}).catch(function (e) {
		console.log(e);
	})

	ICM.deployed().then(function (instance) {
		meta = instance;
		return meta.getClaimByUser.call(account);
	}).then(function (result) {
		for(var i=0;i<result.length;i++)
			console.log(result[i].toNumber());
	}).catch(function (e) {
		console.log(e);
	})
}