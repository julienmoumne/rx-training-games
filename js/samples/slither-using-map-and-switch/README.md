This snippet is what makes the snake move in the
[Snake game](https://julienmoumne.github.io/rx-training-games/#?title=snake).

This approach is the one used in [A Playful Introduction to Rx by Erik Meijer](https://youtu.be/WKore-AkisY?t=46m30s).

It leverages 
[Map](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/select.md)
and
[Switch](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/switch.md).

[Full diagram](https://raw.githubusercontent.com/JulienMoumne/rx-training-games/master/js/samples/slither-using-map-and-switch/slither-using-map-and-switch.png).

Use the Left, Up, Right and Down arrows of your keyboard to move the snake.