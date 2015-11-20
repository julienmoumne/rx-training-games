define(['moment'], () => {

    'use strict';

    return function () {
        return function (input) {
            return input ? input.format('lll') : '';
        };
    };
});