var myApp = angular.module("myApp",[]);

myApp.controller("OrderFormController",["$scope",function($scope){
	
	$scope.services = [
		{
			name:"leo",
			price:500,
			active:true
		},
		{
			name:"duoduo",
			price:454,
			active:false
		},
		{
			name:"momo",
			price:190,
			active:false
		},
		{
			name:"sux",
			price:999,
			active:false
		},
		{
			name:"yiyi",
			price:121,
			active:false
		}
	];
	
	$scope.showActive = function(s){
		s.active = !s.active;
	};
	
	$scope.totalPrice = function(){
		
		var total = 0;
		
		angular.forEach($scope.services,function(ele){
			
			if(ele.active){
				total += ele.price;
			}
			
		});
		
		return total;
	}
	
}])