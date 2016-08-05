/*global todomvc */
'use strict';
/**
 * Services that persists and retrieves TODOs from localStorage
 */
//todomvc.factory('todoStorage', function () {
//  // todos JSON字符串存储的唯一标识
//  var STORAGE_ID = 'todos-angularjs';
//  return {
//      // 从localStorage中取出todos，并解析成JSON对象
//      get: function () {
//          return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
//      },
//      // 将todos对象转化成JSON字符串，并存入localStorage
//      put: function (todos) {
//          localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
//      }
//  };
//});
/*
todomvc.factory('todoStorage',function(){
	var STORAGE_ID = 'todos-angularjs';
	
	return {
		get:function(){
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},
		put:function(todos){
			localStorage.setItem(STORAGE_ID,JSON.stringify(todos));
		}
	}
});
*/
todomvc
	.factory('todoStorage',function(){
		
		var STORAGE_ID = "todos-angularjs";
		
		return {
			get: function(){ //获取localStorage里面的数据
				return JSON.parse(localStorage.getItem(STORAGE_ID) || []);
			},
			put: function(todos){ //存储数据到localStorage
				localStorage.setItem(STORAGE_ID,JSON.stringify(todos));
			}
		}
	})

















