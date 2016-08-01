'use strict';
angular.module("todoApp", [])
    .controller('TodoListController', ['$scope', '$http', function($scope, $http) {
        $scope.todos = [
            "Clean house",
            "Eat pie",
            "Giggity"
        ];
        $scope.newTodo = "";

        $scope.reloadTodos = function() {
            $http.get('api/todos').then(function success(response) {
                $scope.todos = response.data;
                console.log($scope.todos);
            }, function error(response) {
                console.log(response);
            });
        };

        $scope.addTodo = function() {
            console.log("Todo added: " + $scope.newTodo);
            $http( {
                url : "api/todos",
                method : "POST",
                data : {complete: false, todo: $scope.newTodo},
                headers: {"Content-Type": "application/json;charset=utf-8"}
            } )
            .then(function success(response) {
                console.log("Successfully added todo");
                $scope.reloadTodos();
                $scope.newTodo = "";
            }, function error(response) {
                console.log("Error adding todo");
            });
        };

        $scope.completedTodo = function(todo) {
            //var data = JSON.stringify({"_id": todo._id});
            //console.log(data);
            $http( {
                url : "api/todos",
                method : "DELETE",
                data: {_id: todo._id}, 
                headers: {"Content-Type": "application/json;charset=utf-8"}
            } )
            .then(function success(response) {
                console.log(response);
                console.log("Successfuly deleted todo");
                $scope.reloadTodos();
            }, function error(response) {
                console.log("Error deleting todo");
            });

        };

        $scope.reloadTodos();
    
    }]);