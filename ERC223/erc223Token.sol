pragma solidity ^0.4.0;

contract erc223Contract{
    function tokenFallback(address _from, uint _value, bytes _data) public;
}

contract erc223Token {
    string public name;
    string public symbol;
    uint public decimals;

    mapping(address => uint256) balances;

    constructor(string _name, string _symbol, uint _decimals, uint256 someCoin) public{
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        balances[msg.sender] = someCoin;
    }

    event Transfer(address indexed from, address indexed to, uint256 indexed value, bytes data);

    function balanceOf(address _owner) public view returns(uint256){
        return balances[_owner];
    }

    function transfer(address _to, uint256 _value) public returns(bool){
        require(balances[msg.sender] >= _value);
        require(_to != 0x0);
        uint codeLen;
        bytes memory empty;
        assembly{
            codeLen := extcodesize(_to)
        }
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        if (codeLen > 0){
            erc223Contract receiver = erc223Contract(_to);
            receiver.tokenFallback(msg.sender, _value, empty);
        }
        emit Transfer(msg.sender, _to, _value, empty);
        return true;
    }

    function transfer(address _to, uint256 _value, bytes _data) public returns(bool){
        require(balances[msg.sender] >= _value);
        require(_to != 0x0);
        uint codeLen;
        assembly{
            codeLen := extcodesize(_to)
        }
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        if (codeLen > 0){
            erc223Contract receiver = erc223Contract(_to);
            receiver.tokenFallback(msg.sender, _value, _data);
        }
        emit Transfer(msg.sender, _to, _value, _data);
        return true;
    }
}
