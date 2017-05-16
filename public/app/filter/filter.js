app.filter('convertdate', function () {
	return function(timestamp){
		var dt = new Date(timestamp)
		return dt.toDateString()
	}	
})

app.filter('activestatus', function () {
	return function(status){
		if(status)
			return 'Active'
		else
			return 'Inactive'
	}	
})

app.filter('verifiedstatus', function () {
	return function(status){
		if(status)
			return 'Verified'
		else
			return 'Pending'
	}	
})





