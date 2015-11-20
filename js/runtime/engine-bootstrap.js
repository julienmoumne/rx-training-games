define(['rx', 'runtime/safe-evaluator', 'runtime/engine-api'], (Rx, SafeEvaluator, EngineApi) => {

    'use strict';

    Rx.config.longStackSupport = true;

    var keyboard = new Rx.Subject();

    application.setInterface({ newKey: key => keyboard.onNext(key)});

    SafeEvaluator.eval(
        EngineApi(keyboard),
        application.context.code,
        application.remote.onLoad,
        application.remote.onException
    );
});