define([], () => {

    'use strict';

    function evaluate(api, code, onSuccess, onError) {

        return tryEval(() => {

            // https://github.com/asvd/jailed/blob/v0.2.0/demos/web/console/plugin.js
            var indexedDB = null;
            var location = null;
            var navigator = null;
            var onerror = null;
            var onmessage = null;
            var performance = null;
            var self = null;
            var webkitIndexedDB = null;
            var postMessage = null;
            var close = null;
            var openDatabase = null;
            var openDatabaseSync = null;
            var webkitRequestFileSystem = null;
            var webkitRequestFileSystemSync = null;
            var webkitResolveLocalFileSystemSyncURL = null;
            var webkitResolveLocalFileSystemURL = null;
            var addEventListener = null;
            var dispatchEvent = null;
            var removeEventListener = null;
            var dump = null;
            var onoffline = null;
            var ononline = null;
            var importScripts = null;
            //var console = null;
            var application = null;
            var onSuccess = null;
            var onError = null;

            eval(code); // jshint ignore:line
        });

        function tryEval(func) {

            try {

                func();
                onSuccess();

            } catch (e) {
                onError(e.message, e.stack);
            }
        }
    }

    return {
        eval: evaluate
    };
});