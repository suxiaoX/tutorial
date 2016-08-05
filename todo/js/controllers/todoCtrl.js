todoMvc
.controller("todoCtrl",["$scope","$routeParams,$filter","store",

function($scope,$routeParams,$filter,store){
	
	"use strict"
	
	
//	$scope.parentCall = function(){
//      console.log("parent call");
//  };
//  $scope.$on('call parent',function(){
//      console.log("接受到子控制器发射的事件");
//  });
    
    
	var todos = $scope.todos = store.todos;//从localStorage上获取数据
	
	console.log(todos);
	
	$scope.newTodo = ""; //新增加的数据
	
	$scope.editedTodo = null; //编辑的数据
	
	$scope.$watch('todos',function(){//监听数据变化将要做的操作
		
		$scope.remainingCount = $filter('filter')(todos,{ completed : false}).length;//未选中的数据
		$scope.completedCount = todos.length - $scope.remainingCount;//选中的数据
		$scope.allChecked = !$scope.remainingCount;//如果全选不等于选中的数量，即没有全部选中
		
	},true);
	
	$scope.$on('$routeChangeSuccess',function(){//$on 监听被发射的事件
		
		var status = $scope.status = $routeParams.status || "" ;
		
		$scope.statusFilter = (status === 'active') ?
			
			{ completed : false } : ( status === "completed") ?
			{ completed : true  } : {};		
	});
	
	$sccope.addTodo = function(){//增加新的数据，这个有submit默认事件触发
		var newTodo = {
			
			title: $scope.newTodo.trim(),
			completed : false
			
		};
		
		if(!newTodo.title){
			return;
		}
		
		$scope.saving = true;
		
		store.insert(newTodo)
			.then(function success(){
				$scope.newTodo = "";				
			})
			.finally(function(){
				$scope.saving = false;				
			})
	};
	
	$scope.editTodo = function(todo){
		
		$scope.eidtedTodo = todo;		
		$scope.originalTodo = angular.extend({},todo);	//双击编辑名字的时候，修改名字			
	};
	$scope.saveEdits = function(todo,event){
		if(event === 'blur' && $scope.saveEvent === 'submit'){
			$scope.saveEvent = null;
			return;
		}
		
		$scope.saveEvent = event;
		
		if($scope.reverted) {
			$scope.revertd = null;
			return
		}
		
		todo.title = todo.title.trim();
		
		if(todo.title === $scope.originalTodo.title){
			
			$scope.editedTodo =  null;
			return
		}
		
		store[todo.title ? 'put' : 'delete'](todo)
			.then(function success(){},function error(){
				todo.title = $scope.originalTodo.title;
			})
			.finally(function(){
				$scope.editedTodo = null;
			})
	};
	
	$scope.reverEdits = function(todo){
		todo[todos.indexOf(todo)] = $scope.originalTodo;
		$scope.editedTodo = null;
		$scope.originalTodo = null;
		$scope.revered = true;
	}
	
	$scope.removeTodo = function(todo){
		store.delete(todo);
	}
	
	$scope.saveTodo = function(todo){
		store.put(todo);
	}
	
	$scope.toggleCompleted = function(todo,completed){
		if(angular.isDefined(completed)){
			todo.completed = completed;
		}
		store.put(todo,todos.indexOf(todo))
			.then(function success(){},function error(){
				todo.completed = !todo.completed;
			})
	}
	
	$scope.clearCompletedTodos = function(){
		store.clearCompleted();
	}
	
	$scope.markAll = function(completed){
		todos.forEach(function(todo){
			if(todo.completed !== completed){
				$scope.toggleCompleted(todo,completed);
			}
		})
	}
}])