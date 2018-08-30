pragma solidity ^0.4.18;

contract Interface{
	struct Identity{
		string name;
		string idcNumber;
		string date;
		string place;
		string license;
	}
	struct Wallet{
		string name;
		string email;
		string phone;
		Identity idc;
	}
	struct Claim{
		uint256 id;
		address to;
		address from;
		string status;
		string info;
	}
	struct Transaction{
		bytes32 hash;
		address to;
		address from;
		bytes32 data;
	}
	/* Event */
	event AddWallet(address indexed _owner);
	event AddIdentity(address indexed _owner);
	event Request(address indexed _from, address indexed _to, string _info);
	event Approve(address indexed _from, uint256 _requestID, bool _allowed);
	/* Constant Function */
	function getWallet(address _address) public constant returns(string name, string email, string phone);
	function getIdentity(address _address) public constant returns(string name, string idcNumber, string date, string place, string license);
	function getClaimById(uint256 _id) public constant returns(uint256 id, address to, address from, string status, string info);
	function getClaimByRequester(address _from) public constant returns(uint256[] requestIDs);
	function getClaimByUser(address _to) public constant returns(uint256[] requestIDs);
	function getTransactionByHash(bytes32 _hash) public constant returns(bytes32 hash, address to, address from, bytes32 data);
	function getTransactionByAddress(address _address) public constant returns(bytes32[] hashs);
	/* Implement Function */
	function addWallet(string _name, string _email, string _phone) public returns(bool status);
	function addIdentity(string _name, string _idcNumber, string _date, string _place, string _license) public returns(bool status);
	function request(address _to, string _info) public returns(uint256 claimID);
	function approve(uint256 _requestID, bool _allowed) public returns(bool success);
}