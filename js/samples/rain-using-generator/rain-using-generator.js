var spawnPulse = 200;
var fallPulse = 100;

api.initGrid({squareSize: 6});

var layer = api.addLayer({color: '#337ab7'});

var coordinates = (function* () {
    var coord = {current: {x: api.randomCoord(), y: 0}};
    while (!coord.previous || api.isWithinLimits(coord.previous)) {
        yield coord;
        coord = {
            current: api.directions.Down(coord.current),
            previous: coord.current
        };
    }
});

// taking full advantage of the generator function is not possible
// with Rx.Observable.from([generator])
// this is because rxjs does not support reactive pull without buffering
var droplets = Rx.Observable.interval(spawnPulse)
    .map(coordinates) // see rxmarbles.com/#map
    .flatMap(coord => Rx.Observable.interval(fallPulse)
        .map(() => coord.next())
        .takeWhile(e => !e.done)
        .pluck('value'));

droplets.subscribe(coord => {
    if (api.isWithinLimits(coord.current)) layer.fill(coord.current);
    if (coord.previous) layer.clear(coord.previous);
});