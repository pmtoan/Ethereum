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