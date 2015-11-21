This snippet makes particles fall from the sky as in the
[Meteorites game](https://julienmoumne.github.io/rx-training-games/#?title=meteorites).

This approach leverages the
[GenerateWithAbsoluteTime Operator](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/generatewithabsolutetime.md)
and does not rely on shared state.

It revolves around the following structure : 
```javascript
{
    previous : { x: xValue, y: yValue },
    next : { x: xValue, y: yValue }
}
```