/**
 * @author rjaen
 */
(function () {
  'use strict';

  var mainModule = angular.module('myWidgetsModule');

  /**
  * add fade out animation using current element class and only css to
  * avoid using ng-hide or ng-show directives
  * */
  mainModule.directive('fadeOutDirective', ['$timeout', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var delay = parseInt(attrs.adeOutDirective) || 5000,
          order = parseInt(attrs.adeOutDirectiveOrder) || 0,
          mainClassName = attrs.adeOutDirectiveClassName || '';

        //if delay is less than 0 means we don't need to fade out
        if (delay < 0) {
          return;
        }

        delay = delay + ((order + 1) * 100);
        element.addClass(mainClassName);
        $timeout(function () {
          element.addClass('ng-animate');
          element.addClass('ng-hide');
          $timeout(function () {
            element.removeClass('ng-animate');
          }, 600);
        }, delay);
      }
    };
  }]);
}());
