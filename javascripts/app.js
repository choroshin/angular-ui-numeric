angular.module('app', ['ui.numeric']);
function ctrl($scope){
$scope.events=[];
 $scope.numeric_options = {
slide: function (event, ui) { 
	$scope.events.push('Slider slide'); 
	},
change: function (event, ui) { 
    	$scope.events.push('Slider change'); 
    	}
 }
 
 
}
