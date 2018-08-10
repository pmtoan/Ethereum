### Deploy SimpleCoin with truffle framwwork

**Create truffle project**  
```bash
mkdir simplecoin
cd simplecoin
truffle init
```  

**Deploy contract**  
Create file contracts/SimpleCoin.sol
```solidity
pragma solidity ^0.4.18;

contract SimpleCoin{
    uint public decimals;
	mapping(address => uint256) public balances;
    constructor() public{
        balances[tx.origin] = 10000;
        decimals = 0;
    }
    event Transfer(address indexed from, address indexed to, uint256 value);
    function transfer(address _to, uint256 _value) public returns(bool){
        require(balances[msg.sender] >= _value);
        require(balances[_to] + _value >= balances[_to]);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
    function balanceOf(address _owner) public view returns(uint256){
    	return balances[_owner];
    }
}
```  

**Compile solidity**  
```bash
truffle compile
```

**Migrate contract**  
Use [Ganache]() deploy a provate network  
Edit file truffle.js
```javascript
module.exports = {
  	networks: {
    	development: {
      		host: "127.0.0.1",
      		port: 7545,
      		network_id: "*"
    	}
  	}
};
```
Create file migrations/2_deploy_contracts.js
```javascript
var SimpleCoin = artifacts.require("SimpleCoin");
module.exports = function(deployer) {
  	deployer.deploy(SimpleCoin);
};
```  
Migrate contract with command  
```bash
truffle migrate
```  

**Interacting with contract**  
1. Get ether balance of account  
Code javascript (src/call.js)
```javascript
module.exports = function(callback) {
	console.log(web3.fromWei(web3.eth.getBalance(account_one).toNumber(), 'ether'));
}
```  
Run script  
```bash
truffle exec 'src/call.js'
```  

2. Get SimpleCoin balance of account 

Code javascript (src/call.js)  
```javascript
module.exports = function(callback) {
	const artifacts = require('./../build/contracts/SimpleCoin.json')
	const contract = require('truffle-contract')
	const SimpleCoin = contract(artifacts);
	SimpleCoin.setProvider(web3.currentProvider);
	var account_one = "0x242E88935c968fa5c9E4a8c3795FE9b11772160f";
	var meta;
	SimpleCoin.deployed().then(function(instance) {
	  	meta = instance;
	  	return meta.balanceOf.call(account_one, {from: account_one});
	}).then(function(result) {
	  	console.log(result.toNumber());
	}).catch(function(e) {
	  	console.log("Error call function");
	})
}
```  
Run script
```bash
truffle exec 'src/call.js'
```  

3. Make a transaction with SimpleCoin  

Code javascript (src/call.js)    
```javascript
module.exports = function(callback) {
	const artifacts = require('./../build/contracts/SimpleCoin.json')
	const contract = require('truffle-contract')
	const SimpleCoin = contract(artifacts);
	SimpleCoin.setProvider(web3.currentProvider);
	var account_one = "0x242E88935c968fa5c9E4a8c3795FE9b11772160f";
	var account_two = "0x81723B832A5A2BbCb35AD2b7643b21c4f60E9A56";
	var meta;
	SimpleCoin.deployed().then(function(instance) {
	  	meta = instance;
	  	return meta.transfer(account_two, 10, {from: account_one});
	}).then(function(result) {
	  	console.log("Transaction success");
	}).catch(function(e) {
	  	console.log("Transaction Error");
	})
}
```  
Run script
```bash
truffle exec 'src/call.js'
```  