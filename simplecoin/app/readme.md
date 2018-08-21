###Deploy Dapp using ReactJS and redux  

**Create Contract, HashInfo GUI components base on React.Components**  
```javascript
class Contract extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { action, coinbase, etherTransfer, etherGetBalance, simplecoinTransfer, simplecoinGetBalance } = this.props
        return (
            <div id='content'>
                <div id='ether'>
                    ...
                </div>
                <div id='simplecoin'>
                    ...
                </div>
                <div id='info'>
                    <h3>{action}</h3>
                    <div id='status'></div>
                </div>
            </div>
        )
    }
}
class HashInfo extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        const {data} = this.props
        return(
            <div>
                <h4>nonce: {data.nonce}</h4>
                ...
                <h4>input: {data.input}</h4>
            </div>
        )
    }
}
```  

**Initialize web3.js**  
```javascript
var web3Provider = null;
if (typeof web3 !== 'undefined') {
    web3Provider = web3.currentProvider;
} else {
    web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}
web3 = new Web3(web3Provider);
```  

**Get coinbase and render GUI**  
```javascript
const render = () => {
    web3.eth.getAccounts(function (error, accounts) {
        ReactDOM.render(
            <Contract
                action={store.getState()}
                coinbase={accounts[0]}
                etherTransfer={() => transferEther()}
                etherGetBalance={() => getEtherBalance()}
                simplecoinTransfer={() => transferSimpleCoin()}
                simplecoinGetBalance={() => getSimpleCoinBalance()}
            />,
            rootEl
        )      
    })
}
```  

**Create a redux store, add reducer and subscribe**  
```javascript
const store = Redux.createStore(reducer)
...
render()
store.subscribe(render)
const reducer = (state='', action) => {
	if (action.type == 'ether_get_balance')
		return ('Get ether balance of ' + action.address)
	else if (action.type == 'ether_transfer')
		return ('Tranfer ' + action.value + ' Ether from ' + action.from+ ' to ' + action.to)
	else if (action.type == 'simplecoin_get_balance')
		return ('Get simplecoin balance of ' + action.address)
	else if (action.type == 'simplecoin_transfer')
		return ('Tranfer ' + action.value + ' SimpleCoin from ' + action.from + ' to ' + action.to)
}
```  

**Get account balance and dispatch state**  
```javascript
const getEtherBalance = () => {
	...
    ReactDOM.render(
        <h3>{web3.fromWei(result.toNumber(), 'ether')} ether</h3>,
        document.getElementById('status')
    )
    store.dispatch({type: 'ether_get_balance', address: address});
}
const getSimpleCoinBalance = () => {
    $.getJSON('../../build/contracts/SimpleCoin.json', function (data) {
        const SimpleCoinArtifact = data;
        const SimpleCoin = TruffleContract(SimpleCoinArtifact);
        SimpleCoin.setProvider(web3Provider);
        ...
        ReactDOM.render(<h4>{result.toNumber().toString()} SimpleCoin</h4>, document.getElementById('status'));
        store.dispatch({type: 'simplecoin_get_balance', address: address});
    }
}
```  

**Transfer Ether and SimpleCoin**  
```javascript
const transferEther = () => {
    ...
    web3.eth.getAccounts(function (error, accounts) {
        web3.eth.sendTransaction({from:fromAdd, to:toAdd, value:web3.toWei(parseInt(value), 'ether')},
        function (error, hash) {
            const transInfo = web3.eth.getTransaction(hash, function (error, info) {
                ReactDOM.render(
                    <HashInfo
                        data={info}
                    />,
                    document.getElementById('status')
                )
            });
        })
        store.dispatch({type: 'ether_transfer', from: fromAdd, to: toAdd, value: value});
    }
}
const transferSimpleCoin = () => {
    $.getJSON('../../build/contracts/SimpleCoin.json', function (data) {
        const SimpleCoinArtifact = data;
        const SimpleCoin = TruffleContract(SimpleCoinArtifact);
        SimpleCoin.setProvider(web3Provider);
        ...
        ReactDOM.render(
            <HashInfo
                data={data}
            />,
            document.getElementById('status')
        )
        ...
        store.dispatch({type: 'simplecoin_transfer', from: fromAdd, to: toAdd, value: value});
    });
}
```