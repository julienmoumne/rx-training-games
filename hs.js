item({desc: 'rx-training-games'}, function (){

    item({key: 'i', cmd: 'sudo npm install'})
    item({key: 'd', desc: 'dev mode build & run', cmd: 'npm start'})
    item({key: 'p', desc: 'prod mode build & run', cmd: 'npm run start:prod'})
    item({key: 'g', desc: 'generate gh-pages', cmd: './publish.sh'})
})