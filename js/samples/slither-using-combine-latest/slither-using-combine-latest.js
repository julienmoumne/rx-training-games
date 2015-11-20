var snakeSpeedPulse = 50;
var squareSize = 10;

api.initGrid(squareSize);

// spawn a snake with size 3
var snake = api.addLayer('#337ab7');
snake.fill({x: 10, y: 0}).fill({x: 10, y: 1}).fill({x: 10, y: 2});

var validKeystrokes = api.keyboard.filter(keyCode => keyCode in api.directions);

var pulse = Rx.Observable
    .interval(snakeSpeedPulse)
    .skipUntil(validKeystrokes);

// duplicate the last keystroke at fixed intervals
var directions = Rx.Observable
    .combineLatest(pulse, validKeystrokes)
    .distinctUntilChanged(_.first)
    .map(_.last);

// move the snake
directions
    .map(key => api.directions[key](snake.getActiveSquares()[2]))
    .filter(api.isWithinLimits)
    .do(snake.fill)
    .subscribe(() => snake.clear(snake.getActiveSquares()[0]));