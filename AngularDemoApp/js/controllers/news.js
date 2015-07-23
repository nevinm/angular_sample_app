angular.module('app').controller('AddNewsController', function($scope, $location, $resource, ApiService, $routeParams, ngProgress) {
    var NewsUpdate = $resource(ApiService.url + '/newsupdate/id/:id', {
        id: '@id'
    });
    if ($routeParams.id) {
        var newsUpdate = NewsUpdate.get($routeParams, function() {
            $scope.newsupdate = newsUpdate;
        });
    } else {
        $scope.newsupdate = {
            title: '',
            description: ''
        };
    }

    $scope.saveNews = function() {
        ngProgress.start();
        var newsUpdate = new NewsUpdate($scope.newsupdate);
        newsUpdate.$save(function(response) {
            $scope.newsupdate = {
                title: '',
                description: ''
            };
            ngProgress.complete();
            $location.path("/news");
        });
    }
});