/* Init web3 */
var web3Provider = null;
if (typeof web3 !== 'undefined') {
    web3Provider = web3.currentProvider;
} else {
    web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}
web3 = new Web3(web3Provider);

const store = Redux.createStore(reducer)

const rootEl = document.getElementById('root')

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

const transferEther = () => {
    const fromAdd = document.getElementById('ether-from').value;
    const toAdd = document.getElementById('ether-to').value;
    const value = document.getElementById('ether-value').value;
    if (toAdd === '' || value === ''){
        store.dispatch({type: 'ether_transfer', from: fromAdd, to: toAdd, value: value});
        alert("Missing information");
    } else{
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
        });
    }
}

const getEtherBalance = () => {
    const address = document.getElementById('ether-address').value;
    if (address != ''){
        web3.eth.getBalance(address, function (error, result) {
            ReactDOM.render(
                <h3>{web3.fromWei(result.toNumber(), 'ether')} ether</h3>,
                document.getElementById('status')
            )
        });
        store.dispatch({type: 'ether_get_balance', address: address});
    }else
        store.dispatch({type: 'ether_get_balance', address: 'null'});
}

const transferSimpleCoin = () => {
    $.getJSON('../../build/contracts/SimpleCoin.json', function (data) {
        const SimpleCoinArtifact = data;
        const SimpleCoin = TruffleContract(SimpleCoinArtifact);
        SimpleCoin.setProvider(web3Provider);
        const fromAdd = document.getElementById('simplecoin-from').value;
        const toAdd = document.getElementById('simplecoin-to').value;
        const value = document.getElementById('simplecoin-value').value;
        if (toAdd === '' || value === ''){
            store.dispatch({type: 'simplecoin_transfer', from: fromAdd, to: toAdd, value: value});
            alert("Missing information");
        } else{
            web3.eth.getAccounts(function(error, accounts){
                SimpleCoin.deployed().then(function (instance) {
                    return instance.transfer(toAdd, parseInt(value), {from: accounts[0]});
                }).then(function(result) {
                    var transInfo = web3.eth.getTransaction(result.receipt.transactionHash, function (error, data) {
                        ReactDOM.render(
                            <HashInfo
                                data={data}
                            />,
                            document.getElementById('status')
                        )
                        store.dispatch({type: 'simplecoin_transfer', from: fromAdd, to: toAdd, value: value});
                    });
                }).catch(function(e) {
                    ReactDOM.render(<h4>Transaction error</h4>, document.getElementById('status'));
                });
            });
        }
    });
}

const getSimpleCoinBalance = () => {
    $.getJSON('../../build/contracts/SimpleCoin.json', function (data) {
        const SimpleCoinArtifact = data;
        const SimpleCoin = TruffleContract(SimpleCoinArtifact);
        SimpleCoin.setProvider(web3Provider);
        const address = document.getElementById('simplecoin-address').value;
        if (address != ''){
            web3.eth.getAccounts(function(error, accounts){
                SimpleCoin.deployed().then(function(instance) {
                    return instance.balanceOf.call(address, {from: accounts[0]});
                }).then(function(result) {
                    ReactDOM.render(<h4>{result.toNumber().toString()} SimpleCoin</h4>, document.getElementById('status'));
                }).catch(function(e) {
                    ReactDOM.render(<h4>Error call function</h4>, document.getElementById('status'));
                });
            });
            store.dispatch({type: 'simplecoin_get_balance', address: address});
        }
        else
            store.dispatch({type: 'simplecoin_get_balance', address: 'null'});
    });
}

render()
store.subscribe(render)