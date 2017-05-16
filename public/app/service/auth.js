app.service('auth',function ($rootScope,$http,$sessionStorage) {
	var user = {
		'isAuthenticated' : false
	};

	this.doLogin= function(data){
		return $http({
			'url'    : 'api/login',
			'method' : 'POST',
			'data'   : data
		});
	},

	this.saveToken = function(token){
		$sessionStorage.token = token;
		user = JSON.parse(atob(token.split('.')[1]));
		user.isAuthenticated = true;
		$rootScope.user = user;
		return user.type;
	}

	this.isUserAuthenticated = function(){
		if($sessionStorage.token==undefined)
			return false;
		else{
			var token = $sessionStorage.token;
			user = JSON.parse(atob(token.split('.')[1]));
			user.isAuthenticated = true;
			$rootScope.user = user;
			$rootScope.$broadcast('loginSuccess',user);
			return user.isAuthenticated;
		}
	}

	this.logOut = function(){
		user = {
			'isAuthenticated' : false
		}
		delete $rootScope.user;
		delete $sessionStorage.token;
		$rootScope.$broadcast('logOut',true);
	}
	
});