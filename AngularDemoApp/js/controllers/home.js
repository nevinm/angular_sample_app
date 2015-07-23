angular.module('app').
controller('HomeController', function ($scope, $resource, ApiService) {
    /*$http.get('news.json').success(function(data) {
		$scope.news = data;
	});*/
    var News = $resource(ApiService.url + '/newsupdates');
    var news = News.query(function () {
        $scope.news = news;
    });
});