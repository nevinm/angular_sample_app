// JavaScript Document

var app = angular.module('app', ['ngResource', 'ngRoute', 'ngProgress']);
app.run(function ($rootScope, ngProgress) {
    $rootScope.$on('$routeChangeStart', function (ev, data) {
        ngProgress.start();
    });
    $rootScope.$on('$routeChangeSuccess', function (ev, data) {
        ngProgress.complete();
    });
});
app.config(function ($routeProvider, $locationProvider, $httpProvider) {

    //$locationProvider.html5Mode(true);
    $httpProvider.interceptors.push(function ($q, $location) {
        return {
            request: function (config) {
                return config;
            },

            response: function (result) {
                return result;
            },

            responseError: function (rejection) {
                console.log('Failed with ', rejection.status, ' status');
                if (rejection.status == 401) {
                    $location.url('/login');
                }
                return $q.reject(rejection);
            }
        }
    });
    $routeProvider.when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    });
    $routeProvider.when('/news', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
    });
    $routeProvider.when('/news/:id/edit', {
        templateUrl: 'views/addnews.html',
        controller: 'AddNewsController'
    });
    $routeProvider.when('/news/new', {
        templateUrl: 'views/addnews.html',
        controller: 'AddNewsController'
    });
    $routeProvider.when('/apiStuff', {
        templateUrl: 'views/apistuff.html',
        controller: 'ToDoController'
    });
    $routeProvider.when('/students', {
        templateUrl: 'views/students.html',
        controller: 'StudentController'
    });

    $routeProvider.otherwise({
        redirectTo: '/login'
    });
});

app.factory('ApiService', function () {
    return {
        url: 'http://localhost:88/angularjs-a-simple-application/api/news'
    };
});

app.controller('LoginController', function ($scope, $location) {
    //$scope.credentials = { username : "admin" , password: "123"};

    $scope.login = function () {
        if ($scope.credentials.username == "admin") {
            $location.path("/news");
        } else {
            alert('admin is ther username')
        }
    }
});
app.controller('AddNewsController', function ($scope, $location, $resource, ApiService, $routeParams, ngProgress) {
    var NewsUpdate = $resource(ApiService.url + '/newsupdate/id/:id', { id: '@id' });
    if ($routeParams.id) {
        var newsUpdate = NewsUpdate.get($routeParams, function () {
            $scope.newsupdate = newsUpdate;
        });
    } else {
        $scope.newsupdate = { title: '', description: '' };
    }
    /*var News = $resource(ApiService.url + '/newsupdates');
	var news = News.query(function() {
		$scope.news = news;
	});*/

    $scope.saveNews = function () {
        ngProgress.start();
        var newsUpdate = new NewsUpdate($scope.newsupdate);
        newsUpdate.$save(function (response) {
            $scope.newsupdate = { title: '', description: '' };
            ngProgress.complete();
            $location.path("/news");
        });
    }
});
app.controller('HomeController', function ($scope, $resource, ApiService) {
    /*$http.get('news.json').success(function(data) {
		$scope.news = data;
	});*/
    var News = $resource(ApiService.url + '/newsupdates');
    var news = News.query(function () {
        $scope.news = news;
    });
});

app.controller("ToDoController", function ($scope, $resource) {
    $scope.Update = $resource('http://10.6.0.202:8000/sample/news/updates');
    var stuff = $scope.Update.query(function () {
        $scope.data = stuff;
    });

    $scope.addStuff = function (stuff) {
        var UpdatedValue = new $scope.Update($scope.stuff);
        UpdatedValue.$save();
        console.log($scope.data)
    };

    $scope.deleteStuff = function (index, stuff) {
        var Note = $resource('http://10.6.0.202:8000/sample/news/updates', {}, {
            destroy: {
                method: 'DELETE',
                url: "http://10.6.0.202:8000/sample/news/updates/" + stuff.id
            }
        });
        var deleteNote = new Note();
        deleteNote.$destroy(function (response) {
            var index = $scope.data.indexOf(stuff)
            $scope.data.splice(index, 1);
        }, function (response) {
        });
    };

    $scope.editStuff = function () {

    };
});

app.controller("StudentController", function ($scope) {
    var studentDatabase = [{
        name: "Nevin",
        age: 23,
        branch: "CS"
    }, {
        name: "Ramath",
        age: 27,
        branch: "EC"
    }, {
        name: "Vignesh",
        age: 25,
        branch: "Yo"
    }];
    $scope.studentDatabase = studentDatabase;

    $scope.addStudent = function () {
        this.studentDatabase.push(this.student);
        this.student = '';
    }

    $scope.deleteStudent = function (index) {
        $scope.studentDatabase.splice(index, 1);
    }

    $scope.editStudent = function () {
    }
});

