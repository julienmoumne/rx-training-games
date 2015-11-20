var squareSize = 6;
var spawnPulse = 200;
var fallPulse = 100;

api.initGrid(squareSize);

var layer = api.addLayer('#337ab7');

var droplets = Rx.Observable.interval(spawnPulse)
    .flatMap(() => Rx.Observable.generateWithRelativeTime(
        {current: {x: api.randomCoord(), y: 0}},
        coord => !coord.previous || api.isWithinLimits(coord.previous),
        coord => ({
            current: api.directions.Down(coord.current),
            previous: coord.current
        }),
        _.identity,
        _.constant(fallPulse)
    ));

droplets.subscribe(coord => {
    if (api.isWithinLimits(coord.current)) layer.fill(coord.current);
    if (coord.previous) layer.clear(coord.previous);
});