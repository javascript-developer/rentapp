var app = angular.module('app',['ui.router','ngStorage']);

app.config(function ($stateProvider,$urlRouterProvider,$httpProvider) {
		
		$stateProvider			
		.state('login',{	
		    url: '/login',
		    controller:'login',
			templateUrl: 'app/templates/admin/login.html'	
		})
		.state('admindashboard',{	
		    url: '/admin/dashboard',
			templateUrl: 'app/templates/admin/dashboard.html'	
		})
		.state('adduser',{	
		    url: '/admin/add/login',
		    controller : 'admin',
			templateUrl: 'app/templates/admin/adduserlogin.html'	
		})
		.state('userconfig',{	
		    url: '/admin/add/login',
		    controller : 'admin',
			templateUrl: 'app/templates/admin/adduserconfig.html'	
		})
		.state('userlist',{	
		    url: '/admin/users',
		    controller : 'admin',
			templateUrl: 'app/templates/admin/userlist.html'	
		})

		$httpProvider.interceptors.push(function($location, $sessionStorage) {
            return {
                'request': function (config) {  
                    config.headers = config.headers || {};           
                    if ($sessionStorage.token) {
                        config.headers.token = $sessionStorage.token;
                    }
                    return config;
                }
            };
        });
});

app.run(function($rootScope,$transitions,$state,auth){
	$transitions.onSuccess({ },function(){
		if(!auth.isUserAuthenticated()){
			event.preventDefault(); 
			$state.go('login');
		}
	});
	$rootScope.$on('logOut',function(status){
		$state.go('login');
	})
})

