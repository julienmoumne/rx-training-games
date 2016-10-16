var squareSize = 4, antPulse = 1, activatedSquares = 40;

api.initGrid({squareSize: squareSize});

var boardLayer = api.addLayer({color: '#337ab7'}), antLayer = api.addLayer({color: '#275b8c'});

// activate random squares
Rx.Observable.repeat(() => boardLayer.fill(api.randomSquare()), activatedSquares).subscribe(f => f());

// place the ant in the middle of the board
antLayer.fill({x: api.gameSize / 2, y: api.gameSize / 2});

var pulse = Rx.Observable.interval(antPulse).share();

// is the ant walking on an activated square?
var probes = pulse.map(() => antLayer.getActiveSquares()[0])
    .map(antSquare => ({
            coord: antSquare,
            active: boardLayer.getActiveSquares()
                .find(boardSquare => boardSquare.x == antSquare.x && boardSquare.y == antSquare.y)
        })
    ).share();

// http://javascript.about.com/od/problemsolving/a/modulobug.htm
var modulo = (n, m) => ((n % m) + m) % m;

// determine next direction
var directions = probes.scan((acc, step) => modulo(acc + (step.active ? -1 : 1), 4), 0)
    .map(directionIndex =>
        [api.directions.Left, api.directions.Up,
        api.directions.Right, api.directions.Down][directionIndex])
    .map(direction => direction(antLayer.getActiveSquares()[0]))
    .share();

// update ant's position
directions.do(antLayer.fill).subscribe(() => antLayer.clear(antLayer.getActiveSquares()[0]));

// switch color of square left behind
probes.subscribe(step => (step.active ? boardLayer.clear : boardLayer.fill)(step.coord));

// handle end of 'game'
directions.where(api.isOffLimits).subscribe(api.gameOver);

// display iterations
pulse.subscribe(i => api.setText({text: i}));