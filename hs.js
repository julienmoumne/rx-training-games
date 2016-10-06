item({desc: 'rx-training-games'}, function () {
    item({key: 'i', cmd: 'sudo npm install'})
    item({key: 'd', desc: 'dev mode build & run', cmd: 'npm start'})
    item({key: 'p', desc: 'prod mode build & run', cmd: 'npm run start:prod'})
    item({key: 'l', cmd: 'npm run lint'})
    item({key: 'g', desc: 'generate gh-pages' + '\n  ', cmd: script(
        'set -eu',
        'npm run lint',
        'git checkout gh-pages',
        'git merge master -m "Merge branch \'master\' into gh-pages"',
        'npm run build:prod',
        'git add -A',
        'git commit -m "publish rx-training-games"',
        'git push',
        'git checkout master'
    )})
})

function script () {
    src = '';
    _.each(arguments, function (el, ix) { src += '   ' + el + '\n' })
    return src
}