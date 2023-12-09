/* eslint-disable */

(function () {
    // If browser needs currentScript polyfill, add get currentScript() to the document object
    if (!('currentScript' in document)) {
        Object.defineProperty(document, 'currentScript', {
            get: function () {
                // IE 8-10 support script readyState
                // IE 11+ support stack trace
                try {
                    throw new Error();
                } catch (err) {
                    // Find the second match for the "at" string to get file src url from stack.
                    // Specifically works with the format of stack traces in IE.
                    var i = 0,
                    stackDetails = (/.*at [^(]*\((.*):(.+):(.+)\)$/ig).exec(err.stack),
                    scriptLocation = (stackDetails && stackDetails[1]) || false,
                    line = (stackDetails && stackDetails[2]) || false,
                    currentLocation = document.location.href.replace(document.location.hash, ''),
                    pageSource,
                    inlineScriptSourceRegExp,
                    inlineScriptSource,
                    scripts = document.getElementsByTagName('script'); // Live NodeList collection
                    
                    if (scriptLocation === currentLocation) {
                        pageSource = document.documentElement.outerHTML;
                        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
                        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
                    }
                    
                    for (; i < scripts.length; i++) {
                        // If ready state is interactive, return the script tag
                        if (scripts[i].readyState === 'interactive') {
                            return scripts[i];
                        }
                        
                        // If src matches, return the script tag
                        if (scripts[i].src === scriptLocation) {
                            return scripts[i];
                        }
                        
                        // If inline source matches, return the script tag
                        if (
                            scriptLocation === currentLocation &&
                            scripts[i].innerHTML &&
                            scripts[i].innerHTML.trim() === inlineScriptSource
                            ) {
                                return scripts[i];
                            }
                    }
                        
                    // If no match, return null
                    return null;
                }
            }
        });
    }
        
    var regexesList = (regexesList = [
        {
            regexes: [
                // Trident based
                /(avant\s|iemobile|slim)(?:browser)?[\/\s]?([\w\.]*)/i, // Avant/IEMobile/SlimBrowser
                /(?:ms|\()(ie)\s([\w\.]+)/i, // Internet Explorer
                
                // Webkit/KHTML based
                /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i,
                // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
            ],
            name: '',
        },
        {
            regexes: [/(trident).+rv[:\s]([\w\.]{1,9}).+like\sgecko/i], // IE11,
            name: 'IE',
        },
        {
            regexes: [
                /(edge|edgios|edga|edg)\/((\d+)?[\w\.]+)/i, // Microsoft Edge
            ],
            name: 'Edge',
        },
        {
            regexes: [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i], // Chrome/OmniWeb/Arora/Tizen/Nokia
            name: '',
        },
        {
            regexes: [/((?:android.+)crmo|crios)\/([\w\.]+)/i], // Chrome for Android/iOS
            name: 'Chrome',
        },
        {
            regexes: [/fxios\/([\w\.-]+)/i], // Firefox for iOS
            name: 'Firefox',
        },
        {
            regexes: [/version\/([\w\.]+)\s.*mobile\/\w+\s(safari)/i], // Mobile Safari
            name: 'Mobile Safari',
        },
        {
            regexes: [/version\/([\w\.]+)\s.*(mobile\s?safari|safari)/i], // Safari & Safari Mobile
            name: '',
        },
        {
            regexes: [/(webkit|khtml)\/([\w\.]+)/i],
            name: '',
        },
        {
            regexes: [
                /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,
                // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
                /(firefox)\/([\w\.]+)\s[\w\s\-]+\/[\w\.]+$/i, // Other Firefox-based
                /(mozilla)\/([\w\.]+)\s.+rv\:.+gecko\/\d+/i, // Mozilla
            ],
            name: '',
        },
    ]);
    
    var currentScript = document.currentScript;
    var publication = currentScript.getAttribute('publication');
    
    
    function isApple() {
        var arr = ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'];
        return (
            arr.indexOf(navigator.platform) >= 0 || (navigator.userAgent.indexOf('Mac') >= 0 && 'ontouchend' in document)
            );
    };

        
    var links = {
        chrome: '<a href="https://www.google.com/chrome/">Google Chrome</a>',
        edge: '<a href="https://www.microsoft.com/en-us/windows/microsoft-edge">Microsoft Edge</a>',
        firefox: '<a href="https://www.mozilla.org/nb-NO/">Mozilla Firefox</a>',
        safari: '<a href="https://support.apple.com/no-no/HT204416">Safari</a>',
    };
        
    // This list of not supported browser should ideally be in sync with
    // https://amedia.slite.com/app/channels/hOlqx3Miez/notes/EclrnLo4hV (X means not supported)
    // The version listed and eariler versions are not supported.
    // Browsers without listed versions means no versions have support.
    var unsupportedBrowsers = [
        { name: 'safari', version: 11, displayName: 'Safari', upgrade: links.safari },
        { name: 'mobile safari', version: 11, displayName: 'Safari', upgrade: links.safari },
        {
            name: 'IE',
            version: 11,
            displayName: 'Internet Explorer',
            upgrade: links.edge,
        },
        { name: 'chrome', version: 56, displayName: 'Google Chrome', upgrade: links.chrome },
        {
            name: 'IE Edge',
            displayName: 'Edge',
            upgrade: links.edge,
        },
        {
            name: 'IEMobile',
            version: 11,
            displayName: 'Internet Explorer Mobile',
            upgrade: links.edge,
        },
    ];
    
    function mapMatch(match, name) {
        var versionIsFirst = parseInt(match[1], 10);
        
        return versionIsFirst
        ? { name: (name || match[2]).toLowerCase(), version: parseInt(match[1], 10) }
        : { name: (name || match[1]).toLowerCase(), version: parseInt(match[2], 10) };
    };
    
    function getBrowser(userAgent) {
        var browser = { name: undefined, version: undefined };
        
        regexesList.forEach(function (group) {
            group.regexes.forEach(function (regex) {
                var match = regex.exec(userAgent);
                
                if (match && !browser.name) {
                    var match = mapMatch(match, group.name);
                    browser.name = match.name;
                    browser.version = match.version;
                }
            });
        });
        var browserInfo = unsupportedBrowsers.find(function (uBrowser) { return uBrowser.name.toLowerCase() === browser.name; });
        browser.displayName = browserInfo && browserInfo.displayName;
        browser.upgrade = browserInfo && browserInfo.upgrade;
        
        return browser;
    };
    
    function suggestedBrowsers(browser) {
        var values = Object.keys(links).map(function (key) { return links[key]; });
        var items = isApple()
            ? values.filter(function (v) { return v !== browser.upgrade; })
            : values.filter(function (v) { return v !== links.safari && v !== browser.upgrade; });
        var last = items.pop();
        
        return items.join(', ') + ' eller ' + last;
    };
    
    var browser = getBrowser(navigator.userAgent);
    
    var isSupported = !unsupportedBrowsers.find(function (uBrowser) {
        var unsupportedName = uBrowser.name.toLowerCase() === browser.name;
        var unsupportedVersion = browser.version <= uBrowser.version || !uBrowser.version;
        return unsupportedName && unsupportedVersion;
    });
    
    if (isSupported) {
        return;
    }
    
    var currentBrowser = browser.displayName + ' ' + browser.version + '.';
    var upgradeLink = browser.upgrade ? browser.upgrade : browser.displayName;
    var browserSupportPageLink = publication
    ? 'Du kan lese mer om nettleserstøtte <a href="//' + publication + '/vis/info/nettlesere">her</a>.'
    : '';
    
    var isIOS = window.navigator.userAgent.match(/iPad/i) || window.navigator.userAgent.match(/iPhone/i);
    var iOSWarningText = [
        'Vi støtter ikke lenger ',
        currentBrowser,
        'Du bør oppgradere til siste versjon av ',
        upgradeLink,
        '.<span class="outdated-device-text">Dersom din enhet er en eldre iPad så kan det være at <b>produsenten av enheten</b> har avsluttet støtten for denne. Enheten vil derfor ikke kunne oppdateres.</span>'
    ].join('');
    
    var warningText = [
        'Vi støtter ikke lenger ',
        currentBrowser,
        'Du bør oppgradere til siste versjon av ',
        upgradeLink,
        ' eller velge en annen nettleser som f.eks. ',
        suggestedBrowsers(browser),
        '.<br>',
        browserSupportPageLink
    ].join('');
    
    document.body.insertAdjacentHTML('afterbegin', [
        '<style type="text/css">',
        '.browserwarning {position:fixed; top:0; left: 0; width: 100%; z-index: 100000; display: block; background: #fcf8e3; color: #292827; font-size: 22px; font-family: "Open Sans", "Helvetica Neue", Helvetica, "Segoe ui", Arial, sans-serif;}',
        '.browserwarning p {-webkit-box-sizing: border-box; box-sizing: border-box; max-width: 1020px; padding: 20px 20px 20px 80px; margin: 0 auto;}',
        '.browserwarning .outdated-device-text {display: inline-block;margin-top: 10px;}',
        '.browserwarning a {font-weight: 700;}',
        '.browserwarning svg {fill: #66512c;float: left;height: 50px;width: 50px;margin-left: -60px;}',
        '</style>',
        '<div class="browserwarning">',
        '<p>',
        '<svg class="icon icon-info" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">',
        '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>',
        '</svg>',
        isIOS ? iOSWarningText : warningText,
        '</p>',
        '</div>'
    ].join(''));
})();
    