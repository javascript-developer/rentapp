app.service('adminSrvc',function ($http) {
		
	this.addLogin = function(data){
		return $http({
			'url'    : 'api/admin/user',
			'method' : 'POST',
			'data'   : data
		});
	}

	this.getUserList = function(data){
		return $http({
			'url'    : 'api/admin/user',
			'method' : 'GET'
		});
	}
});