define(['runtime/gridcanvas'], GridCanvas => {

    'use strict';

    return function ($timeout) {
        return {
            scope: {
                onload: '&'
            },
            link: function ($scope, $element) {

                // skip a cycle so bootstrap class ('col-*') is fully loaded on ancestor
                // avoids a bug where offsetWidth is equal to the full width even though the class is set in the HTML
                // reproduced so far only on firefox, hard to reproduce (need to refresh the page a good amount of times)
                $timeout(() => {
                    GridCanvas.attachDom($element[0]);
                    $scope.onload();
                });
            }
        };
    };
});