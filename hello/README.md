### Hello Ethereum
> Ethereum is a decentralized platform that runs smart contracts  

[Documents here](https://docs.google.com/document/d/1FJEyOfc6_y_U3nxX1qtAO2msVXYw2TIzudcxrqRxG14/edit?usp=sharing)  

**Install software on ubuntu**   
```bash
sudo apt update
sudo apt install software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt update
sudo apt install ethereum
```  

**Create a app directory structure** 
```bash
mkdir hello
cd hello
mkdir eth_net
cd eth_net
```  

**Create a account** 
```bash
geth --datadir ../eth_data account new
```  

**Create a file genesis.json**  
```bash
{
    "config": {
        "chainId": 15,
        "homesteadBlock": 0,
        "eip155Block": 0,
        "eip158Block": 0
    },
    "difficulty": "1",
    "gasLimit": "2100000",
    "alloc": {
        "address-account": { "balance": "30000000000000000000" }
    }
}
```  
> Note: Change address-account = account address created.  
Ex: fbbea7a46d2290e4befe7fe3bae33fca02f762be  

**Initialize network with genesis.jon**  
```bash
geth --datadir ../eth_data init genesis.json
```  

**Run geth JS console with network Id = chainId in genesis.json**  
```bash
geth --datadir ../eth_data --networkid 15 --nodiscover console
```  

**Test case**  
```bash
eth.accounts    # get eth account
eth.getBalance(eth.accounts[0]) # get balance of account  

##### Send some ethers ######  
personal.newAccount("/")  # Create new account
eth.accounts  # Check new account
personal.unlockAccount(eth.accounts[0], "/") # Unclock Account1
eth.sendTransaction({from:eth.accounts[0], to:eth.accounts[1], value:100}) # Acoount1 send 100 ethers to Accounts
miner.start(1) # start miner
eth.getBalance(eth.accounts[1]) # Check balance of Account2
```  

**References**  
```bash
# Connect to network from another terminal
geth --datadir "../eth_data" --dev attach ipc:../eth_data/geth.ipc  

miner.start(1)  #minning with 1 thread  

# Run Ethereum Wallet connect to network
ethereumwallet --rpc ../eth_data/geth.ipc
```

