define(['runtime/gridcanvas'], GridCanvas => {

    'use strict';

    return function () {
        return {
            scope: {
                onload: '&'
            },
            link: function ($scope, $elm) {

                var elm = $elm[0];

                // HTML5 Canvas does not automatically fit the available width
                // As far as I understand, we need to determine the available width and set it programmatically
                // I went with $elm.offsetWidth to determine the available width
                // This pauses some complications but so far I could not find an alternative approach
                // $elm.offsetWidth takes on multiples values while the browser is rendering the page
                // This is where it gets fuzzy for me.
                // As far as I understand, there are multiple sources of events that trigger modifications in the layout :
                // spreadsheets applied by the browser, angular views, JavaScript libraries (e.g. codemirror)
                // Because of this, there is no easy way to know when the DOM is completely loaded and rendered
                // See 'listener for view update completion' https://github.com/angular/angular.js/issues/1306
                // I also noticed the behavior is different when JS files are concatenated in one file (env=prod) and when
                // the application is embedded in an iframe.
                // The only approach I could find so far is listening DOM modification events on the 'offsetWidth' property
                // and come-up with a heuristic to determine when 'offsetWidth' has taken its final value
                var listener = $scope.$watch(
                    () => elm.offsetWidth,
                    newVal => {

                        if (newVal >= Math.min(document.documentElement.clientWidth, window.innerWidth))
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