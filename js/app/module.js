define([
    'domReady!',
    'angular',
    'app/gridcanvas-directive',
    'app/github-service',
    'app/moment-filter',
    'app/controller',
    'app/app-config',
    'app/exec-service',
    'angular-route',
    'angular-bootstrap',
    'angular-ui-codemirror',
    'angular-social-share',
    'angular-local-storage',
    'angular-loading-bar',
    'angular-growl-v2',
    'angulartics-piwik',
    'rx.angular',
    'ng-showdown'
], (document, angular, GridCanvasDirective, GitHubService, MomentFilter, Controller, AppConfig, ExecService) => {

    'use strict';

    var requires = [
        'ngRoute',
        'ui.bootstrap',
        'ui.codemirror',
        'djds4rce.angular-socialshare',
        'LocalStorageModule',
        'angular-loading-bar',
        'angular-growl',
        'angulartics.piwik',
        'rx',
        'ng-showdown'
    ];

    // is there any other way to dynamically load the templates?
    if (!appConfig.devMode)
        requires.push('rx-training-games.templates');

    var app = angular.module('rx-training-games', requires);

    app.config(function ($routeProvider) {
        $routeProvider.otherwise({
            templateUrl: 'html/view.html',
            controller: 'controller',
            reloadOnSearch: false
        });
    });

    app.config(function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    });

    app.config(function (growlProvider) {
        growlProvider.globalTimeToLive({success: 4000, error: -1, warning: 4000, info: 4000});
    });

    app.config(function ($analyticsProvider) {
        // todo track global exceptions : https://github.com/angulartics/angulartics/issues/272
        $analyticsProvider.virtualPageviews(false);
    });

    app.directive('gridCanvas', GridCanvasDirective);
    app.factory('GitHubService', GitHubService);
    app.factory('AppConfig', AppConfig);
    app.factory('ExecService', ExecService);
    app.filter('moment', MomentFilter);
    app.controller('controller', Controller);

    angular.bootstrap(document, ['rx-training-games']);
});