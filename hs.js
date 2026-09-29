item({desc: 'rx-training-games'}, function () {
    item({key: 'i', cmd: 'sudo npm install'})
    item({key: 'd', desc: 'dev mode build & run', cmd: 'npm start'})
    item({key: 'p', desc: 'prod mode build & run', cmd: 'npm run start:prod'})
    item({key: 'l', cmd: 'npm run lint'})
    item({key: 'g', desc: 'build & publish GitHub Pages from master' + '\n  ', cmd: script(
        'set -eu',
        'test "$(git rev-parse --abbrev-ref HEAD)" = master || { echo "publish must run from master"; exit 1; }',
        'npm run build:prod',
        'git add -A',
        'git commit -m "publish rx-training-games"',
        'git push origin master'
    )})
})

function script () {
    src = '';
    _.each(arguments, function (el, ix) { src += '   ' + el + '\n' })
    return src
}