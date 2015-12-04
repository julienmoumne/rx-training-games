var spawnPulse = 1000;
var fallPulse = 200;
var firingPulse = 50;

api.initGrid({squareSize: 15});

var meteoriteLayer = api.addLayer({color: '#275b8c'});
var bulletLayer = api.addLayer({color: '#9bc2e3'});
var spaceshipLayer = api.addLayer({color: '#337ab7'});

// ship starting position
spaceshipLayer.fill({x: api.randomCoord(), y: api.gameSize - 1});

// meteorite spawns
Rx.Observable.interval(spawnPulse)
    .map(() => ({x: api.randomCoord(), y: 0})) // see rxmarbles.com/#map
    .subscribe(meteoriteLayer.fill);

// meteorite updates
Rx.Observable.interval(fallPulse)
    .flatMap(() => Rx.Observable.from(meteoriteLayer.getActiveSquares()))
    .do(meteoriteLayer.clear)
    .map(api.directions.Down)
    .do(meteoriteLayer.fill)
    .where(api.isOffLimits) // see rxmarbles.com/#filter
    .subscribe(api.gameOver);

// bullet spawns
api.keyboard.where(keyCode => keyCode == 32)
    .map(() => spaceshipLayer.getActiveSquares()[0])
    .subscribe(bulletLayer.fill);

// bullet updates
Rx.Observable.interval(firingPulse)
    .flatMap(() => Rx.Observable.from(bulletLayer.getActiveSquares()))
    .do(bulletLayer.clear)
    .map(api.directions.Up)
    .where(api.isWithinLimits)
    .subscribe(bulletLayer.fill);

// spaceship moves
api.keyboard.where(keyCode => _.contains([37, 39], keyCode))
    .map(key => api.directions[key](spaceshipLayer.getActiveSquares()[0]))
    .where(api.isWithinLimits)
    .do(spaceshipLayer.fill)
    .subscribe(() => spaceshipLayer.clear(spaceshipLayer.getActiveSquares()[0]));

// hit detection
var hit = bulletLayer.activations
    .map(bullet => ({
        bullet: bullet,
        meteorite: meteoriteLayer.getActiveSquares()
            .find(meteorite => meteorite.x == bullet.x && meteorite.y >= bullet.y)
    }))
    .where(hit => hit.meteorite);

// asset destruction & scoring
var score = 1;
hit.subscribe(hit => {
    api.setText({text: 'Score : ' + score++});
    meteoriteLayer.clear(hit.meteorite);
    bulletLayer.clear(hit.bullet);
});