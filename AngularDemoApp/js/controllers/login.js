angular.module('app').controller('LoginController', function($scope, $location) {
	$scope.login = function() {
		if ($scope.credentials.username == "admin") {
			$location.path("/news");
		} else {
			alert('admin is ther username')
		}
	}
});