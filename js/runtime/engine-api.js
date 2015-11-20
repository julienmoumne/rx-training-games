define(['underscore', 'runtime/gridcanvas', 'runtime/layer-manager'], (_, GridCanvas, LayerManager) => {

    'use strict';

    var layerCount = 0;

    return keyboard => {

        var api = {
            keyboard: keyboard.asObservable(),

            initGrid: squareSize => {
                application.remote.initGrid(squareSize);
                api.gameSize = GridCanvas.getGridSize(
                    application.context.gridOffsetWidth,
                    application.context.windowInnerHeight,
                    squareSize
                );
            },

            addLayer: color => new LayerManager(application, layerCount++, color),
            setText: text => application.remote.setText(text),
            randomSquare: () => ({x: api.randomCoord(), y: api.randomCoord()}),
            randomCoord: () => _.random(api.gameSize - 1),

            isOffLimits: coord => (coord.x < 0 || coord.x >= api.gameSize || coord.y < 0 || coord.y >= api.gameSize),
            isWithinLimits: coord => !api.isOffLimits(coord),

            directions: {
                Left: coord => {
                    coord = _.clone(coord);
                    coord.x -= 1;
                    return coord;
                },
                37: coord => api.directions.Left(coord),
                Up: coord => {
                    coord = _.clone(coord);
                    coord.y -= 1;
                    return coord;
                },
                38: coord => api.directions.Up(coord),
                Right: coord => {
                    coord = _.clone(coord);
                    coord.x += 1;
                    return coord;
                },
                39: coord => api.directions.Right(coord),
                Down: coord => {
                    coord = _.clone(coord);
                    coord.y += 1;
                    return coord;
                },
                40: coord => api.directions.Down(coord)
            },
            gameOver: application.remote.onEndOfGame
        };

        return api;
    };
});