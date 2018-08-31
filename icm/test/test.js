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
	})

	ICM.deployed().then(function (instance) {
		meta = instance;
		return meta.addIdentity("Pham Minh Toan", "321711018", "14-2-2018", "Ben Tre", "license", {from: account, gas:3000000});
	}).then(function (result) {
		console.log(result.logs.length);
	}).catch(function (e) {
		console.log(e);
	})

	ICM.deployed().then(function (instance) {
		meta = instance;
		return meta.getIdentity.call(account);
	}).then(function (result) {
		console.log(result);
	}).catch(function (e) {
		console.log(e);
	})*/


	/*ICM.deployed().then(function (instance) {
		meta = instance;
		return meta.request(account, true, true, true, true, false, {from: account, gas:3000000});
	}).then(function (result) {
		console.log(result);
	}).catch(function (e) {
		console.log(e);
	})*/

	ICM.deployed().then(function (instance) {
		meta = instance;
		return meta.getClaimById.call(1);
	}).then(function (result) {
		console.log(result);
	}).catch(function (e) {
		console.log(e);
	})

	/*ICM.deployed().then(function (instance) {
		meta = instance;
		return meta.approve(0, true, true, true, false, false,  {from: account, gas:3000000});
	}).then(function (result) {
		console.log(result);
	}).catch(function (e) {
		console.log(e);
	})

	ICM.deployed().then(function (instance) {
		meta = instance;
		return meta.getClaimById.call(0);
	}).then(function (result) {
		console.log(result);
	}).catch(function (e) {
		console.log(e);
	})*/
}