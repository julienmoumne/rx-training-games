define(['runtime/gridcanvas'], GridCanvas => {

    'use strict';

    return function () {
        return {
            scope: {
                onload: '&'
            },
            link: function ($scope, $element) {

                GridCanvas.attachDom($element[0]);
                $scope.onload();
            }
        };
    };
});