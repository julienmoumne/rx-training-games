angular.module('rx-training-games.templates', [])
  .run(['$templateCache', function($templateCache) {
    $templateCache.put('html/controls.html',
    '<div class="controls">\n' +
    '    <span ng-show="on">\n' +
    '        <span class="label label-primary">Engine On</span>\n' +
    '        <button type="button" class="btn btn-default btn-xs" ng-click="stop()">\n' +
    '            <span class="glyphicon glyphicon-stop"></span> Stop\n' +
    '        </button>\n' +
    '        <span>or, hit \'Escape\'.</span>\n' +
    '    </span>\n' +
    '\n' +
    '    <span ng-hide="on">\n' +
    '        <span class="label label-primary">Engine Off</span>\n' +
    '        <button type="button" class="btn btn-default btn-xs" ng-click="start()">\n' +
    '            <span class="glyphicon glyphicon-play"></span> Start\n' +
    '        </button>\n' +
    '        <span>or, hit \'Ctrl + Return\'.</span>\n' +
    '    </span>\n' +
    '\n' +
    '    <div ng-show="error" class="error-message">\n' +
    '        <div class="text-center alert alert-info" role="alert">\n' +
    '            <p>The following error occurred : </p>\n' +
    '            <p><strong>{{ error }}</strong></p>\n' +
    '            <p><em>You can consult the stacktrace in your browser console for more details.</em></p>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>')
  $templateCache.put('html/editor.html',
    '<div ng-style="editorStyle()" ui-codemirror="{ onLoad : codemirrorLoaded }"></div>\n' +
    '\n' +
    '<small ng-show="embedded" class="built-using pull-right">\n' +
    '    <em>\n' +
    '        Built using\n' +
    '        <ng-include class="logo-sm" src="\'html/logo.html\'"></ng-include>\n' +
    '        <a title="Rx Training Games" href="{{ currentSample.link }}">Rx Training Games</a>\n' +
    '    </em>\n' +
    '</small>')
  $templateCache.put('html/github-export.html',
    '<a href\n' +
    '   title="Export to GitHub Gist"\n' +
    '   ng-click="saveAsGist(sample)"><span class="glyphicon glyphicon-cloud-upload"></span></a>')
  $templateCache.put('html/import-gist.html',
    '<form class="well well-sm">\n' +
    '    <div class="input-group input-group-sm">\n' +
    '\n' +
    '        <input type="text" class="form-control input-sm" ng-model="form.gist">\n' +
    '\n' +
    '        <span class="input-group-btn">\n' +
    '          <button type="submit" class="btn btn-default btn-sm" ng-click="importGist()">\n' +
    '              <span class="glyphicon glyphicon-cloud-download"></span>\n' +
    '              Import GitHub Gist\n' +
    '          </button>\n' +
    '        </span>\n' +
    '    </div>\n' +
    '</form>')
  $templateCache.put('html/logo.html',
    '<img class="logo" src="logo.svg" alt="Rx Training Games">')
  $templateCache.put('html/sample-body.html',
    '<div ng-click="$event.stopPropagation()">\n' +
    '\n' +
    '    <p markdown-to-html="sample.description"></p>\n' +
    '\n' +
    '    <a twitter\n' +
    '       ng-if="sample.active"\n' +
    '       ng-show="!sample.local || sample.gist"\n' +
    '       class="pull-right"\n' +
    '       data-count=\'none\'\n' +
    '       data-url=\'{{ sample.link }}\'\n' +
    '       data-text=\'Check out some Rx in action at \'></a>\n' +
    '\n' +
    '    <div ng-hide="sample.local">\n' +
    '        <a class="pull-left" href="https://github.com/JulienMoumne/rx-training-games/commits/master/js/samples/{{ sample.title }}">\n' +
    '            <strong>Authors</strong>\n' +
    '        </a>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-show="sample.local">\n' +
    '\n' +
    '        <hr/>\n' +
    '\n' +
    '        <p ng-hide="sample.gist">\n' +
    '            <em>\n' +
    '                You can\n' +
    '                <ng-include src="\'html/github-export.html\'"></ng-include>\n' +
    '                your work on GitHub Gist. This will allow you to save it on the cloud and share it with\n' +
    '                others.\n' +
    '            </em>\n' +
    '        </p>\n' +
    '        <p ng-show="sample.gist">\n' +
    '            <em>\n' +
    '                Saved on\n' +
    '                <a title="GitHub Gist Link"\n' +
    '                   ng-href="{{\'https://gist.github.com/anonymous/\' + sample.gist}}">GitHub Gist</a>\n' +
    '                {{sample.gistUploadDate | moment}}.\n' +
    '                <br/>\n' +
    '                You can\n' +
    '                <ng-include src="\'html/github-export.html\'"></ng-include>\n' +
    '                it again if you have made modifications since.\n' +
    '            </em>\n' +
    '        </p>\n' +
    '    </div>\n' +
    '</div>')
  $templateCache.put('html/sample-heading.html',
    '<span>\n' +
    '    {{ sample.title }} <small><em>{{sample.category}}</em></small>\n' +
    '</span>\n' +
    '\n' +
    '<span ng-click="$event.stopPropagation();" class="pull-right">\n' +
    '\n' +
    '    <a href ng-show="sample.local"\n' +
    '       title="Delete"\n' +
    '       ng-click="removeSample(sample)"><span class="glyphicon glyphicon-trash"></span></a>\n' +
    '\n' +
    '    <a title="{{ sample.local ? \'Duplicate tab\' : \'Modifications to this tab are not saved. You can copy it and work on your own version.\'}}"\n' +
    '       ng-click="startNewSample(sample.code())"><span class="glyphicon glyphicon-duplicate"></span></a>\n' +
    '\n' +
    '    <ng-include ng-show="sample.local && !sample.gist" src="\'html/github-export.html\'"></ng-include>\n' +
    '\n' +
    '    <a ng-show="!sample.local || sample.gist"\n' +
    '       ng-href="{{ sample.link }}"\n' +
    '       title="Share sample"><span class="glyphicon glyphicon-link"></span></a>\n' +
    '</span>\n' +
    '')
  $templateCache.put('html/samples-title.html',
    '<div class="text-center">\n' +
    '    <p>\n' +
    '        Fiddle with the samples bellow then\n' +
    '        <a href="https://github.com/JulienMoumne/rx-training-games/blob/master/README.md">learn about the project</a>.\n' +
    '    </p>\n' +
    '</div>')
  $templateCache.put('html/samples.html',
    '<uib-tabset>\n' +
    '\n' +
    '    <uib-tab\n' +
    '             ng-hide="category.title === draftCategory && !hasDraft"\n' +
    '             ng-repeat="category in categories"\n' +
    '             active="category.active"\n' +
    '             ng-click="selectCategory(category)">\n' +
    '\n' +
    '         <uib-tab-heading><strong>{{category.title}}</strong></uib-tab-heading>\n' +
    '\n' +
    '        <uib-accordion vertical="true">\n' +
    '\n' +
    '            <uib-accordion-group ng-repeat="sample in samples | filter : {category: category.title}"\n' +
    '                                 is-disabled="sample.active"\n' +
    '                                 is-open="sample.active"\n' +
    '                                 ng-click="selectSample(sample)">\n' +
    '\n' +
    '                <uib-accordion-heading>\n' +
    '                    <ng-include src="\'html/sample-heading.html\'"></ng-include>\n' +
    '                </uib-accordion-heading>\n' +
    '\n' +
    '                <ng-include src="\'html/sample-body.html\'"></ng-include>\n' +
    '\n' +
    '            </uib-accordion-group>\n' +
    '        </uib-accordion>\n' +
    '    </uib-tab>\n' +
    '\n' +
    '    <uib-tab\n' +
    '            ng-hide="hasDraft"\n' +
    '            ng-click="startNewSample()">\n' +
    '        <uib-tab-heading>\n' +
    '             new draft\n' +
    '        </uib-tab-heading>\n' +
    '    </uib-tab>\n' +
    '</uib-tabset>')
  $templateCache.put('html/title.html',
    '<h1>\n' +
    '    <ng-include src="\'html/logo.html\'"></ng-include>\n' +
    '    <a href="https://github.com/JulienMoumne/rx-training-games">Rx Training Games</a>\n' +
    '    <small>\n' +
    '        learn and practice <a href="http://reactivex.io/">Reactive Extensions</a> coding grid-based games\n' +
    '    </small>\n' +
    '</h1>\n' +
    '<hr>\n' +
    '')
  $templateCache.put('html/view.html',
    '<div growl></div>\n' +
    '\n' +
    '<div ng-keydown="keypress($event)" tabindex="0">\n' +
    '\n' +
    '    <span ng-hide="embedded">\n' +
    '        <ng-include src="\'html/title.html\'"></ng-include>\n' +
    '    </span>\n' +
    '\n' +
    '    <div class="row">\n' +
    '\n' +
    '        <div class="col-md-3" ng-hide="embedded">\n' +
    '\n' +
    '            <ng-include src="\'html/samples-title.html\'"></ng-include>\n' +
    '            <ng-include src="\'html/samples.html\'"></ng-include>\n' +
    '            <ng-include src="\'html/import-gist.html\'"></ng-include>\n' +
    '        </div>\n' +
    '\n' +
    '        <div ng-class="embedded ? \'col-xs-4\' : \'col-md-3\'">\n' +
    '\n' +
    '            <div class="grid-canvas" tabindex="1" grid-canvas onload="gridCanvasLoaded()"></div>\n' +
    '            <ng-include src="\'html/controls.html\'"></ng-include>\n' +
    '        </div>\n' +
    '\n' +
    '        <div ng-class="embedded ? \'col-xs-8\' : \'col-md-6\'">\n' +
    '            <ng-include src="\'html/editor.html\'"></ng-include>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-hide="embedded" class="github-fork-ribbon-wrapper right">\n' +
    '        <div class="github-fork-ribbon">\n' +
    '            <a href="https://github.com/JulienMoumne/rx-training-games">Fork me on GitHub</a>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>')

  }]);
