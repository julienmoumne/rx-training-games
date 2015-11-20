({
    baseUrl: '..',
    mainConfigFile: '../main.js',
    name: 'main',
    out: '../../dist/rx-training-games.app.min.js',
    include: [
        'lib/requirejs/require',
        '../dist/templates'
    ],
    optimize : 'none', // uglify does not support arrow functions, see https://github.com/mishoo/UglifyJS2/issues/448
    generateSourceMaps: true,
    preserveLicenseComments: false // http://requirejs.org/docs/errors.html#sourcemapcomments
})