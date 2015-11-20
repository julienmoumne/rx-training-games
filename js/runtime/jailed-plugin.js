(() => {

    'use strict';

    self.onerror = (msg, filename, lineno, col, error) => application.remote.onException(msg, error ? error.stack : '');

    application.remote.getContext(context => {

        application.context = context;

         //the URL provided to importScripts needs to be absolute, this is because jailed.js uses 'window.URL.createObjectURL' to create the worker
        importScripts(context.baseUrl + context.appConfig.runtimeJS);

        require(['runtime/engine-bootstrap']);
    });
})();