angular.module('app', ['ui.numeric']);
function ctrl($scope){
$scope.events=[];
 $scope.numeric_options = {
start: function (event, ui) { 
	$scope.events.push('Slider start'); 
	},
spin: function (event, ui) { 
    	$scope.events.push('Slider spin'); 
    	}
 }
 
 
}
