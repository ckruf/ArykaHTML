(function(window, angular) {
    'use strict';
    var naModule = angular.module('NaModule', []);

    naModule.filter('parseUrlFilter', function() {
        var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/gi;
        return function(text, target, otherProp) {
            if (text) {
                return text.replace(urlPattern, '<a target="' + target + '" href="$&">$&</a>');
            }
            return "";
        };
    });

    naModule.filter('convertUrlEncode', function() {
        return function(text) {
            if (text) {
                return window.encodeURIComponent(text);
            }
            return '';
        }
    });

    naModule.directive("contenteditable", function() {
        return {
            restrict: "E",
            require: "ngModel",
            scope: {
                ngModel: "="
            },
            link: function(scope, element, attrs, ngModel) {

                function read() {
                    ngModel.$setViewValue(element.html());
                };

                element.bind('focus', function() {
                    scope.$apply(function() {

                    });
                });

                element.bind('blur', function() {
                    scope.$apply(function() {

                    });
                });

                element.bind('keydown', function(event) {
                    scope.$apply(function() {
                        // Check if previous key was not shift or return
                        if (event.which == 13 && !event.shiftKey) {

                        }
                    });
                });

                ngModel.$render = function() {
                    element.html(ngModel.$viewValue || "");
                };

                element.bind("blur keyup change", function() {
                    scope.$apply(read);
                });
            }
        };
    });

    naModule.directive('clickOff', ['$document', '$parse', function($document, $parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                var bodyElem = angular.element($document[0].body);
                var elmClicked = false;
                element.on('click', function(event) {
                    event.stopPropagation();
                    this.elmTimeStamp = event.timeStamp;
                    var bodyClick = function(event, elmTimeStamp) {
                        if (this.elmTimeStamp != elmTimeStamp) {
                            var object = $parse(attr.clickOff);
                            scope.$apply(function() {
                                object(scope);
                            });
                            elmClicked = false;
                            bodyElem.off('click');
                        }
                    };

                    bodyElem.triggerHandler('click', this.elmTimeStamp);

                    if (!elmClicked) {
                        elmClicked = true;
                        bodyElem.on('click', bodyClick.bind(this));
                    } else {
                        elmClicked = false;
                        bodyElem.off('click');
                    }
                });

                scope.$on('$destroy', function() {
                    bodyElem.off('click');
                });
            }
        }
    }]);
})(window, window.angular)