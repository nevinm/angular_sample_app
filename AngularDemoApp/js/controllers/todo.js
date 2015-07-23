angular.module('app').
controller("ToDoController", function($scope, $resource) {
    $scope.Update = $resource('http://10.6.0.202:8000/sample/news/updates');
    var stuff = $scope.Update.query(function() {
        $scope.data = stuff;
    });

    $scope.addStuff = function(stuff) {
        var UpdatedValue = new $scope.Update($scope.stuff);
        UpdatedValue.$save();
        console.log($scope.data)
    };

    $scope.deleteStuff = function(index, stuff) {
        var Note = $resource(NEWS_UPDATES_API, {}, {
            destroy: {
                method: 'DELETE',
                url: NEWS_UPDATES_API + stuff.id
            }
        });
        var deleteNote = new Note();
        deleteNote.$destroy(function(response) {
            var index = $scope.data.indexOf(stuff)
            $scope.data.splice(index, 1);
        }, function(response) {});
    };

    $scope.editStuff = function() {
        // to do
    };
});