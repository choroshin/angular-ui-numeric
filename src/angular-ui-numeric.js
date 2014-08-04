angular.module('ui.numeric', []).directive("numeric", function ($timeout,$compile) {
        return {
            require: 'ngModel',
            restrict: 'AE',
            link: function (scope, element, attrs, ngModel) {
                var numericElement = "";
                var numericNgModelName="";
                 var numericScope = scope.$new(true);
                if (element.is("input")) {
                    numericElement = element;
                   
                } else {
                    numericElement = angular.element('<input>');
                    element.append(numericElement);
                }
               numericNgModelName= numericElement.attr("ng-model")|| "numericModel";
                numericElement.attr("ng-model",numericNgModelName);  
                $compile(numericElement)(numericScope);
                function parseNumber(n, decimals) {
                    return (decimals) ? parseFloat(n) : parseInt(n);
                };
                // convenience properties
                var properties = ['min', 'max', 'step'];
                var options = scope.$eval(attrs.numeric) || {};
                var numberFormat = (attrs.numberFormat || options.numberFormat);
                var useDecimals = numberFormat ? (numberFormat.toLowerCase() === "c" ? true : false) : false;

                var init = function () {
                    angular.forEach(properties, function (property) {
                         if (angular.isDefined(attrs[property])) {
                            options[property] = parseNumber(attrs[property], useDecimals);
                        }
                        else if (options.hasOwnProperty(property) && angular.isUndefined(options[property])) {
                            options[property] = 0;
                        }
                    });
                    numericElement.spinner(options);
                    init = angular.noop;
                }
                // Late-bind to prevent compiler clobbering
                scope.$evalAsync(init);

                // Update spinner from model value
                ngModel.$render = function () {
                    init();
                    if (isNaN(ngModel.$viewValue) && !(ngModel.$viewValue instanceof Array)) {
                        ngModel.$viewValue = 0;
                    }
                    numericElement.spinner("value", ngModel.$viewValue);
                }
                // Update model value from spinner
                numericElement.bind('spin', function (event, ui) {
                    $timeout(function () {
                        ngModel.$setViewValue(ui.value);
                    }, 0);
                });
                //Update model value from spinner
                scope.$watch(numericNgModelName, function (newVal) {
                    if (newVal) {
                        ngModel.$setViewValue(newVal);
                    }    
                }, true);
                // Find out if decimals are to be used for spinner
                angular.forEach(properties, function (property) {
                // watch for updates
                attrs.$observe(property, function (newVal) {
                        if (!!newVal) {
                            init();
                            numericElement.spinner('option', property, parseNumber(newVal, useDecimals));
                        }
                    });
                });
                scope.$watch(attrs.ngModel, function () {
                    ngModel.$render();
                }, true);
                
                // Watch numeric (byVal) for changes and update
                scope.$watch(attrs.numeric, function (newVal) {
                    init();
                    if (newVal != undefined) {
                        numericElement.spinner('option', newVal);
                    }
                     ngModel.$render();
                }, true);
                
                attrs.$observe('disabled', function (newVal) {
                    if (angular.isUndefined(newVal)) {
                        return;
                    }
                    init();
                     var newValState = angular.element.type(newVal) === "boolean" ? newVal : newVal.toLowerCase() == 'true';
                    numericElement.spinner('option', 'disabled', newValState);
                });
                //destroy jquery spinner object when directive object is destroyed
                function destroy() {
                    numericElement.spinner('destroy');
                }
                numericElement.bind('$destroy', destroy);
            }
        };
    });
