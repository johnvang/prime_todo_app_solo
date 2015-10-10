var app = angular.module('myApp', []);

app.controller("todoController", ['$scope', '$http', function($scope, $http){

    $scope.newTodo = "";
    $scope.dueDate = "";
    $scope.todayArray = [];
    $scope.tomorrowArray = [];
    $scope.laterArray = [];
    $scope.doneTodayArray = [];
    $scope.doneTomorrowArray = [];
    $scope.doneLaterArray = [];


    $scope.addTodo = function(){
        if($scope.dueDate == "Later") {
            $scope.laterArray.push($scope.newTodo);
        } else if ($scope.dueDate == "Tomorrow"){
            $scope.tomorrowArray.push($scope.newTodo);
        } else {
            $scope.todayArray.push($scope.newTodo);
        };
        $scope.newTodo = "";
    };


    $scope.deleteTaskToday = function(task){
        var index = $scope.todayArray.indexOf(task);
        $scope.todayArray.splice(index,1);
        console.log($scope.todayArray);
    };

    $scope.deleteTaskTomorrow = function(task){
        var index = $scope.tomorrowArray.indexOf(task);
        $scope.tomorrowArray.splice(index,1);
    };

    $scope.deleteTaskLater = function(task){
        var index = $scope.laterArray.indexOf(task);
        $scope.laterArray.splice(index,1);
    };

    $scope.doneToday = function(task){
        var index = $scope.todayArray.indexOf(task);
        $scope.doneTodayArray.push(task);
        $scope.todayArray.splice(index,1);
        console.log($scope.doneTodayArray);
    };

    $scope.doneTomorrow = function(task){
        var index = $scope.tomorrowArray.indexOf(task);
        $scope.doneTomorrowArray.push(task);
        $scope.tomorrowArray.splice(index,1);
        console.log($scope.doneTomorrowArray);
    };

    $scope.doneLater = function(task){
        var index = $scope.laterArray.indexOf(task);
        $scope.doneLaterArray.push(task);
        $scope.laterArray.splice(index,1);
        console.log($scope.doneLaterArray);
    };

    $scope.newDay = function(){
        $scope.todayArray = $scope.todayArray.concat($scope.tomorrowArray);
        console.log($scope.todayArray);
        $scope.tomorrowArray = [];
        $scope.doneTodayArray = [];
        $scope.doneTomorrowArray = [];
        $scope.doneLaterArray = [];
    };

}]);


