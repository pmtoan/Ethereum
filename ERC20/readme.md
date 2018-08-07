### Token example with ERC20 standard  

Define public variables
```solidity
string public name; /* token name */
string public symbol;   /* token symbol */
uint public decimals;
```  

Mapping
```solidity
/* Mapping address to balance, which store balance of accounts */
mapping(address => uint256) balances;
/* Owner of account approves the transfer of an amount to another account */
mapping(address => mapping(address => uint256)) allowed;
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
Events
```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
event Approval(address indexed tokenOwner, address indexed spender, uint256 value);
```  

Functions
```solidity
function balanceOf(address tokenOwner) public view returns(uint256){
    /* This function doesn't take gas, so use key word view */
    return balances[tokenOwner];
}
function allowance(address tokenOwner, address spender) public view returns (uint256 remaining){
    /* This function doesn't take gas, so use key word view */
    return allowed[tokenOwner][spender];
}
function transfer(address _to, uint256 _value) public returns(bool){
    require(balances[msg.sender] >= _value);
    require(_to != 0x0);
    require(balances[_to] + _value >= balances[_to]);
    balances[msg.sender] -= _value;
    balances[_to] += _value;
    emit Transfer(msg.sender, _to, _value);
    return true;
}
function transferFrom(address _from, address _to, uint256 _value) public returns(bool){
    require(_to != 0x0);
    require(_from != 0x0);
    require(allowed[msg.sender][_to] >= _value);
    require(balances[_to] + _value >= balances[_to]);
    balances[msg.sender] -= _value;
    allowed[msg.sender][_to] -= _value;
    balances[_to] += _value;
    emit Transfer(_from, _to, _value);
    return true;
}
function approve(address _spender, uint256 _value) public returns(bool status){
    allowed[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value);
    return true;
}
```