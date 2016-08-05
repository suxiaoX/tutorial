/*global todomvc, angular */
'use strict';
/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
todomvc.controller('TodoCtrl', function TodoCtrl($scope, $location, todoStorage, filterFilter) {
    // 从localStorage中获取todos
    var todos = $scope.todos = todoStorage.get();
    // 记录新的todo
    $scope.newTodo = '';
    // 记录编辑过的todo
    $scope.editedTodo = null;
    // 当todos的值改变时执行其中的方法
    $scope.$watch('todos', function (newValue, oldValue) {
        // 获取未完成的todos的数目
        $scope.remainingCount = filterFilter(todos, { completed: false }).length;
        // 获取已完成的todos的数目
        $scope.completedCount = todos.length - $scope.remainingCount;
        // 当且仅当$scope.remainingCount为0时，$scope.allChecked为true
        $scope.allChecked = !$scope.remainingCount;
        // 当todos的新值和旧值不相等时，向localStorage中存入todos
        if (newValue !== oldValue) { // This prevents unneeded calls to the local storage
            todoStorage.put(todos);
        }
    }, true);
    if ($location.path() === '') {
        // 如果$location.path()为空，就设置为/
        $location.path('/');
    }
    $scope.location = $location;
    // 当location.path()的值改变时执行其中的方法
    $scope.$watch('location.path()', function (path) {
        // 获取状态的过滤器
        // 如果path为'/active'，过滤器为{ completed: false }
        // 如果path为'/completed'，过滤器为{ completed: true }
        // 否则，过滤器为{}
        $scope.statusFilter = (path === '/active') ?
            { completed: false } : (path === '/completed') ?
            { completed: true } : {};
    });
    // 添加一个新的todo//绑定到todos里面
    $scope.addTodo = function () {
        var newTodo = $scope.newTodo.trim();
        if (!newTodo.length) {
            return;
        }
        // 向todos里添加一个todo，completed属性默认为false
        todos.push({
            title: newTodo,
            completed: false
        });
        // 置空
        $scope.newTodo = '';
    };
    // 编辑一个todo
    $scope.editTodo = function (todo) {
        $scope.editedTodo = todo;
        // Clone the original todo to restore it on demand.
        // 保存编辑前的todo，为恢复编辑前做准备
        $scope.originalTodo = angular.extend({}, todo);
    };
    // 编辑todo完成
    $scope.doneEditing = function (todo) {
        // 置空
        $scope.editedTodo = null;
        todo.title = todo.title.trim();
        if (!todo.title) {
            // 如果todo的title为空，则移除该todo
            $scope.removeTodo(todo);
        }
    };
    // 恢复编辑前的todo
    $scope.revertEditing = function (todo) {
        todos[todos.indexOf(todo)] = $scope.originalTodo;
        $scope.doneEditing($scope.originalTodo);
    };
    // 移除todo
    $scope.removeTodo = function (todo) {
        todos.splice(todos.indexOf(todo), 1);
    };
    // 清除已完成的todos
    $scope.clearCompletedTodos = function () {
        $scope.todos = todos = todos.filter(function (val) {
            return !val.completed;
        });
    };
    // 标记所有的todo的状态（true或false）
    $scope.markAll = function (completed) {
        todos.forEach(function (todo) {
            todo.completed = completed;
        });
    };
}); 