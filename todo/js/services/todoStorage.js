todoMvc
	
	.factory("todoStorage",function($http,$injector){
		
		"use strict";
		
		return $http.get('/api')
			.then(function(){
				return $injector.get('api');
			})
			.then(function(){
				return $injector.get('localStorage');
			})		
	})
	
	.factory('api',function($http){
		
		"use strict";
		
		var store = {
			
			todos : [],//总的数据
			
			clearCompleted: function(){//清除已经选中的
				
				var originalTodos = store.todos.slice(0);
				
				var completedTodos = [];//选中的
				var incompletedTodos = [];//未选中的
				
				store.todos.forEach(function(todo){
					if(todo.completed){
						completedTodos.push(todo);
					}else{
						incompletedTodos.push(todo);
					}
				});
				
				angular.copy(incompletedTodos,store.todos)//将没有选中的存到localStorage中
				
				return $http.delete('/api/todos')
					.then(function success(){
						return store.todos;
					})
					.then(function error(){
						angular.copy(originalTodos,store.todos)//将store.todos值复制给originalTodos
						return originalTodos;//返回originalTodos
					})
			},
			
			delete:function(todo){
				var originalTodos = store.todos.slice(0);
				store.todos.splice(store.todos.indexOf(todo),1);//删除数据，当前位数
				
				return $http.delete('/api/todos/' + todo.id)
					.then(function success(){
						return store.todos;
					})
					.then(function error(){
						angular.copy(originalTodos,store.todos);
						return originalTodos;
					})
			},
			
			get: function(){
				return $http.get('api/todos')
					.then(function success(resp){
						angular.copy(resp.data,store.todos);
						return store.todos;
					})
			},
			
			insert: function(todo){
				var originalTodos = store.todos.slice(0);
				return $http.post('/api/todos')
					.then(function success(resp){
						todo.id = resp.data.id;
						store.todos.push(todo);
						return store.todos;
					},function error(){
						angular.copy(originalTodos,store.todos);
						return store.todos;
					})
			},
			
			put: function(todo){
				var originalTodos = store.todos.slice(0);
				return $http.put('/api/todos/' + todo.id,todo)
					.then(function success(){
						return store.todos;
					},function error(){
						angular.copy(originalTodos,store.todos);
						return originalTodos;
					})
			}
		};
		
		return store;
		
	})
	
	.factory('localStorage',function($q){
		
		"use strict";
		
		var STORAGE_ID = "todos-angularjs";
		
		var store = {
			
			todos:[],
			
			_getFromLocalStorage: function () {//封装方法，获取本地存储的数据
				return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
			},

			_saveToLocalStorage: function (todos) {//封装方法，存储数据到本地存储
				localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
			},
			
			clearCompleted: function(){
				var deferred = $q.defer();
				var completedTodos = [];
				var incompletedTodos =[];
				store.todos.forEach(function(todo){
					if (todo.completed) {
						completeTodos.push(todo);
					} else {
						incompleteTodos.push(todo);
					}
				});
				
				angular.copy(incompleteTodos, store.todos);
				store._saveToLocalStorage(store.todos);
				deferred.resolve(store.todos);

				return deferred.promise;
			},
			
			delete: function(todo){
				var deferred = $q.defer();
				store.todos.splice(store.todos.indexOf(todo), 1);

				store._saveToLocalStorage(store.todos);
				deferred.resolve(store.todos);

				return deferred.promise;
			},
			
			get: function(){
				var deferred = $q.defer();

				angular.copy(store._getFromLocalStorage(), store.todos);
				deferred.resolve(store.todos);

				return deferred.promise;
			},
			
			insert: function(todo){
				var deferred = $q.defer();

				store.todos.push(todo);
				store._saveToLocalStorage(store.todos);
				deferred.resolve(store.todos);

				return deferred.promise;
			},
			
			put: function(todo,index){
				var deferred = $q.defer();
				
				store.todos[index] = todo;
				
				store._saveToLocalStorage(store.todos);
				deferred.resolve(store.todos);

				return deferred.promise;
			}			
		};
		
		return store;		
	});
	


























