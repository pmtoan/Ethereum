class LoginForm extends React.Component{
	constructor(props) {
        super(props);
    }
    render(){
    	return(
    	<div class="content-area" id="login-form-area">
    		<div class="form-group">
            <h3 class="h3">Login</h3>
    		<input type="text" class="form-control" name="address" id="input-login-address" disabled /><br />
    		<button class="btn btn-primary" id="btn-login">Login</button>
    		</div>
    	</div>)
    }
}
class CreateWalletForm extends React.Component{
	constructor(props) {
        super(props);
    }
    render(){
    	return(
    	<div class="content-area" id="create-wallet-form-area">
    		<div class="form-group">
            <h3 class="h3">Create Wallet</h3>
    		<input type="text" class="form-control" name="name" id="input-cw-name" placeholder="name" /><br />
    		<input type="email" class="form-control" name="email" id="input-cw-email" placeholder="email" /><br />
    		<input type="phone" class="form-control" name="phone" id="input-cw-phone" placeholder="phone" /><br />
    		<p class="text-danger" id="create-wallet-error"></p>
    		<button class="btn btn-primary" id="btn-create-wallet">Create Wallet</button><br/>
    		<button class="btn btn-primary" id="btn-return-main-menu-from-cw">Main Menu</button>
    		<p class="text-success" id="create-wallet-result"></p>
    		</div>
    	</div>)
    }
}

class CreateIdentity extends React.Component{
	constructor(props) {
        super(props);
    }
    render(){
    	return(
    	<div class="content-area" id="create-identity-form-area">
    		<div class="form-group">
            <h3 class="h3">Create Identity</h3>
    		<input type="text" class="form-control" name="name" id="input-ci-name" placeholder="name" /><br />
    		<input type="text" class="form-control" name="id-number" id="input-ci-id-number" placeholder="id number" /><br />
    		<input type="text" class="form-control" name="date" id="input-ci-date" placeholder="date" /><br />
    		<input type="text" class="form-control" name="place" id="input-ci-place" placeholder="place" /><br />
    		<input type="text" class="form-control" name="license" id="input-ci-license" placeholder="license" /><br />
    		<p class="text-danger" id="create-identity-error"></p>
    		<button class="btn btn-primary" id="btn-create-identity">Create Identity</button><br />
    		<button class="btn btn-primary" id="btn-return-main-menu-from-ci">Main Menu</button>
    		<p class="text-success" id="create-identity-result"></p>
    		</div>
    	</div>)
    }
}

class ViewInfo extends React.Component{
	constructor(props) {
        super(props);
    }
    render(){
    	return (
    		<div class="content-area" id="view-info-area">
    			<div class="sub-content-area">
    				<h3 class="h3">Wallet</h3>
    				<input type="text" class="form-control" id="name-wallet-info" disabled /><br />
    				<input type="text" class="form-control" id="email-wallet-info" disabled /><br />
    				<input type="text" class="form-control" id="phone-wallet-info" disabled /><br />
    			</div>
    			<div class="sub-content-area">
    				<h3 class="h3">Identity</h3>
    				<input type="text" class="form-control" id="name-identity-info" disabled /><br />
    				<input type="text" class="form-control" id="id-number-identity-info" disabled /><br />
    				<input type="text" class="form-control" id="date-identity-info" disabled /><br />
    				<input type="text" class="form-control" id="place-identity-info" disabled /><br />
    				<input type="text" class="form-control" id="license-identity-info" disabled /><br />
    			</div>
    			<div>
    			<button class="btn btn-primary" id="btn-return-main-menu-from-view-info">Main Menu</button>
    			</div>
    		</div>
    	)
    }
}

class MakeRequest extends React.Component{
	constructor(props) {
        super(props);
    }
    render(){
    	return(
    		<div class="content-area" id="make-request-area">
    			<div>
    				<input type="text" class="form-control" id="address-request" placeholder="address"/><br />
    				<div class="form-check">
    				<input type="checkbox" class="form-check-input" id="name-checkbox-request" />
    				<label class="form-check-label" for="name-checkbox-request">name</label>
    				</div>
    				<div class="form-check">
    				<input type="checkbox" class="form-check-input" id="id-number-checkbox-request" />
    				<label class="form-check-label" for="id-number-checkbox-request">id number</label>
    				</div>
    				<div class="form-check">
    				<input type="checkbox" class="form-check-input" id="date-checkbox-request" />
    				<label class="form-check-label" for="date-checkbox-request">date</label>
    				</div>
    				<div class="form-check">
    				<input type="checkbox" class="form-check-input" id="place-checkbox-request" />
    				<label class="form-check-label" for="place-checkbox-request">place</label>
    				</div>
    				<div class="form-check">
    				<input type="checkbox" class="form-check-input" id="license-checkbox-request" />
    				<label class="form-check-label" for="license-checkbox-request">license</label>
    				</div>
    				<button class="btn btn-primary" id="btn-make-request">Make Request</button><br />
    				<button class="btn btn-primary" id="btn-return-main-menu-from-make-request">Main Menu</button><br />
    				<blockquote class="blockquote">
    					<p class="text-success" id="make-request-result"></p>
    				</blockquote>
    			</div>
    		</div>
    	)
    }
}

