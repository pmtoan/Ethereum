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