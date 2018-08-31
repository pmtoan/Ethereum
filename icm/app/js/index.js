/* Init web3 */
var web3Provider = null;
if (typeof web3 !== 'undefined') {
    web3Provider = web3.currentProvider;
} else {
    web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}
web3 = new Web3(web3Provider);
const setCoinBase = () => {
    web3.eth.getAccounts(function(error, accounts){
        $("#input-login-address").val(accounts[0].toString());            
    });
}
const createWallet = () => {
    $.getJSON('../../build/contracts/ICM.json', function (data) {
        const ICMArtifact = data;
        const ICM = TruffleContract(ICMArtifact);
        ICM.setProvider(web3Provider);
        const var_name = $("#input-cw-name").val();
        const var_email = $("#input-cw-email").val();
        const var_phone = $("#input-cw-phone").val();
        if (var_name != "" && var_email != "" && var_phone != ""){
            web3.eth.getAccounts(function(error, accounts){
                ICM.deployed().then(function (instance) {
                    return instance.addWallet(var_name, var_email, var_phone, {from: accounts[0]});
                }).then(function(result) {
                    if (result.logs.length == 0){
                        $("#create-wallet-error").html("Create wallet failed. Maybe wallet already exists on this address");
                    }else{
                        $("#create-wallet-result").html("Create wallet success");
                    }
                }).catch(function(e) {
                    console.log(e);
                });
            });
        }
    });
}

const createIdentity = () => {
    $.getJSON('../../build/contracts/ICM.json', function (data) {
        const ICMArtifact = data;
        const ICM = TruffleContract(ICMArtifact);
        ICM.setProvider(web3Provider);
        const var_name = $("#input-ci-name").val();
        const var_id_number = $("#input-ci-id-number").val();
        const var_date = $("#input-ci-date").val();
        const var_place = $("#input-ci-place").val();
        const var_license = $("#input-ci-license").val();
        if (var_name != "" && var_id_number != "" && var_date != "" && var_place != "" && var_license != ""){
            web3.eth.getAccounts(function(error, accounts){
                ICM.deployed().then(function (instance) {
                    return instance.addIdentity(var_name, var_id_number, var_date, var_place, var_license, {from: accounts[0]});
                }).then(function(result) {
                    if (result.logs.length == 0){
                        $("#create-identity-error").html("Create identity failed. Maybe identity already exists on this address");
                    }else{
                        $("#create-identity-result").html("Create identity success");
                    }
                }).catch(function(e) {
                    console.log(e);
                });
            });
        }
    });
}

const viewInfo = () => {
    $.getJSON('../../build/contracts/ICM.json', function (data) {
        const ICMArtifact = data;
        const ICM = TruffleContract(ICMArtifact);
        ICM.setProvider(web3Provider);
        web3.eth.getAccounts(function(error, accounts){
            ICM.deployed().then(function (instance) {
                return instance.getWallet.call(accounts[0]);
            }).then(function(result) {
                if (result.length != 0){
                    $("#name-wallet-info").val(result[0]);
                    $("#email-wallet-info").val(result[1]);
                    $("#phone-wallet-info").val(result[2]);
                }else{
                    console.log(result);
                }
            }).catch(function(e) {
                console.log(e);
            });
            ICM.deployed().then(function (instance) {
                return instance.getIdentity.call(accounts[0]);
            }).then(function(result) {
                if (result.length != 0){
                    $("#name-identity-info").val(result[0]);
                    $("#id-number-identity-info").val(result[1]);
                    $("#date-identity-info").val(result[2]);
                    $("#place-identity-info").val(result[3]);
                    $("#license-identity-info").val(result[4]);
                }else{
                    console.log(result);
                }
            }).catch(function(e) {
                console.log(e);
            });
        });
    });
}

const makeRequest = () => {
    var var_name = $("#name-checkbox-request").prop('checked');
    var var_id_number = $("#id-number-checkbox-request").prop('checked');
    var var_date = $("#date-checkbox-request").prop('checked');
    var var_place = $("#place-checkbox-request").prop('checked');
    var var_license = $("#license-checkbox-request").prop('checked');
    var var_address = $("#address-request").val();
    $.getJSON('../../build/contracts/ICM.json', function (data) {
        const ICMArtifact = data;
        const ICM = TruffleContract(ICMArtifact);
        ICM.setProvider(web3Provider);
        web3.eth.getAccounts(function(error, accounts){
            ICM.deployed().then(function (instance) {
                return instance.request(var_address, var_name, var_id_number, var_date, var_place, var_license, {from: accounts[0]});
            }).then(function(result) {
                $("#make-request-result").html("Make request success");
            }).catch(function(e) {
                console.log(e);
            });
        });
    });
}

const viewApproval = () => {
    document.getElementById('view-approval-list').innerHTML = "<div></div>";
    $("#view-approval-list").hide(1000);
    $.getJSON('../../build/contracts/ICM.json', function (data) {
        const ICMArtifact = data;
        const ICM = TruffleContract(ICMArtifact);
        ICM.setProvider(web3Provider);
        web3.eth.getAccounts(function(error, accounts){
            ICM.deployed().then(function (instance) {
                return instance.getClaimByRequester.call(accounts[0]);
            }).then(function(result) {
                result.forEach(function (id) {
                    ICM.deployed().then(function (instance) {
                        return instance.getClaimById.call(id);
                    }).then(function (sub_result) {
                        appendViewApproval(sub_result);
                    }).catch(function (e) {
                        console.log(e);
                    })
                });
            }).catch(function(e) {
                console.log(e);
            });
        });
    });
    $("#view-approval-list").show(1000);
}

