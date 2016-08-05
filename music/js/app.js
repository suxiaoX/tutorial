var myApp = angular.module("myApp",[]);
var apiKey = 'MDExODQ2OTg4MDEzNzQ5OTM4Nzg5MzFiZA001',
    nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';
		
myApp.controller("playerController",["$scope","$http",function($scope,$http){
	
	$http({  
		method: 'JSONP',  
		url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
		}).success(function(data, status, headers, config) {
//		}).success(function(data, status) {
			// data contains the response  
			// status is the HTTP status  
			// headers is the header getter function  
			// config is the object that was used to create the HTTP request
			console.log(data);
			
//			data:{
//				"list":
//				"story":[
//					{
//						"id":
//						"title":
//					}]
//			}

			$scope.programs = data.list.story;
		}).error(function(data, status, headers, config) {
			console.log(data);
	});
	
	$scope.playing = false;
	$scope.audio = document.createElement("audio");
//	$scope.audio.src = "resource/media/npr1.mp4";
	
	$scope.play = function(program){
		
		if($scope.playing) audio.pause();
		var url = program.audio[0].format.mp4.$text;
		audio.url = url;
//		$scope.audio.play();
		audio.play();
		$scope.playing = true;
	};
	
	$scope.stop = function(){
		$scope.audio.pause();
		$scope.playing = false;
	};
	
	$scope.audio.addEventListener('ended',function(){//视频播放完了之后，调用这个函数
		$scope.$apply(function(){
			$scope.stop();
		})
	});
	
	
			
			
}]);


myApp.controller("relatedController",["$scope",function($scope){
	
	$scope.playing = false;
	$scope.audio = document.createElement("audio");
	$scope.audio.src = "resource/media/npr.mp4";
	
}]);
