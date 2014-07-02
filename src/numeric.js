angular.module('numeric', []).directive("numeric", function ($timeout) {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                var numericElement = "";
                if (element.is("input")) {
                    numericElement = element;
                } else {
                    numericElement = angular.element(' <input>');
                    element.append(numericElement);
                }
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
                attrs.$observe('disabled', function (newVal) {
                    init();
                    numericElement.spinner('option', 'disabled', !!newVal);
                });
                function destroy() {
                    numericElement.spinner('destroy');
                }
                numericElement.bind('$destroy', destroy);
            }
        };
    });
