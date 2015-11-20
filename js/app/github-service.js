define(['underscore', 'octokat', 'ejs', 'text!samples/kickstart/GIST-README.ejs'], (_, Octokat, ejs, GistReadme) => {

    'use strict';

    return function (AppConfig, cfpLoadingBar, growl) {

        var filename = 'rx-training-games-draft-savepoint.js';
        var githubApi = (new Octokat());

        function displayError() {

            var error =
                'Error while contacting GitHub API. Please retry later or consider ' +
                '<a href="https://github.com/JulienMoumne/rx-training-games/issues/new">' +
                'opening a ticket' +
                '</a>';

            growl.error(error);
            cfpLoadingBar.complete();
        }

        return {
            saveSample: (sample, callback) => {

                cfpLoadingBar.start();

                var gistRequest = {
                    description: "Rx Training Games - Draft Savepoint",
                    public: true,
                    files: {
                        readme: {
                            filename: 'README.md',
                            content:  ejs.render(GistReadme, {url: AppConfig.baseUrl})
                        },
                        js : {
                            filename: filename,
                            content: sample.code()
                        }
                    }
                };

                githubApi.gists.create(gistRequest).then(
                    gist => {
                        cfpLoadingBar.complete();
                        callback(gist);
                    },
                    displayError
                );
            },
            loadSample: (gistId, callback) => {

                cfpLoadingBar.start();

                githubApi.gists(gistId).fetch().then(gist => {

                    callback({
                        gist: gist.id,
                        gistUploadDate: gist.createdAt,
                        code: _.findWhere(gist.files, {language: 'JavaScript'}).content
                    });
                }, displayError);
            }
        };
    };
});