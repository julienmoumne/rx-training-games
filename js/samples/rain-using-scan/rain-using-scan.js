var squareSize = 6;
var spawnPulse = 200;
var fallPulse = 100;

api.initGrid(squareSize);

var layer = api.addLayer('#337ab7');

var droplets = Rx.Observable.interval(spawnPulse)
    .map(() => ({current: {x: api.randomCoord(), y: 0}}))
    .flatMap(startingPosition => Rx.Observable.interval(fallPulse).scan(
        coord => ({
            current: api.directions.Down(coord.current),
            previous: coord.current
        }),
        startingPosition
    )
    .startWith(startingPosition)
    .takeWhile(
        coord => !coord.previous || api.isWithinLimits(coord.previous))
    );

droplets.subscribe(coord => {
    if (api.isWithinLimits(coord.current)) layer.fill(coord.current);
    if (coord.previous) layer.clear(coord.previous);
});