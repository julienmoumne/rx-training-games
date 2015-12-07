define([
    'angular',
    'rx',
    'runtime/gridcanvas',
    'samples/catalog',
    'codemirror',
    'moment',
    'chance',
    'text!samples/kickstart/kickstart.js',
    'text!samples/kickstart/README.md'
], (angular, Rx, GridCanvas, SampleCatalog, CodeMirror, moment, Chance, KickstartJS, KickstartMD) => {

    'use strict';

    // todo split into multiple components
    return function ($scope,
                     $rootScope,
                     $location,
                     localStorageService,
                     cfpLoadingBar,
                     GitHubService,
                     ExecService,
                     AppConfig,
                     growl,
                     $analytics) {

        var localStorageKey = 'local-samples';
        var draftCategory = 'draft';
        var keyboardObservable;
        var editor;
        var preventStart = $location.search().preventstart;
        var embedded = window != window.top;
        var headerSize = embedded ? 30 : 120;
        var editorHeight = window.innerHeight - headerSize;

        (function init() {

            initSamples();
            initScope();
            initKeyboardEvents();
        })();

        function selectSample(requestedSample) {

            var searchCriteria = requestedSample ?
                convertSampleToLookup(requestedSample) :
                getSearchCriteriaFromURL();

            lookupSample(searchCriteria, sample => {

                $location.search(convertSampleToSearch(sample));
                $scope.currentSample = sample;

                if (_.isEqual(editor.getDoc().sample, sample))
                    return;

                trackPageView();

                if ($scope.embedded && preventStart)
                    activateSample(sample);
                else
                    activateAndStartSample(sample);
            });
        }

        function trackPageView() {
            $analytics.pageTrack($location.url());
        }

        function convertSampleToLookup(sample) {
            return sample.gist ? {gist: sample.gist} : {title: sample.title};
        }

        function convertSampleToSearch(sample) {
            var search = convertSampleToLookup(sample);
            search.preventstart = preventStart;
            return search;
        }

        function getSearchCriteriaFromURL() {
            return _.pick($location.search(), 'title', 'gist');
        }

        function initScope() {

            $scope.form = {};
            $scope.start = start;
            $scope.stop = stop;
            $scope.selectSample = selectSample;
            $scope.codemirrorLoaded = initEditor;
            $scope.gridCanvasLoaded = selectSample;
            $scope.startNewSample = startNewSample;
            $scope.removeSample = removeSample;
            $scope.saveAsGist = saveAsGist;
            $scope.importGist = importGist;
            $scope.selectCategory = selectCategory;
            $scope.draftCategory = draftCategory;
            $scope.embedded = embedded;
            $scope.$on('$routeUpdate', () => selectSample());
        }

        function selectCategory(category) {
            selectSample(getDefaultSample(category.title));
        }

        function saveAsGist(sample) {

            GitHubService.saveSample(sample, gist => {
                $scope.$apply(() => {
                    sample.gist = gist.id;
                    sample.gistUploadDate = moment();
                    setSampleLink(sample);
                });

                selectSample(sample);
                trackPageView();
                saveLocalSamples();
            });
        }

        function importGist() {

            var gist = /[^/]+$/.exec($scope.form.gist)[0];
            selectSample({gist: gist});
        }

        function gameKeysShielder(e) {
            if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1)
                e.preventDefault();
        }

        function shieldGameKeys() {
            window.addEventListener('keydown', gameKeysShielder, false);
        }

        function unshieldGameKeys() {
            window.removeEventListener('keydown', gameKeysShielder, false);
        }

        function startNewSample(code) {

            var sample = initNewUserSample(code ? {code: code} : undefined);
            selectSample(sample);
        }

        function initNewUserSample(userSample) {

            var sample = userSample || {code: KickstartJS};
            sample.title = 'draft-' + Chance().hash({length: 5});

            sample = initUserSample(sample);

            saveLocalSamples();

            return sample;
        }

        function removeSample(sample) {

            var index = _.findIndex($scope.samples, sample);
            $scope.samples.splice(index, 1);

            saveLocalSamples();

            if (_.isEqual(editor.getDoc().sample, sample))
                selectSample(getDefaultSample(draftCategory));
        }

        function initUserSample(savedSample) {

            var sample = {
                title: savedSample.title,
                category: draftCategory,
                description: KickstartMD,
                local: true,
                code: savedSample.code,
                gist: savedSample.gist
            };

            if (sample.gist)
                sample.gistUploadDate = moment(savedSample.gistUploadDate);

            initSample(sample);

            $scope.samples.push(sample);

            return sample;
        }

        function initEditor(_editor) {

            editor = _editor;

            editor.setOption("lineWrapping", true);
            editor.setOption("theme", "elegant");
            editor.on("focus", onEditorFocus);
            editor.on("change", saveLocalSamples);

            _editor.display.wrapper.style.height = editorHeight + 'px';

            editor.refresh();

            $scope.editorLoaded = true;
        }

        function onEditorFocus() {
            $scope.$apply(stop);
            unshieldGameKeys();
        }

        function initKeyboardEvents() {

            keyboardObservable = $scope.$createObservableFunction('keypress').share();
            keyboardObservable.filter(_.matcher({keyCode: 27})).subscribe(stop); // escape
            keyboardObservable.filter(_.matcher({keyCode: 13, ctrlKey: true})).subscribe(start); // ctrl + enter
        }

        function initSamples() {

            angular.forEach(SampleCatalog, initSample);

            $scope.samples = SampleCatalog;

            $scope.categories = _.map(_.uniq(_.pluck(SampleCatalog, 'category')).concat(draftCategory), category => ({
                title: category
            }));

            angular.forEach(localStorageService.get(localStorageKey), initUserSample);

            updateDraftSwitch();
        }

        function lookupSample(search, callback) {

            var lookedUpSample = _.find($scope.samples, _.matches(search));

            if (lookedUpSample)
                return callback(lookedUpSample);

            if (!lookedUpSample && !search.gist)
                return callback(getDefaultSample());

            loadGist(search.gist, callback);
        }

        function loadGist(gist, callback) {

            GitHubService.loadSample(gist, sample => {
                growl.info('Successfully imported gist ' + gist);
                callback(initNewUserSample(sample));
            });
        }

        function getDefaultSample(category) {
            return findSampleWithCategory(category) || $scope.samples[0];
        }

        function findSampleWithCategory(category) {
            return _.findWhere($scope.samples, {category: category});
        }

        function updateDraftSwitch() {
            $scope.hasDraft = findSampleWithCategory(draftCategory);
        }

        function initSample(sample) {

            sample.doc = CodeMirror.Doc(sample.code, 'javascript');
            sample.code = () => sample.doc.getValue();
            sample.doc.sample = sample;
            setSampleLink(sample);
        }

        function setSampleLink(sample) {

            var params = sample.gist ? 'gist=' + sample.gist : 'title=' + sample.title;
            sample.link = AppConfig.baseUrl + '#?' + params;
        }

        function activateAndStartSample(sample) {

            activateSample(sample);
            start();
        }

        function activateSample(sample) {
            sample.active = true;
            editor.swapDoc(sample.doc);
            _.findWhere($scope.categories, {title: sample.category}).active = true;
            GridCanvas.displayBlankCanvas();
        }

        function stop() {

            ExecService.stop();

            $scope.on = false;
        }

        function start() {

            stop();
            loadingIndicatorOn();
            $scope.error = null;

            ExecService.run(editor.getDoc().getValue(), {
                keyboardObservable: keyboardObservable,
                onStart: () => {

                    $scope.$apply(() => {
                        $scope.on = true;
                    });

                    shieldGameKeys();

                    GridCanvas.getDomElement().focus();

                    loadingIndicatorOff();
                },
                onError: error => {

                    $scope.$apply(() => {
                        $scope.error = error;
                        $scope.on = false;
                    });

                    loadingIndicatorOff();
                },
                onEndOfGame: () => $scope.$apply(()  => $scope.on = false)
            });
        }

        function loadingIndicatorOn() {
            cfpLoadingBar.start();
        }

        function loadingIndicatorOff() {
            cfpLoadingBar.complete();
        }

        function saveLocalSamples() {

            updateDraftSwitch();

            localStorageService.set(
                localStorageKey,
                _.map(getLocalSamples(), sample => ({
                    title: sample.title,
                    code: sample.code(),
                    gist: sample.gist,
                    gistUploadDate: sample.gistUploadDate ? sample.gistUploadDate.format() : undefined
                }))
            );
        }

        function getLocalSamples() {
            return _.where($scope.samples, {local: true});
        }
    };
});
