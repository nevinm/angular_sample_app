angular.module('app').
controller("StudentController", function($scope, StudentService) {
    var studentDatabase = StudentService.getStudentData();
    $scope.studentDatabase = studentDatabase;

    $scope.addStudent = function() {
        this.studentDatabase.push(this.student);
        this.student = '';
    }

    $scope.deleteStudent = function(index) {
        $scope.studentDatabase.splice(index, 1);
    }

    $scope.editStudent = function() {}
});