angular.module('app', ['ui.numeric']);
function ctrl($scope){
$scope.events=[];
 $scope.numeric_options = {
spin: function (event, ui) { 
	$scope.events.push('Slider spin'); 
	},
change: function (event, ui) { 
    	$scope.events.push('Slider change'); 
    	}
 }
 
 
}