class ViewApprovals extends React.Component{
	constructor(props) {
        super(props);
    }
    render(){
    	return(
    		<div class="content-area" id="view-approval-area">
    		<div id="view-approval-list">
    		</div>
    		<div>
    			<button class="btn btn-primary" id="btn-update-view-approval">Update</button><br />
    			<button class="btn btn-primary" id="btn-return-main-menu-from-view-approval">Main Menu</button><br />
    		</div>
    		</div>
    	)
    }
}

class ViewRequests extends React.Component{
	constructor(props) {
        super(props);
    }
    render(){
    	return(
    		<div class="content-area" id="view-request-area">
    		<div id="view-request-list">
    		</div>
    		<div>
    			<button class="btn btn-primary" id="btn-update-view-request">Update</button><br />
    			<button class="btn btn-primary" id="btn-return-main-menu-from-view-request">Main Menu</button><br />
    		</div>
    		</div>
    	)
    }
}

class MakeApprove extends React.Component{
	constructor(props) {
        super(props);
    }
    render(){
    	return(
    		<div class="content-area" id="make-approve-area">
    			<div>
    				<input type="text" class="form-control" id="make-approve-address-from" disabled/><br />
    				<input type="text" class="form-control" id="make-approve-claim-id" disabled/><br />
    				<div class="form-check">
    				<input type="checkbox" class="form-check-input" id="name-checkbox-approve" />
    				<label class="form-check-label" for="name-checkbox-approve">name</label>
    				</div>
    				<div class="form-check">
    				<input type="checkbox" class="form-check-input" id="id-number-checkbox-approve" />
    				<label class="form-check-label" for="id-number-checkbox-approve">id number</label>
    				</div>
    				<div class="form-check">
    				<input type="checkbox" class="form-check-input" id="date-checkbox-approve" />
    				<label class="form-check-label" for="date-checkbox-approve">date</label>
    				</div>
    				<div class="form-check">
    				<input type="checkbox" class="form-check-input" id="place-checkbox-approve" />
    				<label class="form-check-label" for="place-checkbox-approve">place</label>
    				</div>
    				<div class="form-check">
    				<input type="checkbox" class="form-check-input" id="license-checkbox-approve" />
    				<label class="form-check-label" for="license-checkbox-approve">license</label>
    				</div>
    				<button class="btn btn-primary" id="btn-make-approve">Make Approve</button><br />
    				<button class="btn btn-primary" id="btn-return-main-menu-from-make-approve">Main Menu</button><br />
    				<blockquote class="blockquote">
    					<p class="text-success" id="make-approve-result"></p>
    				</blockquote>
    			</div>
    		</div>
    	)
    }
}

class MainMenu extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div class="content-area" id="main-menu-area">
				<div class="sub-content-area">
					<h3 class="h3">User Menu</h3>
					<button class="btn btn-primary" id="btn-mm-view-info">Account</button><br />
					<button class="btn btn-primary" id="btn-mm-create-wallet">Create Wallet</button><br />
					<button class="btn btn-primary" id="btn-mm-create-identity">Create Identity</button><br />
					<button class="btn btn-primary" id="btn-mm-view-request">View Request</button>
				</div>
				<div class="sub-content-area">
					<h3 class="h3">Requester Menu</h3>
					<button class="btn btn-primary" id="btn-mm-request">Request</button><br />
					<button class="btn btn-primary" id="btn-mm-view-approval">View Approval</button>
					<button class="btn btn-primary" id="btn-mm-log-out">Log out</button>
				</div>
			</div>
		)
	}
}

class IndexInterface extends React.Component{
	constructor(props) {
        super(props);
    }
    render(){
    	return(
    		<div>
    		<LoginForm />
    		<MainMenu />
    		<CreateWalletForm />
    		<CreateIdentity />
    		<ViewInfo />
    		<MakeRequest />
    		<MakeApprove />
    		<ViewApprovals />
    		<ViewRequests />
    		</div>
    	)
    }
}