$(document).ready(function() {
    web3Provider: null;
    if (typeof web3 !== 'undefined') {
        web3Provider = web3.currentProvider;
    } else {
        // If no injected web3 instance is detected, fall back to Ganache
        web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(web3Provider);
    web3.eth.getAccounts(function(error, accounts){
        $("#ethfrom").val(accounts[0]);
        $("#ethfrom").attr('disabled','disabled');
        $("#simplecoinfrom").val(accounts[0]);
        $("#simplecoinfrom").attr('disabled','disabled');
    });
    $.getJSON('../build/contracts/SimpleCoin.json', function(data) {
        // Get the necessary contract artifact file and instantiate it with truffle-contract
        var SimpleCoinArtifact = data;
        SimpleCoin = TruffleContract(SimpleCoinArtifact);
        // Set the provider for our contract
        SimpleCoin.setProvider(web3Provider);
        $('#simplecoin-send-button').click(function() {
            if ($('#simplecointo').val() == '' || $('#simplecoinvalue').val() == ''){
                alert("Missing information");
            }else{
                web3.eth.getAccounts(function(error, accounts){
                    var meta;
                    SimpleCoin.deployed().then(function (instance) {
                        meta = instance;
                        console.log(meta);
                        return meta.transfer($('#simplecointo').val(), parseInt($('#simplecoinvalue').val()), {from: accounts[0]});
                    }).then(function(result) {
                        var transInfo = web3.eth.getTransaction(result.receipt.transactionHash, function (error, data) {
                            showTransactionInfo('#simplecoininfo', data);
                        });
                    }).catch(function(e) {
                        $("#simplecoininfo").html("<h3>Transaction Error</h3>");
                    });
                });
            }
        });
    });
    $('#simplecoin-balance').click(function () {
        if ($('#simplecoin-address').val() == ""){
            alert("Missing information");
            return;
        }
        web3.eth.getAccounts(function(error, accounts){
            SimpleCoin.deployed().then(function(instance) {
                meta = instance;
                return meta.balanceOf.call($('#simplecoin-address').val(), {from: accounts[0]});
            }).then(function(result) {
                console.log(result.toNumber());
                $('#simplecoin-balance-info').html("<h3>" + result.toNumber().toString() + " SimpleCoin</h3>");
            }).catch(function(e) {
                 $('#simplecoin-balance-info').html("<h3>Error call function</h3>");
            });
        });
    })
    $('#eth-send-button').click(function() {
        if ($('#eth-ad').val() == '' || $('#ethvalue').val() == ''){
            alert("Missing information");
        }
        else{
            web3.eth.getAccounts(function(error, accounts){
                web3.eth.sendTransaction({
                    from:accounts[0], to:$('#ethto').val(), value:web3.toWei(parseInt($('#ethvalue').val()), "ether")},
                    function (error, hash) {
                        var transInfo = web3.eth.getTransaction(hash, function (error, info) {
                            showTransactionInfo('#ethinfo', info);
                        });
                    }
                );
            });
        }
    });
    $('#ether-balance').click(function () {
        if ($('#ether-address').val() == ""){
            alert("Missing information");
        }
        else{
            web3.eth.getBalance($('#ether-address').val(), function (error, result) {
                $('#ether-balance-info').html("<h3>" + web3.fromWei(result.toNumber(), 'ether') + " ether </h3>");
            });
        }
    })
    var showTransactionInfo = function (itag, data) {
        var infoText = ("<h4>    hash: " + data.hash + "</h4>");
        infoText += ("<h4>    nonce: " + data.nonce + "</h4>");
        infoText += ("<h4>    blockHash: " + data.blockHash + "</h4>");
        infoText += ("<h4>    blockNumber: " + data.blockNumber + "</h4>");
        infoText += ("<h4>    transactionIndex: " + data.transactionIndex + "</h4>");
        infoText += ("<h4>    from: " + data.from + "</h4>");
        infoText += ("<h4>    to: " + data.to + "</h4>");
        infoText += ("<h4>    value: " + data.value.toNumber() + "</h4>");
        infoText += ("<h4>    gas: " + data.gas + "</h4>");
        infoText += ("<h4>    gasPrice: " + data.gasPrice.toNumber() + "</h4>");
        infoText += ("<h4>    input: " + data.input + "</h4>");
        $(itag).html(infoText);
    }
});