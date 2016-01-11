"use strict";
angular.module('app.nav')
    .directive('navTag', function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'navgation/tag/tag.tpl.html',
            controller: ['$scope', 'TagService', function ($scope, TagService) {
                $scope.initController = function () {
                    TagService.getAllTags().then(function (data) {
                        $scope.tags = data;
                    });
                };
                $scope.initController();
            }]
        };
    });
