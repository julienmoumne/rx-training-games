define([
    'runtime/gridcanvas',
    'text!runtime/jailed-plugin.js'
], (GridCanvas, JailedPlugin) => {

    'use strict';

    var plugin;
    var keyboard;
    var config;

    return function (AppConfig) {

        function run(code, _config) {

            config = _config;

            GridCanvas.removeCanvas();

            var api = {
                getContext: getContext,
                onLoad: onLoad,
                onException: onException,
                initGrid: GridCanvas.init,
                addLayer: GridCanvas.addLayer,
                fill: GridCanvas.fill,
                clear: GridCanvas.clear,
                setText: GridCanvas.setText,
                onEndOfGame: onEndOfGame
            };

            plugin = new jailed.DynamicPlugin(JailedPlugin, api);

            plugin.whenFailed(() => {
                throw 'Jailed Plugin loading failure.';
            });

            function getContext(callback) {
                callback({
                    baseUrl: AppConfig.baseUrl + 'js/',
                    gridOffsetWidth: GridCanvas.getOffsetWidth(),
                    windowInnerHeight: window.innerHeight,
                    code: code,
                    appConfig: AppConfig
                });
            }

            function onEndOfGame() {
                stop();
                config.onEndOfGame();
            }

            function onLoad() {

                keyboard = config.keyboardObservable
                    .pluck('keyCode')
                    .subscribe(plugin.remote.newKey);

                config.onStart();
            }

            function onException(msg, stack) {

                console.log('Error Message : ' + msg + '\n' + stack);
                stop();
                config.onError(msg);
            }
        }

        function stop() {

            if (keyboard) {
                keyboard.dispose();
                keyboard = null;
            }

            if (plugin) {
                plugin.disconnect();
                plugin = null;
            }
        }

        return {
            run: run,
            stop: stop
        };
    };
});