This snippet is what makes the snake move in the
[Snake game](https://julienmoumne.github.io/rx-training-games/#?title=snake).

This approach leverages the
[CombineLatest Operator](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/combinelatest.md).

[DistinctUntilChanged](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/distinctuntilchanged.md)
and
[SkipUntil](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/skipuntil.md)
must be used to achieve the desired effect.

Use the Left, Up, Right and Down arrows of your keyboard to move the snake.

Comment `distinctUntilChanged(_.first)` and keep one of the keys pressed to see how it affects the behavior of the snake.

See [full diagram](js/samples/slither-using-combine-latest/slither-using-combine-latest.png).