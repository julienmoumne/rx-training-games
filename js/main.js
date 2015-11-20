require.config({
    baseUrl: "js",
    paths: {
        'text': 'lib/requirejs-text/text',
        'angular': 'lib/angular/angular',
        'angular-route': 'lib/angular-route/angular-route',
        'angular-sanitize': 'lib/angular-sanitize/angular-sanitize',
        'angular-bootstrap': 'lib/angular-bootstrap/ui-bootstrap-tpls',
        'angular-ui-codemirror': 'lib/angular-ui-codemirror/ui-codemirror',
        'angular-local-storage': 'lib/angular-local-storage/dist/angular-local-storage',
        'angular-loading-bar': 'lib/angular-loading-bar/build/loading-bar',
        'angular-social-share': 'lib/angular-socialshare/angular-socialshare',
        'angular-growl-v2': 'lib/angular-growl-v2/build/angular-growl',
        'angulartics': 'lib/angulartics/src/angulartics',
        'angulartics-piwik': 'lib/angulartics/src/angulartics-piwik',
        'rx': 'lib/rxjs/dist/rx.all',
        'rx.angular': 'lib/angular-rx/dist/rx.angular',
        'underscore': 'lib/underscore/underscore',
        'showdown': 'lib/showdown/dist/showdown',
        'ng-showdown': 'lib/ng-showdown/dist/ng-showdown',
        'octokat': 'lib/octokat/dist/octokat',
        'moment': 'lib/moment/moment',
        'twitter': 'lib/twitter/index',
        'chance': 'lib/chance/chance',
        'ejs': 'lib/ejs/ejs',
        'domReady': 'lib/domReady/domReady'
    },
    packages: [
        {
            name: 'codemirror',
            location: 'lib/codemirror',
            main: 'lib/codemirror'
        }
    ],
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-route': ['angular'],
        'angular-bootstrap': ['angular'],
        'angular-sanitize': ['angular'],
        'angular-ui-codemirror': {
            deps: ['angular', 'codemirror', 'codemirror/mode/javascript/javascript'],
            init: function (angular, codemirror) {
                window.CodeMirror = codemirror;
            }
        },
        'angular-local-storage': ['angular'],
        'angular-loading-bar': ['angular'],
        'angular-social-share': ['angular', 'twitter'],
        'angular-growl-v2': ['angular'],
        'angulartics': ['angular'],
        'angulartics-piwik': ['angulartics', 'app/stats'],
        'ng-showdown': ['angular-sanitize'],
        'ejs': {
            exports: 'ejs'
        }
    },
    deps: ['app/module']
});