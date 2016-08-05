/*global todomvc */
'use strict';
/**
 * Directive that places focus on the element it is applied to when the expression it binds to evaluates to true
 */
//todomvc.directive('todoFocus', function todoFocus($timeout) {
//  return function (scope, elem, attrs) {
////  	console.log(attrs.todoFocus)
//      // 为todoFocus属性的值添加监听
//      scope.$watch(attrs.todoFocus, function (newVal) {
////      	console.log(attrs.todoFocus)
//          if (newVal) {
//              $timeout(function () {
//                  elem[0].focus();
//              }, 0, false);
//          }
//      });
//  };
//});
//这个自定义指令的作用应该是就是返回当前的elem【0】，然后focus
todomvc.directive('todoFocus',function todoFocus($timeout){
	return function(scope,elem,attrs){
//		console.log(elem[0]);
		scope.$watch(attrs.todoFocus,function(newVal){
			if(newVal){
				$timeout(function(){
					elem[0].focus();
				},0,false);
			}
		})
	}
})