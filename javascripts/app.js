angular.module('numeric', ['numeric']);
function ctrl($scope){
$scope.events=[];
 $scope.numeric_options = {
		start: function (event, ui) { 
			$scope.events.push('Slider start'); 
			},
    stop: function (event, ui) { 
    	$scope.events.push('Slider stop'); }
 }
 
}
