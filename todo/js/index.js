

var todoMvc = angular.module("todoMvc",['ngRoute']);

todoMvc.config(function($routeProvider){
	"use restrict"
	
	var routeConfig = {
		
		controller:"TodoCtrl",
		templateUrl:"todomvc-index.html",
		resolve: {
			store:function(todoStorage){
				return todoStorage.then(function(module){
					module.get();
					return module;
				})
			}
		}
		
	}
	
	$routeProvider
		.when('/',routeConfig)
		.when('/:status',routeConfig)
		.otherwise({
			redirectTo:'/'
		});
})
