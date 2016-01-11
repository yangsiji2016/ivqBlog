'use strict';
angular.module('common.config', []);
angular.module('common.directives', []);
angular.module('common.filters', []);
angular.module('common.services', ['common.config', 'common.util']);
angular.module('common.util', []);
angular.module('app.templates', []);
angular.module('app.home', []);
angular.module('app.nav', []);
angular.module('app.article', ['ui.bootstrap', 'common.services']);

var app = angular.module('app', [
    'ui.router',
    'ui.router.metatags',
    'ui.bootstrap',
    'common.config',
    'common.directives',
    'common.filters',
    'common.services',
    'common.util',
    'app.templates',
    'app.home',
    'app.nav',
    'app.article'
]);

app.controller('AppCtrl', ['$rootScope', 'PackageInfo', function ($rootScope, PackageInfo) {
    $rootScope.packageInfo = PackageInfo;
}]);

app.run(['$rootScope', '$state', '$stateParams', 'MetaTags', function($rootScope, $state, $stateParams, MetaTags){
    $rootScope.metaTags = MetaTags;
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}]);