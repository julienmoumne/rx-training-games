var squareSize = 6;
var spawnPulse = 200;
var fallPulse = 100;

api.initGrid(squareSize);

var layer = api.addLayer('#337ab7');

// droplets spawns
Rx.Observable.interval(spawnPulse)
    .map(() => ({x: api.randomCoord(), y: 0}))
    .subscribe(layer.fill);

// droplets updates
Rx.Observable.interval(fallPulse)
    .flatMap(() => Rx.Observable.from(layer.getActiveSquares()))
    .do(layer.clear)
    .map(api.directions.Down)
    .where(api.isWithinLimits)
    .subscribe(layer.fill);