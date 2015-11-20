//the URL provided to importScripts needs to be absolute, this is because jailed.js uses 'window.URL.createObjectURL' to create the worker
importScripts(application.context.baseUrl + 'lib/requirejs/require.js');

require.config({
    baseUrl: application.context.baseUrl,
    paths: {
        'rx': 'lib/rxjs/dist/rx.all',
        'underscore': 'lib/underscore/underscore'
    }
});