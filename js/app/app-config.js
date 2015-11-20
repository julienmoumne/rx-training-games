define([], () => {

    'use strict';

    return function ($location) {

        return angular.extend(
            { baseUrl: $location.absUrl().replace('#' + $location.url(), '').replace('index.html', '')},
            appConfig
        );
    };
});