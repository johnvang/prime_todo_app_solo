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


    //add new task to respective list
    $scope.addTodo = function(){
        var todo = {description: $scope.newTodo, completed: false, when: $scope.dueDate};
        $http({
            method: 'POST',
            url: "/todos",
            data: todo
        }).then(function(response){
            console.log('Success!' + response);
            if($scope.dueDate == "Later") {
                $scope.laterArray.push($scope.newTodo);
            } else if ($scope.dueDate == "Tomorrow"){
                $scope.tomorrowArray.push($scope.newTodo);
            } else {
                $scope.todayArray.push($scope.newTodo);
            };
            $scope.newTodo = "";
            $scope.getTodos();
        });
    };

    //delete task from DB
    $scope.deleteTask = function(task){
        $http({
            method: 'POST',
            url: "/deleteTodos",
            data: task
        }).then(function(){
            $scope.getTodos()
        });
    };

    $scope.taskDone = function(task){
        console.log(task);
        $http({
            method: 'POST',
            url: "/updateTodos",
            data: JSON.stringify(task)
        }).then(function(){
            console.log(task);
            console.log("post request to server for update successful");
        });
    };

    ////remove done tasks from respective lists
    //$scope.doneToday = function(task){
    //    var index = $scope.todayArray.indexOf(task);
    //    index.complete = true;
    //    $scope.doneTodayArray.push(task);
    //    $scope.todayArray.splice(index,1);
    //};
    //$scope.doneTomorrow = function(task){
    //    var index = $scope.tomorrowArray.indexOf(task);
    //    index.complete = true;
    //    $scope.doneTomorrowArray.push(task);
    //    $scope.tomorrowArray.splice(index,1);
    //};
    //$scope.doneLater = function(task){
    //    var index = $scope.laterArray.indexOf(task);
    //    index.complete = true;
    //    $scope.doneLaterArray.push(task);
    //    $scope.laterArray.splice(index,1);
    //};


    //refresh lists by removing done tasks from all lists, tomorrows tasks becomes today's tasks
    $scope.newDay = function(){
        $scope.todayArray = $scope.todayArray.concat($scope.tomorrowArray);
        $scope.tomorrowArray = [];
        $scope.doneTodayArray = [];
        $scope.doneTomorrowArray = [];
        $scope.doneLaterArray = [];
    };

    $scope.getTodos = function(){
        //console.log("getting todos");
        $scope.todayArray = [];
        $scope.tomorrowArray = [];
        $scope.laterArray = [];
        $http.get('/getTodos').then(function(response){
            angular.forEach(response.data, function(task){
                //var arrayItem = [task.description, task._id]
                if (task.when == "Today"){
                    $scope.todayArray.push(task);
                } else if (task.when == "Tomorrow"){
                    $scope.tomorrowArray.push(task);
                } else if (task.when == "Later"){
                    $scope.laterArray.push(task);
                }
            });
        });
    };

    //update tasks in DB
    //$scope.updateTodos = function(){}

    $scope.getTodos();

}]);


