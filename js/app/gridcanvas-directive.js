define(['runtime/gridcanvas'], GridCanvas => {

    'use strict';

    return function () {
        return {
            scope: {
                onload : '&'
            },
            link: function ($scope, $elm) {

                var elm = $elm[0];

                var listener = $scope.$watch(
                    () => elm.offsetWidth,
                    newVal => {

                        if (newVal === document.documentElement.clientWidth || newVal === window.innerWidth)
                            return;

                        listener();
                        GridCanvas.attachDom(elm);
                        $scope.onload();
                    }
                );
            }
        };
    };
});