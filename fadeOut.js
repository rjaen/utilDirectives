/**
 * @author rjaen
 */
(function () {
  'use strict';

  var mainModule = angular.module('myWidgetsModule');

  /**
  * add fade out animation using current element class and only css to
  * avoid using ng-hide or ng-show directives
  * @fadeOutDirective delay to wait until apply
  * @fadeOutDirectiveOrder extra delay to apply in case many items are being faded
  * @fadeOutDirectiveClassName the base class that apply the transition effect
  * */
  mainModule.directive('fadeOutDirective', ['$timeout', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var delay = parseInt(attrs.fadeOutDirective) || 5000,
          order = parseInt(attrs.fadeOutDirectiveOrder) || 0,
          mainClassName = attrs.fadeOutDirectiveClassName || '';

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
