### Simple token in Ethereum Blockchain
Create a token in Ethereum Blockchain and Ethereum Wallet  
Let call token is Noatf  

[Document here](https://docs.google.com/document/d/1uQ0DgZMwekJM9JKTu5E19je3bIHO3Q6Nqubx_hxqHgI/edit?usp=sharing)  

**Create directory structure**  
```bash
mkdir noatf
cd noatf
mkdir eth_data
mkdir eth_net
cd eth_net
touch noatf.sol
touch genesis.json
```   

**Install ethereum wallet**  
Download deb package for ubuntu from [offical page](https://github.com/ethereum/mist/releases)  
Install packages
```bash
sudo dpkg --install <package-name>.deb
```  

**Deploy solidity**
```solidity
pragma solidity ^0.4.16; /* Solidity oldest version requirement*/
contract Noatf { /* New contract for Noatf token */
    /* Mapping every address to a number, which store account's balance in this token */
    mapping(address => uint256) public balanceOf; 
    string public name; /* Name of contract */
    /* Build a constructor */
    constructor(uint256 someCoin, string _name) public{ 
        if (someCoin == 0) someCoin = 21000000; 
        balanceOf[msg.sender] = someCoin; 
        name = _name; 
    } 
    /* Add Transfer event */
    event Transfer(address indexed from, address indexed to, uint256 value); 
    /* Add function handle transfer amount token to a account */
    function transfer(address _to, uint256 _value) public{
        require(balanceOf[msg.sender] >= _value); 
        require(balanceOf[_to] + _value >= balanceOf[_to]); 
        balanceOf[msg.sender] -= _value; balanceOf[_to] += _value; 
        emit Transfer(msg.sender, _to, _value); 
    } 
}
```  
**Create genesis.json**  
```json
{ 
    "config": 
    { 
        "chainId": 1997, 
        "homesteadBlock": 0, 
        "eip158Block": 0, 
        "byzantiumBlock": 0 
    }, 
    "difficulty": "400", 
    "gasLimit": "2100000000", 
    "alloc":
    { 
        "Change account address here":
        { 
            "balance": "30000000000000000000" 
        }
    }
}
```  

**Deploy ethereum network**  
```bash
cd noatf/eth_net
geth --datadir ../eth_data account new
geth --datadir ../eth_data init genesis.json
geth --datadir ../eth_data --networkid 1997 --nodiscover console
```  

**Deploy contract with ethereum wallet**  
On new terminal
```bash
cd noatf/eth_net
ethereumwallet --rpc ../eth_data/geth.ipc
```  

Open CONTRACTS tab, choose Deploy new contract

Past code from noatf.sol to Solidity Contract source code, pick contract Noatf, give some data and deploy  

Start miner to commit transaction, start miner with geth console  
```bash
miner.start(4)
```