const appendViewApproval = (result) => {
    const old_element = document.getElementById('view-approval-list').innerHTML;
    const new_element = "<div id='sub-view-approval-list'>\
                        <h3 class='h3'>" + result[1].toString() + "</h3>\
                        <table class='table-bordered'>\
                        <tr><td colspan='2'><b>Claim Infomation</b></td></tr>\
                        <tr> <td>ID</td> <td>" + result[0].toNumber().toString() + "</td> </tr>\
                        <tr> <td>To</td> <td>" + result[1].toString() + "</td> </tr>\
                        <tr> <td>From</td> <td>" + result[2].toString() + "</td> </tr>\
                        <tr> <td>Status</td> <td>" + result[3].toString() + "</td> </tr>\
                        <tr> <td colspan='2'><b>Identity Infomation</b></td> </tr>\
                        <tr> <td>Name</td> <td>" + result[4].toString() + "</td> </tr>\
                        <tr> <td>ID Number</td> <td>" + result[5].toString() + "</td> </tr>\
                        <tr> <td>Date</td> <td>" + result[6].toString() + "</td> </tr>\
                        <tr> <td>Place</td> <td>" + result[7].toString() + "</td> </tr>\
                        <tr> <td>License</td> <td>" + result[8].toString() + "</td> </tr>\
                        </table>\
                        <hr />\
                        </div>";
    document.getElementById('view-approval-list').innerHTML = old_element + new_element;
}

const viewRequest = () => {
    document.getElementById('view-request-list').innerHTML = "<div></div>";
    $("#view-request-list").hide(1000);
    $.getJSON('../../build/contracts/ICM.json', function (data) {
        const ICMArtifact = data;
        const ICM = TruffleContract(ICMArtifact);
        ICM.setProvider(web3Provider);
        web3.eth.getAccounts(function(error, accounts){
            ICM.deployed().then(function (instance) {
                return instance.getClaimByUser.call(accounts[0]);
            }).then(function(result) {
                result.forEach(function (id) {
                    ICM.deployed().then(function (instance) {
                        return instance.getClaimById.call(id);
                    }).then(function (sub_result) {
                        appendViewRequest(sub_result);
                    }).catch(function (e) {
                        console.log(e);
                    })
                });
            }).catch(function(e) {
                console.log(e);
            });
        });
    });
    $("#view-request-list").show(1000);
}

const approveForID = (table) => {
    $("#view-request-area").hide(1000);
    $("#make-approve-area").show(1000);
    const id = table.getElementsByTagName('tr')[1].getElementsByTagName('td')[1].innerHTML;
    const fromAddress = table.getElementsByTagName('tr')[3].getElementsByTagName('td')[1].innerHTML;
    $("#make-approve-claim-id").val(id);
    $("#make-approve-address-from").val(fromAddress);
    $("#btn-make-approve").click(function () {
        var var_id = $("#make-approve-claim-id").val();
        var var_name = $("#name-checkbox-approve").prop('checked');
        var var_id_number = $("#id-number-checkbox-approve").prop('checked');
        var var_date = $("#date-checkbox-approve").prop('checked');
        var var_place = $("#place-checkbox-approve").prop('checked');
        var var_license = $("#license-checkbox-approve").prop('checked');
        $.getJSON('../../build/contracts/ICM.json', function (data) {
            const ICMArtifact = data;
            const ICM = TruffleContract(ICMArtifact);
            ICM.setProvider(web3Provider);
            web3.eth.getAccounts(function(error, accounts){
                ICM.deployed().then(function (instance) {
                    return instance.approve(parseInt(var_id), var_name, var_id_number, var_date, var_place, var_license , {from: accounts[0]});
                }).then(function(result) {
                    $("#make-approve-result").html("Approved success");
                }).catch(function(e) {
                    console.log(e);
                });
            });
        });
    });
}

const appendViewRequest = (result) => {
    const old_element = document.getElementById('view-request-list').innerHTML;
    const new_element = "<div id='sub-view-request-list'>\
                        <h3 class='h3'>" + result[2].toString() + "</h3>\
                        <table class='table-bordered clickable' onclick='approveForID(this)'>\
                        <tr><td colspan='2'><b>Claim Infomation</b></td></tr>\
                        <tr> <td>ID</td> <td>" + result[0].toNumber().toString() + "</td> </tr>\
                        <tr> <td>To</td> <td>" + result[1].toString() + "</td> </tr>\
                        <tr> <td>From</td> <td>" + result[2].toString() + "</td> </tr>\
                        <tr> <td>Status</td> <td>" + result[3].toString() + "</td> </tr>\
                        <tr> <td colspan='2'><b>Identity Infomation</b></td> </tr>\
                        <tr> <td>Name</td> <td>" + result[4].toString() + "</td> </tr>\
                        <tr> <td>ID Number</td> <td>" + result[5].toString() + "</td> </tr>\
                        <tr> <td>Date</td> <td>" + result[6].toString() + "</td> </tr>\
                        <tr> <td>Place</td> <td>" + result[7].toString() + "</td> </tr>\
                        <tr> <td>License</td> <td>" + result[8].toString() + "</td> </tr>\
                        </table>\
                        <hr />\
                        </div>";
    document.getElementById('view-request-list').innerHTML = old_element + new_element;
}

ReactDOM.render(
    <IndexInterface />,
    document.getElementById('root')
)
initHandler()
setCoinBase()
viewInfo()
viewApproval()
viewRequest()