### Deploy SimpleCoin with truffle framwwork

**Setup a ethereum private network**  
Use [Ganache](https://truffleframework.com/ganache)   

**Install a wallet**
Install [Metamask](https://metamask.io/) for Google Chrome  

**Setup project**
```bash
git clone https://github.com/pmtoan/Ethereum.git  
cd Ethereum/simplecoin  
truffle compile  
truffle migrate  
```  

**Start webapp**  
```bash
cd src
npm install express --save  
node app.js  
```

**Webapp running on port 3000**  
