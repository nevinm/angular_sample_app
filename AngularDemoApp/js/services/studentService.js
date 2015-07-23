angular.module('app').factory('StudentService', function($http) {
    return {
        getStudentData: function() {
            return $http.get(GET_STUDENT_API).then(function(response) {
                return response;
            });
        };
    };
});
