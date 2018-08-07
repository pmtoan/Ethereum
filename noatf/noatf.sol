pragma solidity ^0.4.16;

contract Noatf {
    mapping(address => uint256) public balanceOf;
    string public name;
    constructor(uint256 someCoin, string _name) public{
        if (someCoin == 0) someCoin = 21000000;
        balanceOf[msg.sender] = someCoin;
        name = _name;
    }
    event Transfer(address indexed from, address indexed to, uint256 value);
    function transfer(address _to, uint256 _value) public{
        require(balanceOf[msg.sender] >= _value);
        require(balanceOf[_to] + _value >= balanceOf[_to]);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
    }
}