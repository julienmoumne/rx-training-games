define([], () => {

    if (appConfig.devMode)
        return;

    this._paq = [];
    _paq.push(['enableLinkTracking']);
    var u = "//piwik.moumne.com/";
    _paq.push(['setTrackerUrl', u + 'piwik.php']);
    _paq.push(['setSiteId', 11]);
    var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
    g.type = 'text/javascript';
    g.async = true;
    g.defer = true;
    g.src = u + 'piwik.js';
    s.parentNode.insertBefore(g, s);
});