/*
app.directive('nprLink', function() { 
   return { 
     restrict: 'EA', 
     require: ['^ngModel'], 
     replace: true, 
     scope: { 
       ngModel: '=', 
       play: '&' 
     }, 
     templateUrl: '/views/nprListItem.html', 
     link: function(scope, ele, attr) { 
       scopescope.duration = scope.ngModel.audio[0].duration.$text; 
     } 
   } 
}); 
*/
myApp.directive('nprLink',function(){
	return {
		restrict:'EA',
		require:["^ngModel"],//注意我们在模版文件里用ngModel来指向之前的program数据，因为在创建自定义指令属性时，我们做了设置。
		replace:true,
		scope:{
			ngModel:"=",
			play:"&"
		},
		templateUrl:"views/nprListItem.html",
		link:function(scope,ele,attr){
			scope.duration = scope.ngModel.audio[0].duration.$text;
		}
	}
})