({
    baseUrl: '..',
    // mainConfigFile: '../runtime/main.js', // can not reuse, baseUrl needs to be absolute in main.js because jailed uses 'window.URL.createObjectURL' to create workers
    name: 'runtime/engine-bootstrap',
    out: '../../dist/rx-training-games.runtime.min.js',
    paths: {
        requireLib: 'lib/requirejs/require',
        rx: 'lib/rxjs/dist/rx.all', // duplicated in main.js, see comment above
        underscore: 'lib/underscore/underscore' // duplicated in main.js, see comment above
    },
    include: ['requireLib'],
    optimize : 'none', // uglify does not support arrow functions, see https://github.com/mishoo/UglifyJS2/issues/448
    generateSourceMaps: true,
    preserveLicenseComments: false // http://requirejs.org/docs/errors.html#sourcemapcomments
})