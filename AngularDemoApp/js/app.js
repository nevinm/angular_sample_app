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

    $httpProvider.interceptors.push(function ($q, $location) {
        return {
            request: function (config) {
                return config;
            },

            response: function (result) {
                return result;
            },

            responseError: function (rejection) {
                console.warn('Failed with ', rejection.status, ' status');
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
