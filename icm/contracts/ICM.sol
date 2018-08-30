pragma solidity ^0.4.18;

import './Interface.sol';
import './Utils.sol';

contract ICM is Interface, Utils{
	mapping(address => Wallet) wallets;
	Claim[] claims;
	Transaction[] transactions;
	uint256 nonce;

	constructor() public{
		nonce = 0;
	}
	
	function getWallet(address _address) public constant returns(string name, string email, string phone){
		require(_address != 0x0);
		return (wallets[_address].name, wallets[_address].email, wallets[_address].phone);
	}

	function getIdentity(address _address) public constant returns(string name, string idcNumber, string date, string place, string license){
		require(_address != 0x0);
		return (wallets[_address].idc.name, wallets[_address].idc.idcNumber, wallets[_address].idc.date, wallets[_address].idc.place, wallets[_address].idc.license);
	}
	function getClaimById(uint256 _id) public constant returns(uint256 id, address to, address from, string status, string info){
		require(_id < nonce);
		for(uint i=0;i<claims.length;i++){
			if (claims[i].id == _id){
				return (claims[i].id, claims[i].to, claims[i].from, claims[i].status, claims[i].info);
			}
		}
		return (_id, 0x0, 0x0, "", "");
	}
	function getClaimByRequester(address _from) public constant returns(uint256[] requestIDs){
		require(_from != 0x0);
		uint len = 0;
		for(uint i=0;i<claims.length;i++){
			if (claims[i].from == _from){
				len++;
			}
		}
		uint256[] memory ids = new uint256[](len);
		uint index = 0;
		for(i=0;i<claims.length;i++){
			if (claims[i].from == _from){
				ids[index] = claims[i].id;
				index++;
			}
		}
		return ids;
	}
	function getClaimByUser(address _to) public constant returns(uint256[] requestIDs){
		require(_to != 0x0);
		uint len = 0;
		for(uint i=0;i<claims.length;i++){
			if (claims[i].to == _to){
				len++;
			}
		}
		uint256[] memory ids = new uint256[](len);
		uint index = 0;
		for(i=0;i<claims.length;i++){
			if (claims[i].to == _to){
				ids[index] = claims[i].id;
				index++;
			}
		}
		return ids;
	}
	function getTransactionByHash(bytes32 _hash) public constant returns(bytes32 hash, address to, address from, bytes32 data){
		require(_hash != 0x0);
		for(uint i=0;i<transactions.length;i++){
			if (transactions[i].hash == _hash){
				return (transactions[i].hash, transactions[i].to, transactions[i].from, transactions[i].data);
			}
		}
		return (0x0, 0x0, 0x0, 0x0);
	}
	function getTransactionByAddress(address _address) public view returns(bytes32[] hashs){
		require(_address != 0x0);
		bytes32[] memory trans;
		uint index = 0;
		for(uint i=0;i<transactions.length;i++){
			if (transactions[i].to == _address || transactions[i].from == _address){
				trans[index] = transactions[i].hash;
				index++;
			}
		}
		return trans;
	}
	function addWallet(string _name, string _email, string _phone) public returns(bool status){
		if (bytes(wallets[msg.sender].name).length != 0)
		/* If wallet exists, can't create new wallet */
			return false;
		/* Check valid input */
		require(bytes(_name).length != 0);
		require(bytes(_email).length != 0);
		require(bytes(_phone).length != 0);
		/* Add new wallet */
		wallets[msg.sender].name = _name;
		wallets[msg.sender].email = _email;
		wallets[msg.sender].phone = _phone;

		emit AddWallet(msg.sender);

		return true;
	}
	function addIdentity(string _name, string _idcNumber, string _date, string _place, string _license) public returns(bool status){
		if (bytes(wallets[msg.sender].name).length == 0)
		/* If wallet not exists, can't create identity */
			return false;
		if (bytes(wallets[msg.sender].idc.name).length != 0)
		/* If identity exists, can't create new identity */
			return false;
		/* Check valid inout */
		require(bytes(_name).length != 0);
		require(bytes(_idcNumber).length != 0);
		require(bytes(_date).length != 0);
		require(bytes(_place).length != 0);
		require(bytes(_license).length != 0);
		/* Add new identity */
		wallets[msg.sender].idc.name = _name;
		wallets[msg.sender].idc.idcNumber = _idcNumber;
		wallets[msg.sender].idc.date = _date;
		wallets[msg.sender].idc.place = _place;
		wallets[msg.sender].idc.license = _license;

		emit AddIdentity(msg.sender);

		return true;
	}
	function request(address _to, string _info) public returns(uint256 claimID){
		require(_to != 0x0);
		require(bytes(_info).length != 0);
		Claim memory buffer;
		buffer.from = msg.sender;
		buffer.to = _to;
		buffer.info = _info;
		buffer.status = "pending";
		buffer.id = nonce;
		nonce++;
		claims.push(buffer);

		emit Request(msg.sender, _to, _info);

		return buffer.id;
	}
	function approve(uint256 _requestID, bool _allowed) public returns(bool success){
		require(_requestID != 0);
		for(uint i=0;i<claims.length;i++){
			if (claims[i].id == _requestID){
				if (_allowed == true){
					claims[i].status = "allowed";
					if (stringCompare(claims[i].info, "name") == true)
						claims[i].info = wallets[claims[i].to].idc.name;
					if (stringCompare(claims[i].info, "idcNumber") == true)
						claims[i].info = wallets[claims[i].to].idc.idcNumber;
					if (stringCompare(claims[i].info, "date") == true)
						claims[i].info = wallets[claims[i].to].idc.date;
					if (stringCompare(claims[i].info, "place") == true)
						claims[i].info = wallets[claims[i].to].idc.place;
					if (stringCompare(claims[i].info, "license") == true)
						claims[i].info = wallets[claims[i].to].idc.license;
				}
				else
					claims[i].status = "rejected";
			}
		}

		emit Approve(msg.sender, _requestID, _allowed);

		return true;
	}
}