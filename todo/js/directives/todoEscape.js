todoMvc.directive('todoEscape',function(){
	
	"use strict"
	
	var ESCAPE_KEY = 27;
	
	return function(scope,elem,attrs){
		elem.bind('keydown',function(event){
			if(event.keyCode === ESCAPE_KEY){
				scope.$apply(attrs.todoEscape);//绑定键盘按下事件，执行attrs.todoEscape
			}
		});
		
		scope.$on('$destroy',function(){
			elem.unbind('keydown');//没有键盘按下事件，就接触绑定
		})
	}
	
})