app.controller('admin',function ($scope,$state,adminSrvc) {
	
	console.log('admin controller loaded');
	$scope.user
	$scope.statusmsg = ''
	$scope.userList = []

	$scope.addLogin = function(){
		console.log($scope.user);
		adminSrvc.addLogin($scope.user).success(function(res){
			$scope.statusmsg=res.message;
		})	
	}

	function getUserList(){
		adminSrvc.getUserList().success(function(res){
			console.log(res.data);
			$scope.userList = res.data;
		})
	}
	getUserList();

	
});