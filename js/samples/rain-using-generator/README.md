This snippet makes particles fall from the sky as in the
[Meteorites game](https://julienmoumne.github.io/rx-training-games/#?title=meteorites).

This approach leverages
[ECMAScript 6 Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function%2A)
and does not rely on shared state.

It revolves around the following structure : 
```javascript
{
    previous : { x: xValue, y: yValue },
    next : { x: xValue, y: yValue }
}
```