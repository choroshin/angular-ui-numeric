angular.module('numeric', ['numeric']);
function ctrl($scope,$log){
 $scope.numeric_options = {
		start: function (event, ui) { $log.info('Slider start'); },
    stop: function (event, ui) { $log.info('Slider stop'); }
 }
}
