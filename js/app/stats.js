define([], () => {

    if (appConfig.devMode)
        return;

    this._paq = [];
    _paq.push(['enableLinkTracking']);
    var u = "//rx-training-games.piwikpro.com/";
    _paq.push(['setTrackerUrl', u + 'piwik.php']);
    _paq.push(['setSiteId', 1]);
    var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
    g.type = 'text/javascript';
    g.async = true;
    g.defer = true;
    g.src = u + 'piwik.js';
    s.parentNode.insertBefore(g, s);
});