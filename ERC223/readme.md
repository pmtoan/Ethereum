### Token example with ERC223 standard  

**Contracts**  
```solidity
contract erc223Contract{
    function tokenFallback(address _from, uint _value, bytes _data) public;
}
contract erc223Token {
	...
}
```  

**Define public variables and mapping**  
```solidity
string public name;	/* token name */
string public symbol;	/* token symbol */
uint public decimals;
mapping(address => uint256) balances;
```  

Constructor
```solidity
constructor(string _name, string _symbol, uint _decimals, uint someCoin) public{
    name = _name;
    symbol = _symbol;
    decimals = _decimals;
    balances[msg.sender] = someCoin;
}
```  

**Events**
```solidity
event Transfer(address indexed from, address indexed to, uint256 indexed value, bytes data);
```  

**ERC20 Functions**
```solidity
function balanceOf(address _owner) public view returns(uint256){
	/* Return balance of a address */
    return balances[_owner];
}
```  

**New functions**
```solidity
function transfer(address _to, uint256 _value) public returns(bool){
    require(balances[msg.sender] >= _value);
    require(_to != 0x0);
    uint codeLen;	/* This variavke store code length of a address after assembale */
    bytes memory empty;
    assembly{
        codeLen := extcodesize(_to) /* Assamble receiver's address */
    }
    balances[msg.sender] -= _value;
    balances[_to] += _value;
    if (codeLen > 0){	/* Check receiver is contract or wallet address */
        erc223Contract receiver = erc223Contract(_to);
        /* Fallback when receiver is contract, this is main difference with ERC20 */
        receiver.tokenFallback(msg.sender, _value, empty);
    }
    emit Transfer(msg.sender, _to, _value, empty);
}
function transfer(address _to, uint256 _value, bytes _data) public returns(bool){
	/* This function same as above function, but data is not empty */
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
}
```