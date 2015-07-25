/*
 *@author rjaen
 */
(function () {
  'use strict';
  var mainModule = angular.module('widgets');

  /**
   * A directive that knows how  parse tags and call a function when enter key gets pressed.
   * By just writing it will render the tags associated to the search.
   * If the the backspace ist used the afected tad becomes text again.
   */
  mainModule.directive('widgetsSearchBox', function () {
    return {

      restrict: 'EC',
      templateUrl: '/js/modules/widgets/searchBox.html',
      scope: {
        query: '=',
        tags: '=tags',
        placeholder: '=',
        onEnter: '&',
        advancedSearch: '=',
        doAdvancedSearch: '&',
        tooltipData: '='
      },
      controller: ['$scope', '$timeout', 'browserService',
        function ($scope, $timeout, browserService) {
          var model, modelElement;

          $scope.query = $scope.query || {text: ''};
          model = $scope.query.text;
          $scope.tagIcons = [];
          $scope.tagsStateMap = {};

          $scope.keypress = function ($event) {

            if ($event.keyCode === 13 && $scope.query.text.length > 0) {
              $scope.onEnter({tags: $scope.tagIcons, text: $scope.query.text});
            } else if ($event.keyCode === 8 && model === modelElement.val() && $scope.tags.length > 0 && browserService.getCursorPosition(modelElement[0]) === 0) {
              var tagText = $scope.tagIcons.pop().text;
              $scope.tagsStateMap[tagText] = false;
              $scope.query.text = tagText + $scope.query.text;
              $timeout(function () {
                browserService.setCursorPosition(tagText.length, modelElement[0]);
              }, 1);
            } else {
              angular.forEach($scope.tags, function (tag) {
                if ($scope.query.text.toUpperCase().indexOf((tag.text + ' ').toUpperCase()) === 0) {
                  if (!$scope.tagsStateMap[tag.text]) {
                    $scope.tagIcons.push(tag);
                    $scope.tagsStateMap[tag.text] = true;
                    $scope.query.text = $scope.query.text.substring(tag.text.length + 1, $scope.query.text.length);
                    $timeout(function () {
                      browserService.setCursorPosition(0, modelElement[0]);
                    }, 1);
                  }
                }
              });

            }
            model = $scope.query.text;
          };

          /*
          * Add or remove the tag after the click on the dropdown
          * */
          $scope.addTag = function (tagPos) {
            var tag = $scope.tags[tagPos];

            if (!$scope.tagsStateMap[tag.text]) {
              $scope.tagIcons.push(tag);
            } else {
              $scope.tagIcons.splice($scope.tagIcons.indexOf($scope.tags[tagPos]), 1);
            }

            $scope.tagsStateMap[$scope.tags[tagPos].text] = !$scope.tagsStateMap[$scope.tags[tagPos].text];
          };

          this.setElement = function (element) {
            modelElement = element;
          };
        }]
    };
  });

  mainModule.directive('widgetsSearchBoxModel', function () {
    return {
      require: '^widgetsSearchBox',
      link: function (scope, element, attrs, controller) {
        controller.setElement(element);
      }
    };
  });

}());
