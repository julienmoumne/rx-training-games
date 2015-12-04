var spawnPulse = 200;
var fallPulse = 100;

api.initGrid({squareSize: 6});

var layer = api.addLayer({color: '#337ab7'});

var droplets = Rx.Observable.interval(spawnPulse)
    .map(() => ({current: {x: api.randomCoord(), y: 0}}))
    .flatMap(startingPosition => Rx.Observable.interval(fallPulse).scan(
        coord => ({
            current: api.directions.Down(coord.current),
            previous: coord.current
        }),
        startingPosition
    )
    .startWith(startingPosition) // see rxmarbles.com/#startWith
    .takeWhile(
        coord => !coord.previous || api.isWithinLimits(coord.previous))
    );

droplets.subscribe(coord => {
    if (api.isWithinLimits(coord.current)) layer.fill(coord.current);
    if (coord.previous) layer.clear(coord.previous);
});