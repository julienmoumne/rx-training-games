*Rx Training Games* is a coding playground that can be used to 
learn and practice [Reactive Extensions](http://reactivex.io/) coding [grid-based](API.md) games.

See it in action [here](https://julienmoumne.github.io/rx-training-games).

The project ambitions are to :

 * offer a way to learn new technology while having fun - with as little hardware and software requirements as possible
 * demonstrate how leveraging current technology makes it easy to build such training platforms

The idea came out of several sources of inspiration :
 
 * [A Playful Introduction to Rx by Erik Meijer](https://youtu.be/WKore-AkisY) 
 * Online coding playgrounds such as [JS Bin](https://jsbin.com) and [CodingGame](https://www.codingame.com)

 
## How does it work

*Rx Training Games* is a standalone JavaScript app that runs entirely in the browser, [its sole requirement](#browser-compatibility).

Execution of user submitted JavaScript is secured using [Jailed](https://github.com/asvd/jailed)
and is saved in the browser's [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API).

GitHub Gists can be used to publicly share code samples.

Developing using Reactive Extensions is possible in JavaScript thanks to [RxJS](https://github.com/Reactive-Extensions/RxJS).
Concepts found in this project are equally applicable to any of Reactive Extensions' [implementations](http://reactivex.io/languages.html).
 
A combination of [HTML5 Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) and a custom built [API](API.md)
allows the developer to interact with a grid-based display.
 

## How to contribute
 
*Rx Training Games* allows you to experiment your own ideas by developing code samples inside the browser.
 
Please consider improving the project by publishing your code samples. Here are the steps :

 1. [fork](https://help.github.com/articles/fork-a-repo) and [clone](https://help.github.com/articles/cloning-a-repository/) the project
 2. create a directory for your work in [js/samples](js/samples)
 3. add a JavaScript and a README.md file taking as example [js/samples/meteorites](js/samples/meteorites)
 4. register your sample in [js/samples/catalog.js](js/samples/catalog.js)
 5. test your contribution by [building and running the project locally](#how-to-build-and-run-the-code-locally) 
 6. commit, push and create a [pull request](https://help.github.com/articles/using-pull-requests)

Contributions to the platform core are also welcomed. See [how to build and run the code locally](#how-to-build-and-run-the-code-locally).


## API

Developing code samples is done using the [API](API.md).


## How to build and run the code locally

Building and running the project is done using [npm](https://www.npmjs.com/) with the method described in
[blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool](http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool).

The following commands assume you have npm installed and the project has been primed using `npm install`.
  
 *  build & run for development : `npm start` (alias of `npm run build:dev && npm run start:server:dev`)
 *  build & run for production : `npm run start:prod` (alias of `npm run build:prod && npm run start:server:prod`)

A [Hotshell](https://github.com/julienmoumne/hs) menu is provided with these commands. [See its source](./hs.js).

## Browser Compatibility

The conciseness of the code examples provided in the platform rely heavily on 
[Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).

You will need a browser from this [list](http://caniuse.com/#feat=arrow-functions) to use the platform.

## Embedded mode

Code samples can be embedded in web pages using an iframe :

```html
<iframe
    width="100%"
    height="450px"
    frameborder="0"
    src="https://julienmoumne.github.io/rx-training-games/#?title=rain-using-state">
</iframe>
```

See [embedded mode demo](https://julienmoumne.github.io/rx-training-games/embedded-demo) and
[Introducing Rx Training Games](http://moumne.com/2015/11/22/introducing-rx-training-games/).

Auto start can be prevented by appending `&preventstart=true` to the URL.


## GitHub Page

[Rx Training Games](https://julienmoumne.github.io/rx-training-games) is published as a
[GitHub Page](https://pages.github.com/) using [publish.sh](publish.sh).

## Other Playgrounds

Here is a list of projects that have goals in common with *Rx Training Games* :

 * [www.objectplayground.com](http://www.objectplayground.com) a tool for visualizing and experimenting with JavaScript object relationships
 * [jessevdk.github.io/webgl-play](http://jessevdk.github.io/webgl-play/) a live editing environment for experimenting WebGL
 * [xgrommx.github.io/rx-book](http://xgrommx.github.io/rx-book) a book on RxJS with live examples built on top of [JS Bin](https://jsbin.com)
 * [www.typescriptlang.org/Playground](http://www.typescriptlang.org/Playground) a TypeScript playground
 * [www.playmycode.com](http://www.playmycode.com) an online platform for building, playing and sharing browser games
 * [RxMarbles](http://rxmarbles.com/) a list of interactive diagrams of Rx Observables

## License

*'Rx Training Games'* is released under the GPL v3 (or later) license, see [gpl-3.0.txt](misc/gpl-3.0.txt).