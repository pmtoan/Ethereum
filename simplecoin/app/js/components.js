class Contract extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { action, coinbase, etherTransfer, etherGetBalance, simplecoinTransfer, simplecoinGetBalance } = this.props
        return (
            <div id='content'>
                <div id='ether'>
                    <h2>Ether transfer</h2>
                    <label>From </label>
                    <input type='text' id='ether-from' disabled value={coinbase} />
                    <div><br /></div>
                    <label>To </label>
                    <input type='text' id='ether-to' />
                    <div><br /></div>
                    <label>Value </label>
                    <input type='text' id='ether-value' />
                    <div><br /></div>
                    <button onClick={etherTransfer}>Send</button>
                    <h2>Ether Balance</h2>
                    <label>Address </label>
                    <input type='text' id='ether-address' />
                    <div><br /></div>
                    <button onClick={etherGetBalance}>BalanceOf</button>
                </div>
                <div id='simplecoin'>
                    <h2>SimpleCoin transfer</h2>
                    <label>From </label>
                    <input type='text' id='simplecoin-from' disabled value={coinbase} />
                    <div><br /></div>
                    <label>To </label>
                    <input type='text' id='simplecoin-to' />
                    <div><br /></div>
                    <label>Value </label>
                    <input type='text' id='simplecoin-value' />
                    <div><br /></div>
                    <button onClick={simplecoinTransfer}>Send</button>
                    <h2>SimpleCoin Balance</h2>
                    <label>Address </label>
                    <input type='text' id='simplecoin-address' />
                    <div><br /></div>
                    <button onClick={simplecoinGetBalance}>BalanceOf</button>
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
                <h4>blockHash: {data.blockHash}</h4>
                <h4>blockNumber: {data.blockNumber}</h4>
                <h4>transactionIndex: {data.transactionIndex}</h4>
                <h4>from: {data.from}</h4>
                <h4>to: {data.to}</h4>
                <h4>value: {web3.fromWei(data.value.toNumber(), 'ether')}</h4>
                <h4>gas: {data.gas}</h4>
                <h4>gasPrice: {data.gasPrice.toNumber()}</h4>
                <h4>input: {data.input}</h4>
            </div>
        )
    }
}