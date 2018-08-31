const initHandler = () => {
    $("#create-wallet-form-area").hide();
    $("#main-menu-area").hide();
    $("#create-identity-form-area").hide();
    $("#view-info-area").hide();
    $("#make-request-area").hide();
    $("#make-approve-area").hide();
    $("#view-approval-area").hide();
    $("#view-request-area").hide();

    $("#btn-login").click(function () {
        $("#login-form-area").hide(1000);
        $("#main-menu-area").show(1000);
    });
    
    /* Main menu */
    $("#btn-mm-create-wallet").click(function () {
        $("#main-menu-area").hide(1000);
        $("#create-wallet-form-area").show(1000);
    });
    $("#btn-mm-create-identity").click(function () {
        $("#main-menu-area").hide(1000);
        $("#create-identity-form-area").show(1000);
    });
    $("#btn-mm-view-info").click(function () {
        $("#main-menu-area").hide(1000);
        $("#view-info-area").show(1000);
    });
    $("#btn-mm-request").click(function () {
        $("#main-menu-area").hide(1000);
        $("#make-request-area").show(1000);
    })
    $("#btn-mm-view-approval").click(function () {
        $("#main-menu-area").hide(1000);
        $("#view-approval-area").show(1000);
    })
    $("#btn-mm-view-request").click(function () {
        $("#main-menu-area").hide(1000);
        $("#view-request-area").show(1000);
    })

    /* Sub menu */
    /* Create Wallet Menu */
    $("#btn-create-wallet").click(function () {
        createWallet();
    });
    $("#btn-return-main-menu-from-cw").click(function () {
        $("#create-wallet-form-area").hide(1000);
        $("#main-menu-area").show(1000);
    });

    /* Create Identity Menu */
    $("#btn-create-identity").click(function () {
        createIdentity();
    });
    $("#btn-return-main-menu-from-ci").click(function () {
        $("#create-identity-form-area").hide(1000);
        $("#main-menu-area").show(1000);
    });

    /* View Account Infomation */
    $("#btn-return-main-menu-from-view-info").click(function () {
        $("#view-info-area").hide(1000);
        $("#main-menu-area").show(1000);
    });

    /* Make Request */
    $("#btn-make-request").click(function () {
        makeRequest();
    });
    $("#btn-return-main-menu-from-make-request").click(function () {
        $("#make-request-area").hide(1000);
        $("#main-menu-area").show(1000);
    });

    /* Make Approve */
    $("#btn-return-main-menu-from-make-approve").click(function () {
        $("#make-approve-area").hide(1000);
        $("#main-menu-area").show(1000);
    });

    /* View Approval */
     $("#btn-update-view-approval").click(function () {
        viewApproval();
    });
    $("#btn-return-main-menu-from-view-approval").click(function () {
        $("#view-approval-area").hide(1000);
        $("#main-menu-area").show(1000);
    });

    /* View Request */
    $("#btn-update-view-request").click(function () {
        viewRequest();
    });
    $("#btn-return-main-menu-from-view-request").click(function () {
        $("#view-request-area").hide(1000);
        $("#main-menu-area").show(1000);
    });
}
