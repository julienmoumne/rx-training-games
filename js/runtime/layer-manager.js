define(['rx', 'underscore'], (Rx, _) => {

    'use strict';

    return function (application, layer, color) {

        var squares = [];
        var activations = new Rx.Subject();
        var removals = new Rx.Subject();

        application.remote.addLayer(layer, color);

        this.activations = activations.asObservable();
        this.removals = removals.asObservable();

        this.fill = coord => {

            coord = _.clone(coord);
            squares.push(coord);
            application.remote.fill(layer, coord);
            activations.onNext(coord);
            return this;
        };

        this.clear = coord => {

            var index = _.findIndex(squares, coord);
            if (index == -1)
                throw 'Trying to clear a non-filled square: (' + coord.x + ', ' + coord.y + ')';

            squares.splice(index, 1);
            application.remote.clear(layer, coord);
            removals.onNext(coord);
        };

        this.getActiveSquares = () => _.clone(squares);
    };
});