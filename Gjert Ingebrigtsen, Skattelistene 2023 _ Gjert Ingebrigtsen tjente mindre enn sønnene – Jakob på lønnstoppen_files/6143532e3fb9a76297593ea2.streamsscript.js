/* Kilkaya AS - 20221011_133848 */
var LP4={id:"IS_NOT_SETUP",config:{stream:{streamUrl:"https://cdn-app-eu.lp4.io/stream.json",apiMode:!1,render:{blackList:function(a,b){}}}},getUrl:function(){return"undefined"!==typeof kilkaya?kilkaya.pageData.getField("url"):location.href},getPageAtr:function(a,b){return"undefined"!==typeof kilkaya?kilkaya.pageData.getField(a):""},getDomain:function(){if("undefined"!==typeof kilkaya){var a=new URL(kilkaya.pageData.getField("url"));return a.hostname.split(".").slice(-2).join(".")}a=new URL(location.href);
return a.hostname.split(".").slice(-2).join(".")},getChannel:function(){return kilkaya.pageData.getField("channel")},gElmCN:function(a,b){if(!b||""==b)return[];var c=null;c="function"!=typeof a.getElementsByClassName?function(l,m){for(var p=[],n=l.getElementsByTagName("*"),q=n.length,k=0;k<q;k++)-1<(""+n[k].className).indexOf(m)&&p.push(n[k]);return p}:function(l,m){return l.getElementsByClassName(m)};if("string"==typeof b)return c(a,b);for(var d=[],e=0;e<b.length;e++)for(var g=c(a,b[e]),h=g.length,
f=0;f<h;++f)d.push(g[f]);return d},_callbackMethods:{cl:{}},registerCallback:function(a,b,c){return"undefined"!=typeof LP4._callbackMethods[a]&&"undefined"!==typeof c&&""!==c&&"undefined"==typeof LP4._callbackMethods[a][c]?(LP4._callbackMethods[a][c]=b,console.debug(b),c):!1},aEvt:function(a,b,c,d){if(1==d&&null==LP4.evtSupportsPassive){LP4.evtSupportsPassive=!1;try{var e=Object.defineProperty({},"passive",{get:function(){LP4.evtSupportsPassive=!0}});window.addEventListener("test",null,e)}catch(g){}}a.addEventListener?
a.addEventListener(b,c,1==d&&1==LP4.evtSupportsPassive?{passive:!0}:!1):(b="DOMContentLoaded"===b?"load":b,a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c)},getCookie:function(a,b){"undefined"==typeof b&&(b=vars.cookiePrefix);var c=b+a+"=";if(0<document.cookie.length){var d=document.cookie.indexOf(c);if(-1!=d)return d+=c.length,c=document.cookie.indexOf(";",d),-1==c&&(c=document.cookie.length),unescape(document.cookie.substring(d,c))}return null},setCookie:function(a,b,c,d,e,g,h,f){"undefined"===
typeof h&&(h=vars.cookiePrefix);"undefined"===typeof f&&(f="lax");a=h+a+"="+escape(b)+(c?"; expires="+c.toGMTString():"")+(d?"; path="+d:"")+(e?"; domain="+e:"")+(f?"; samesite="+f:"")+(g?"; secure":"");document.cookie=a}};LP4.aEvt(document,"click",function(a){a=!a.target&&a.srcElement?a.srcElement:a.target;for(var b in LP4._callbackMethods.cl)if("lp_streams"==b)try{LP4._callbackMethods.cl[b]({clickElm:a})}catch(c){console.log("Could not execute callback: "+c.toString()),console.debug(LP4._callbackMethods)}});
/*
 Linkpulse Streams 1.0.30 - http://www.linkpulse.com - Linkpulse AS - copyright 2020
*/
if("undefined"!==typeof LP4&&"undefined"===typeof LP){var LP={};"undefined"===typeof LP.stream?LP.stream=function(){var h=!1,l=!1,d={storageNamePrefix:"_LPS_",debug:!1,lazyLoad:!1,apiMode:!1,engine:"section",htmlMode:!1,autoRender:!0,viewThreshold:10,minPercentAsView:90,historyTTL:604800,streamCacheTTL:300,streamUrl:"https://app-eu.lp4.io/stream.json",streamConfigUrl:"https://app-eu.lp4.io/stream.json",learningViews:100,logStats:!0,logDiagnostic:!1,logRenderStats:!1,uniqueDiagnostic:!1,diagnosticTTL:3600,
comContent:!1},g="",e="",k=function(a){d.debug&&console.log("LP.stream: "+a)},q=function(a,b){var c=document.createElement("script");c.async=!0;c.id="lp.stream.requester";c.setAttribute("src",a);var d=function(c){if("function"===typeof b)try{b(a)}catch(p){console.error("Could not call callback function: "+p.toString()),console.debug(b)}setTimeout(function(){var a=document.getElementById("lp.stream.requester");a&&a.parentNode.removeChild(a)},250)};c.onload=d;c.onerror=d;document.getElementsByTagName("head")[0].appendChild(c)},
r=function(a){if("undefined"!=typeof LP4.config.stream)for(var b in LP4.config.stream)typeof("undefined"!=d[b])&&(d[b]=LP4.config.stream[b]);typeof("undefined"!==a)?d.streams=a:console.error("LP streams, nothing setup for this site....");d.debug&&console.debug(d);l=!0;!1===d.apiMode?m():LP.stream.history.init()},n=function(a){"undefined"===typeof a&&(a=!1);var b=t();b||a?r(b):(a="undefined"!==typeof LP4.config.stream.streamUrl&&""!=LP4.config.stream.streamUrl?LP4.config.stream.streamUrl:d.streamUrl,
"undefined"!==typeof LP4.config.stream.streamConfigUrl&&LP4.config.stream.streamConfigUrl!==a&&(a=LP4.config.stream.streamConfigUrl),q(a+"/"+LP4.id+"/config?cb=LP.stream.scfg",function(){n(!0)}))},t=function(){if(!LP.stream.storage.canStore())return!1;var a=LP.stream.storage.get("cfg");if(0!=a){if(a.t>parseInt((new Date).getTime()/1E3))return a.d;LP.stream.debug(" cached config has expired")}return!1},m=function(a){"undefined"===typeof a&&(a=0);"loading"===document.readyState&&10>a?setTimeout(function(){m(++a)},
500):(LP.stream.history.init(),d.apiMode||LP.stream.render.init(),d.logDiagnostic&&u())},u=function(){var a=LP.stream.history.getVar("diagTTL"),b=parseInt((new Date).getTime()/1E3);if(null===a||b-a>d.diagnosticTTL){LP.stream.debug("diagnostic running....");a=LP.stream.storage.getDiagnostic();var c=LP.stream.history.getDiagnostic();for(f in c)a[f]=c[f];var f="stream";d.uniqueDiagnostic&&(c=LP4.getCookie("u"),0!=c&&null!=c&&""!=c&&(f=c));LP4.api.log("stdiag",{res:"m",set:{did:e,cid:LP4.getChannel(),
aid:f,pvsa:a.pvsa,pvsm:a.pvsm,urva:a.urva,urvm:a.urvm,alsm:a.alsm,alsa:a.alsa,lpcm:a.lpcm,lpca:a.lpca,lphm:a.lphm,lpha:a.lpha,lpssm:a.lpssm,lpssa:a.lpssa,ver:"1.0.2"},inc:{cnt:1,pvs:a.pvs,urv:a.urv,lpsc:a.lpsc}});LP.stream.history.setVar("diagTTL",b)}};return{init:function(){if(!h){h=!0;k("Loading....");g=LP4.getUrl();"function"==typeof LP4.config.stream.urlFilter&&(g=LP4.config.stream.urlFilter(g));var a=g;if(LP4.getDomain)e=LP4.getDomain(a);else{if("undefined"===typeof a)a=document.location;else{var b=
document.createElement("a");b.href="http://"+a;a=b}a=a.hostname.split(".");2<a.length&&a.shift();e=a.join(".")}n();k("apiMode: "+d.apiMode)}},reInit:function(){h=!1;LP.stream.init()},scfg:function(a){if("object"===typeof a){if(LP.stream.storage.canStore()){var b="undefined"!==typeof a[e]?a[e].streams:{};if("undefined"!==typeof a["*"])for(var c in a["*"].streams)"undefined"===typeof b[c]&&(b[c]=a["*"].streams[c]);LP.stream.storage.set("cfg",{t:parseInt((new Date).getTime()/1E3)+1800,d:b})}}else console.error("LP stream: config is broken....")},
cfg:d,debug:k,initStream:function(a,b,c){if(!1===l)setTimeout(function(){LP.stream.initStream(a,b,c)},100);else{if(""==a||"undefined"===typeof LP.stream.cfg.streams[a])return console.error("LP.stream: "+a+" does not exists"),!1;"function"!==typeof b&&(b=null);"undefined"===typeof c&&(c=LP.stream.cfg.engine);LP.stream.engine.initEngine(c,a);LP.stream.loader.load(a,function(){if(null!==b)try{b(a)}catch(f){}})}},getNext:function(a){return""==a||"undefined"===typeof LP.stream.cfg.streams[a]?(console.error("LP.stream: "+
a+" does not exists"),!1):LP.stream.engine.getNext(a)},get:function(a,b){if("undefined"===typeof b||1>b||1E3<b)return!1;for(var c=0,d=[];c<b;){var e=LP.stream.getNext(a);if(0!=e)d.push(e);else break;c++}return d},addUrlView:function(a,b){LP.stream.history.addUrlView(a,b)},addUrlRead:function(a,b){LP.stream.history.addUrlRead(a,b)},getUrl:function(){return g},getDomain:function(){return e},getStreamSlot:function(a){if(!a.hasAttribute)return!1;for(var b=0;a&&a.hasAttribute&&!a.hasAttribute("data-lp-stream-slot")&&
20>++b;)a=a.parentNode;return a&&a.hasAttribute("data-lp-stream-slot")?{container:a,stream:a.getAttribute("data-lp-stream"),streamSlotId:a.getAttribute("data-lp-stream-slot"),engine:a.getAttribute("data-lp-stream-engine"),render:a.getAttribute("data-lp-stream-render"),rows:a.getAttribute("data-lp-stream-render-rows"),validFormats:a.getAttribute("data-lp-stream-render-validformats")}:!1}}}():console.error("LP.stream: already loaded!")};
"undefined"!==typeof LP.stream&&"undefined"===typeof LP.stream.history&&(LP.stream.history=function(){var h=!1,b={},g=function(){if(LP.stream.storage.canStore()){b._.s=d();for(var a=["s","u"],c=0;c<a.length;c++){var e={},f;for(f in b[a[c]])b[a[c]][f].t>d()-LP.stream.cfg.historyTTL&&(e[f]=b[a[c]][f]);b[a[c]]=e}LP.stream.storage.set("uh",b);LP.stream.debug("History saved!")}},k=function(a,c){"undefined"===typeof a&&(a=LP4.getUrl());"function"===typeof LP4.config.stream.urlFilter&&(a=LP4.config.stream.urlFilter(a));
a=e(a);LP.stream.debug("addPage visit to history: '"+a+"' section: "+c);b._.v++;"undefined"===typeof b.u[a]?b.u[a]={t:d(),r:1,v:1}:(b.u[a].r++,b.u[a].t=d());"undefined"===typeof c&&(c=LP4.getPageAtr("section",""));""!==c&&null!==c&&!1!==c&&0<c.length&&("undefined"===typeof b.s[c]?b.s[c]={r:1,v:0,t:d()}:(b.s[c].r++,b.s[c].t=d()));g()},d=function(){return parseInt((new Date).getTime()/1E3)},e=function(a){a=a.replace(/^https?:\/\//i,"");return a=a.replace(/^\/\//i,"")};return{init:function(){if(!h){h=
!0;if(LP.stream.storage.canStore()){var a=LP.stream.storage.get("uh");b=null!==a&&!1!==a?a:{_:{t:d(),s:d(),v:0,u:"fb"},u:{},s:{}};a=d()-b._.s;86400<a?b._.u="fb":1800<a&&(b._.u="nu");a={};for(var c in b.u)259200>d()-b.u[c].t&&(a[c]=b.u[c]);b.u=a}k()}},isRead:function(a){"function"===typeof LP4.config.stream.urlFilter&&(a=LP4.config.stream.urlFilter(a));return"undefined"!==typeof b.u[a]&&0<b.u[a].r?!0:!1},isViewed:function(a){"function"===typeof LP4.config.stream.urlFilter&&(a=LP4.config.stream.urlFilter(a));
a=e(a);if("undefined"!==typeof b.u[a]&&"undefined"!==typeof b.u[a].v&&b.u[a].v>=LP.stream.cfg.viewThreshold)return LP.stream.debug("isViewed: "+a+" is visited "+b.u[a].v+" times, cfg: "+LP.stream.cfg.viewThreshold),!0;LP.stream.debug("isViewed: "+a+" is NOT visited ");return!1},addUrlRead:k,addUrlView:function(a,c){LP.stream.debug("- adding urlview:"+a+" "+c);"function"===typeof LP4.config.stream.urlFilter&&(a=LP4.config.stream.urlFilter(a));a=e(a);"undefined"===typeof b.u[a]?b.u[a]={t:d(),r:0,v:1}:
(b.u[a].v++,b.u[a].t=d());"string"===typeof c&&""!==c&&null!==c&&!1!==c&&0<c.length&&("undefined"===typeof b.s[c]?b.s[c]={r:0,v:1,t:d()}:(b.s[c].v++,b.s[c].t=d()));g()},getUrlViews:function(a){"function"===typeof LP4.config.stream.urlFilter&&(a=LP4.config.stream.urlFilter(a));a=e(a);return"undefined"!==typeof b.u[a]?b.u[a].v:0},getSectionHistory:function(){return"undefined"!==typeof b.s?b.s:{}},getTotalViews:function(){return b._.v},getSuggestedStream:function(a){return-1==a.indexOf("|")?a:LP4.isPaywallUser&&
LP4.isPaywallUser()&&-1<a.indexOf("pu")?"pu":-1<a.indexOf(b._.u)?b._.u:"fb"},getDiagnostic:function(){var a={pvs:0,pvsa:0,pvsm:0,urv:0,urva:0,urvm:0},c;for(c in b.u)a.pvs+=b.u[c].r,a.pvsa+=b.u[c].r,a.pvsm+=b.u[c].r,a.urv+=b.u[c].v,a.urva+=b.u[c].v,a.urvm+=b.u[c].v;return a},getVar:function(a){return"undefined"!==typeof b._[a]?b._[a]:null},setVar:function(a,c){if(""==a||null==a||3>a.length)return LP.stream.debug("setVar name to short"),!1;null===c&&(c="");b._[a]=c;g()}}}());
"undefined"!==typeof LP.stream&&"undefined"===typeof LP.stream.engine&&(LP.stream.engine=function(){var d={},e=null,f=function(a,b){for(var c=0;c<a.length;c++){var d=LP.stream.history.getUrlViews(a[c].url);0<d&&(a[c].score-=a[c].score/100*b*d)}a.sort(function(a,b){return a.score>b.score?-1:a.score<b.score?1:0});return a};return{engines:[],initEngine:function(a,b){typeof(null!=a)&&""!=a&&"undefined"!==typeof LP.stream.engine.engines[a]?"undefined"===typeof d[b]&&(LP.stream.engine.engines[a].init(b),
d[b]=a):console.error("LP stream could not initialize engine: ["+a+"]");null===e&&(e="undefined"!==typeof LP4.config.stream.render.blackList?"function"===typeof LP4.config.stream.render.blackList?LP4.config.stream.render.blackList(a,b):LP4.config.stream.render.blackList:[])},addPageToHistory:function(){},setStream:function(a,b){LP.stream.debug("setStream: "+d[a]+":"+a);try{"undefined"!==typeof LP4.config.stream.render.weightViewed&&(b=f(b,LP4.config.stream.render.weightViewed)),LP.stream.engine.engines[d[a]].setStreamData(a,
b)}catch(c){console.error("Could not load stream data: "+c.toString()),console.debug(b)}},getNext:function(a){var b=LP.stream.engine.engines[d[a]].getNext(a,e);if("function"===typeof LP4.config.stream.customBlacklist)for(var c=LP4.config.stream.customBlacklist(b),f=0;c&&1E3>++f;)b=LP.stream.engine.engines[d[a]].getNext(a,e),c=LP4.config.stream.customBlacklist(b);return b}}}());
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,d,b){a!=Array.prototype&&a!=Object.prototype&&(a[d]=b.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(a,d,b,c){if(d){b=$jscomp.global;a=a.split(".");for(c=0;c<a.length-1;c++){var e=a[c];e in b||(b[e]={});b=b[e]}a=a[a.length-1];c=b[a];d=d(c);d!=c&&null!=d&&$jscomp.defineProperty(b,a,{configurable:!0,writable:!0,value:d})}};$jscomp.polyfill("Object.is",function(a){return a?a:function(a,b){return a===b?0!==a||1/a===1/b:a!==a&&b!==b}},"es6","es3");
$jscomp.polyfill("Array.prototype.includes",function(a){return a?a:function(a,b){var c=this;c instanceof String&&(c=String(c));var d=c.length;b=b||0;for(0>b&&(b=Math.max(b+d,0));b<d;b++){var f=c[b];if(f===a||Object.is(f,a))return!0}return!1}},"es7","es3");
$jscomp.checkStringArgs=function(a,d,b){if(null==a)throw new TypeError("The 'this' value for String.prototype."+b+" must not be null or undefined");if(d instanceof RegExp)throw new TypeError("First argument to String.prototype."+b+" must not be a regular expression");return a+""};$jscomp.polyfill("String.prototype.includes",function(a){return a?a:function(a,b){return-1!==$jscomp.checkStringArgs(this,a,"includes").indexOf(a,b||0)}},"es6","es3");
"undefined"!==typeof LP.stream&&"undefined"!==typeof LP.stream.engine&&"undefined"!==typeof LP.stream.engine.engines&&"undefined"===typeof LP.stream.engine.engines.basic&&(LP.stream.engine.engines.basic=function(){var a={},d=!1;return{init:function(a){LP.stream.debug("engine BASIC initializing for stream: ["+a+"]")},getNext:function(b,c){"undefined"===typeof c&&(c=!1);for(var e=a[b].pos;e<a[b].data.length;e++){var f=a[b].data[e];if(!1!==c&&c.includes(f.url))LP.stream.debug(e+" "+f.url+" : blacklisted");
else if(0==d&&LP.stream.history.isRead(f.url))LP.stream.debug(e+" "+f.url+" : isRead");else if(LP.stream.history.isViewed(f.url))LP.stream.debug(e+" "+f.url+" : isViewed");else return a[b].pos=e+1,f}d=!0;LP.stream.cfg.viewThreshold*=2;if(49<LP.stream.cfg.viewThreshold)return!1;a[b].pos=0;LP.stream.debug("RecyleMode: "+d+" INCREASE of viewThreshold: "+LP.stream.cfg.viewThreshold);return LP.stream.engine.engines.basic.getNext(b,c)},setStreamData:function(b,c){c&&(a[b]={data:c,pos:0})}}}());
"undefined"!==typeof LP.stream&&"undefined"!==typeof LP.stream.engine&&"undefined"!==typeof LP.stream.engine.engines&&"undefined"===typeof LP.stream.engine.engines.section&&(LP.stream.engine.engines.section=function(){var d=!0,c=0,e=function(a){if(d||""==a)return!0;var b=LP.stream.history.getSectionHistory();if("undefined"!==typeof b[a]){var c=parseInt((new Date).getTime()/1E3)-b[a].t;if(0<b[a].r||604800<c)return!0}console.log(a+" not allowed!");return!1};return{init:function(a){LP.stream.debug("engine SECTION initializing for stream: ["+
a+"]");LP.stream.engine.engines.basic.init(a);a=LP.stream.history.getSectionHistory();for(s in a)0<a[s].r&&(c+=a[s].r);c>=LP.stream.cfg.learningViews&&(d=!1);d?LP.stream.debug("SECTION: learning phase still active ["+c+"/"+LP.stream.cfg.learningViews+"]"):LP.stream.debug("SECTION: learning phase over... ["+c+"/"+LP.stream.cfg.learningViews+"]")},getNext:function(a){var b=LP.stream.engine.engines.basic.getNext(a);if(!b)return!1;for(;!1===e(b.section);)if(b=LP.stream.engine.engines.basic.getNext(a),
!b)return!1;return b},setStreamData:function(a,b){b&&LP.stream.engine.engines.basic.setStreamData(a,b)}}}());
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,c,e){a!=Array.prototype&&a!=Object.prototype&&(a[c]=e.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(a,c,e,g){if(c){e=$jscomp.global;a=a.split(".");for(g=0;g<a.length-1;g++){var l=a[g];l in e||(e[l]={});e=e[l]}a=a[a.length-1];g=e[a];c=c(g);c!=g&&null!=c&&$jscomp.defineProperty(e,a,{configurable:!0,writable:!0,value:c})}};$jscomp.polyfill("Object.is",function(a){return a?a:function(c,a){return c===a?0!==c||1/c===1/a:c!==c&&a!==a}},"es6","es3");
$jscomp.polyfill("Array.prototype.includes",function(a){return a?a:function(c,a){var e=this;e instanceof String&&(e=String(e));var l=e.length;a=a||0;for(0>a&&(a=Math.max(a+l,0));a<l;a++){var p=e[a];if(p===c||Object.is(p,c))return!0}return!1}},"es7","es3");
$jscomp.checkStringArgs=function(a,c,e){if(null==a)throw new TypeError("The 'this' value for String.prototype."+e+" must not be null or undefined");if(c instanceof RegExp)throw new TypeError("First argument to String.prototype."+e+" must not be a regular expression");return a+""};$jscomp.polyfill("String.prototype.includes",function(a){return a?a:function(a,e){return-1!==$jscomp.checkStringArgs(this,a,"includes").indexOf(a,e||0)}},"es6","es3");
$jscomp.arrayIteratorImpl=function(a){var c=0;return function(){return c<a.length?{done:!1,value:a[c++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};$jscomp.SYMBOL_PREFIX="jscomp_symbol_";$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.SymbolClass=function(a,c){this.$jscomp$symbol$id_=a;$jscomp.defineProperty(this,"description",{configurable:!0,writable:!0,value:c})};
$jscomp.SymbolClass.prototype.toString=function(){return this.$jscomp$symbol$id_};$jscomp.Symbol=function(){function a(e){if(this instanceof a)throw new TypeError("Symbol is not a constructor");return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX+(e||"")+"_"+c++,e)}var c=0;return a}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("Symbol.iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))}});$jscomp.initSymbolIterator=function(){}};
$jscomp.initSymbolAsyncIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.asyncIterator;a||(a=$jscomp.global.Symbol.asyncIterator=$jscomp.global.Symbol("Symbol.asyncIterator"));$jscomp.initSymbolAsyncIterator=function(){}};$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};
$jscomp.iteratorFromArray=function(a,c){$jscomp.initSymbolIterator();a instanceof String&&(a+="");var e=0,g={next:function(){if(e<a.length){var l=e++;return{value:c(l,a[l]),done:!1}}g.next=function(){return{done:!0,value:void 0}};return g.next()}};g[Symbol.iterator]=function(){return g};return g};$jscomp.polyfill("Array.prototype.keys",function(a){return a?a:function(){return $jscomp.iteratorFromArray(this,function(a){return a})}},"es6","es3");
"undefined"!=typeof LP.stream&&"undefined"===typeof LP.stream.render&&(LP.stream.render=function(){var a=!1,c=[],e=!1,g=function(){for(var d=document.querySelectorAll("[data-lp-stream]"),b=0;b<d.length;b++)for(var a=LP4.gElmCN(d[b],"_lp_com_"),c=d[b].getAttribute("data-lp-stream"),h=0;h<a.length;h++)if(LP.stream.comcontent.checkEmptySlot(c,a[h])){var f=a[h].className.match(/lp_(\d+)_.*_ad/i),e=a[h].id.replace("_ad","").replace("lps_","");if(null!=f){f=f[1];var g=LP.stream.engine.getNext(c);!1!==g&&
(e=l(e+"_"+(f-1),g,f),d[b].firstChild.replaceChild(p(e),a[h]))}else d[b].firstChild.removeChild(a[h])}},l=function(d,b,a){var c="//"+b.url;LP.stream.cfg.imageUrl&&(b.image=LP.stream.cfg.imageUrl(b.image));var u="";"undefined"!==typeof b.paywall&&b.paywall&&"undefined"!==typeof LP4.config.stream.render.plusTag&&(u=LP4.config.stream.render.plusTag);c=p("<div>"+LP4.config.stream.render.slot+"</div>",{IMG:b.image,TITLE:b.title,VIEWS:LP.stream.history.getUrlViews(b.url),URL:c,PLUSTAG:u});c.firstChild.id=
"lps_"+d;c.firstChild.setAttribute("data-lp-url",b.url);c.firstChild.setAttribute("data-lp-section",b.section);c.firstChild.classList.add("lp_"+(a+1));return c.innerHTML},p=function(d,b){if("undefined"!==typeof b)for(var a in b)d=d.replace(new RegExp("%"+a+"%","g"),b[a]);b=document.createElement("template");b.innerHTML=d.trim();return b.content.firstChild},q=function(d){"undefined"===typeof d&&"undefined"!==typeof LP4.config.stream.cssText&&""!==LP4.config.stream.cssText&&(d=LP4.config.stream.cssText);
if(""!==d){var b=document.createElement("style");b.type="text/css";b.innerHTML=d;document.getElementsByTagName("head")[0].appendChild(b)}},v=function(){Object.keys(c).forEach(function(d){for(var b=!1,a=0;a<c[d].data.length;a++)for(var m=c[d].data[a].elm.getElementsByClassName("lp-a"),e=0;e<m.length;e++){var f=m[e];f&&!f.hasAttribute("data-lp-w")&&f.hasAttribute("data-lp-url")&&x(f,LP.stream.cfg.minPercentAsView)&&(LP.stream.history.addUrlView(f.getAttribute("data-lp-url"),f.getAttribute("data-lp-section")),
b=!0)}b&&!1===c[d].viewed&&(LP.stream.debug("streamWidget viewed "+d),c[d].viewed=!0,LP.stream.cfg.logStats&&(m=c[d],LP.stream.cfg.logStats&&(b=m.data[0].elm.getAttribute("data-lp-stream-slot"),a=m.data[0].elm.getAttribute("data-lp-stream-engine"),m.data[0].elm.getAttribute("data-lp-stream-total"),m=LP.stream.getDomain(),e=LP.stream.getUrl().replace(/https?:\/+/i,""),LP4.api&&LP4.api.log("streams",{res:"m",set:{url:e,ste:a,win:b,stid:d,did:m},inc:{slv:1}}))))})},x=function(d,a){if("undefined"===typeof d)return!1;
"undefined"==typeof a&&(a=100);try{var b=d.getBoundingClientRect()}catch(n){console.error(n.toString()),console.debug(d)}var c=window.innerHeight||document.documentElement.clientHeight,e=window.innerWidth||document.documentElement.clientWidth;if(100>a){var f=0;0<b.top&&b.bottom<c?f=100:0>b.top&&0<b.bottom?f=(b.height+b.top)/b.height*100:b.top<c&&b.bottom>c&&(f=(c-b.top)/b.height*100);c=0;0>b.left&&0<b.right?c=(b.width+b.left)/b.width*100:b.right>e&&b.left<e?c=(b.width-(b.right-e))/b.width*100:0<=
b.left&&b.right<=e&&(c=100);return 0<c&&0<f&&(c+f)/2>a?(d.setAttribute("data-lp-w",!0),!0):!1}return 0<=b.top&&0<=b.left&&b.bottom<=c&&b.right<=(window.innerWidth||document.documentElement.clientWidth)?(d.setAttribute("data-lp-w",!0),!0):!1},A=function(){for(var d=document.querySelectorAll("[data-lp-stream]"),b=0;b<d.length;b++){var a=LP.stream.render.getStreamAtr(d[b],"stream-total",4),e=LP.stream.render.getStreamAtr(d[b],"stream","fb"),h=LP.stream.render.getStreamAtr(d[b],"stream-engine","basic"),
f=LP.stream.history.getSuggestedStream(e);f!=e&&(d[b].setAttribute("data-lp-stream",f),d[b].setAttribute("data-lp-stream-init",e));e=LP.stream.render.getStreamAtr(d[b],"stream-render","static");var g=LP.stream.render.getStreamAtr(d[b],"stream-render-lazyload",!1);LP.stream.debug("Lazyload: "+g);if("undefined"===typeof h||null==h)h="basic";LP.stream.engine.initEngine(h,f);"undefined"===typeof c[f]&&(c[f]={ready:!1,engine:e,lazyLoad:!1!==g,rendered:!1,viewed:!1,data:[]});c[f].data.push({name:LP.stream.render.getStreamAtr(d[b],
"stream-slot"),elm:d[b],total:parseInt(a)})}y();Object.keys(c).forEach(function(b){LP.stream.loader.load(b,function(d){c[d].ready=!0;c[b].lazyLoad?(LP.stream.debug("Will lazyload stream: "+b),z(d)):w(d)})});LP.stream.debug("Found "+(c.length+1)+" streams to load")},z=function(d){if("IntersectionObserver"in window)for(var b=new IntersectionObserver(function(d,a){d.forEach(function(d){if(d.isIntersecting){d=d.target;var a=LP.stream.render.getStreamAtr(d,"stream",!1);w(a);b.unobserve(d)}})},{rootMargin:"50px"}),
a=0;a<c[d].data.length;a++)b.observe(c[d].data[a].elm)},w=function(d){"undefined"!==typeof c[d]&&c[d].ready&&0==c[d].rendered&&(LP.stream.render.engine[c[d].engine].getCSS&&q(LP.stream.render.engine[c[d].engine].getCSS()),LP.stream.render.engine[c[d].engine].renderStream(d,c[d].data),c[d].rendered=!0,LP.stream.debug("Stream: "+d+" is done!"));var b=d=0,a;for(a in c)d++,c[a].ready&&c[a].rendered&&b++;b>=d&&(setTimeout(function(){v()},500),"function"===typeof LP4.config.stream.render.postRender&&LP4.config.stream.render.postRender(),
LP.stream.cfg.logRenderStats&&B())},y=function(){!1!==LP.stream.cfg.comContent&&Object.keys(c).forEach(function(d){for(var b=[],a=0;a<c[d].data.length;a++)b.push(c[d].data[a].elm.getAttribute("data-lp-stream-slot"));try{LP.stream.comcontent.initEngine(LP.stream.cfg.comContent.engine,d,b),e=!0}catch(m){console.error("could not init comengine: "+LP.stream.cfg.comContent.engine),console.error(m.toString()),e=!1}})},B=function(){for(var a in c)for(var b=0;b<c[a].data.length;b++){var e=c[a].data[b].elm.querySelectorAll("article.lp-a").length;
LP4.api&&LP4.api.log("rstreams",{res:"m",set:{url:LP.stream.getUrl(),ste:c[a].data[b].elm.getAttribute("data-lp-stream-engine"),win:c[a].data[b].name,stid:c[a].data[b].elm.getAttribute("data-lp-stream"),did:LP.stream.getDomain(),cid:LP4.getChannel()},inc:{ren:0<e?1:0,ads:0,art:e}})}};return{init:function(){a||(a=!0,LP.stream.debug("Render starting..."),q(),A(),LP4.registerCallback("cl",function(a){if(a&&a.clickElm&&a.clickElm.parentNode){a=a.clickElm;if(a.hasAttribute("data-lp-url"))var b=a;else{a=
a.parentNode;for(b=0;30>++b&&!1===a.hasAttribute("data-lp-url");)a=a.parentNode;b=a&&a.hasAttribute("data-lp-url")?a:null}null!==b&&(a=b.getAttribute("data-lp-url"),b=b.getAttribute("data-lp-section"),null!=a&&""!=a&&null!=b&&LP.stream.history.addUrlRead(a,b))}},"lp_streams"),LP4.aEvt(document,"scroll",function(a){v()},!0))},engine:[],renderStream:function(a,b){for(i=0;i<b.length;i++){var d=a+"_"+i;b[i].elm.classList.add("_lpStream");var c=b[i].elm.getAttribute("data-lp-stream-slot");b[i].elm.classList.add("lp_stream_"+
c);var h=d;d=b[i].elm;c=a;var f=b[i].total,n=!1;"undefined"!==typeof LP4.ab&&(n=LP4.ab.hasBlocker());var q=!1;e&&!n&&(q=LP.stream.comcontent.getSlotIndexes(f));n="";for(var r=0;r<f;r++){var k=!1;if(q&&q.includes(r)){var t=LP.stream.comcontent.getNext(c);t&&""!=t&&(k=p("<div>"+t+"</div>"),k.firstChild.id="lps_"+h+"_ad",k.firstChild.classList.add("lp_"+(r+1)+"_"+LP.stream.comcontent.getStreamEngine(c)+"_ad"),k.firstChild.classList.add("_lp_com_"),n+=k.innerHTML,k=!0)}!1===k&&(k=LP.stream.engine.getNext(c),
!1!==k&&k&&k.image&&""!=k.image&&k.title&&""!=k.title&&k.url&&""!=k.url&&(n+=l(h+"_"+r,k,r)))}h=p(LP4.config.stream.render.container,{BODY:n});d.innerHTML="";d.appendChild(h);e&&LP.stream.comcontent.postRender(c);setTimeout(g,1E4)}},renderStreamToArticleSlot:function(a,b){LP.stream.render.engine[c[a].engine].renderStreamToArticleSlot(a,b)},addCss:q,toHtml:function(a,b){if("undefined"!==typeof b)for(var c in b)a=a.replace(new RegExp("%"+c+"%","g"),b[c]);b=document.createElement("template");b.innerHTML=
a.trim();return b.content.firstChild},getStreamAtr:function(a,b,c){a=a.getAttribute("data-lp-"+b);return"undefined"===typeof a||null==a?c:a},adActive:function(){return e},getStyleValue:function(a,b){var c="";document.defaultView&&document.defaultView.getComputedStyle?c=document.defaultView.getComputedStyle(a,"").getPropertyValue(b):a.currentStyle&&(b=b.replace(/\-(\w)/g,function(a,b){return b.toUpperCase()}),c=a.currentStyle[b]);return c}}}());
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(b,g,d){b!=Array.prototype&&b!=Object.prototype&&(b[g]=d.value)};$jscomp.getGlobal=function(b){return"undefined"!=typeof window&&window===b?b:"undefined"!=typeof global&&null!=global?global:b};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(b,g,d,l){if(g){d=$jscomp.global;b=b.split(".");for(l=0;l<b.length-1;l++){var r=b[l];r in d||(d[r]={});d=d[r]}b=b[b.length-1];l=d[b];g=g(l);g!=l&&null!=g&&$jscomp.defineProperty(d,b,{configurable:!0,writable:!0,value:g})}};$jscomp.polyfill("Object.is",function(b){return b?b:function(b,d){return b===d?0!==b||1/b===1/d:b!==b&&d!==d}},"es6","es3");
$jscomp.polyfill("Array.prototype.includes",function(b){return b?b:function(b,d){var g=this;g instanceof String&&(g=String(g));var r=g.length;d=d||0;for(0>d&&(d=Math.max(d+r,0));d<r;d++){var u=g[d];if(u===b||Object.is(u,b))return!0}return!1}},"es7","es3");
$jscomp.checkStringArgs=function(b,g,d){if(null==b)throw new TypeError("The 'this' value for String.prototype."+d+" must not be null or undefined");if(g instanceof RegExp)throw new TypeError("First argument to String.prototype."+d+" must not be a regular expression");return b+""};$jscomp.polyfill("String.prototype.includes",function(b){return b?b:function(b,d){return-1!==$jscomp.checkStringArgs(this,b,"includes").indexOf(b,d||0)}},"es6","es3");
"undefined"!=typeof LP.stream&&"undefined"!==typeof LP.stream.render&&"undefined"!==typeof LP.stream.render.engine&&"undefined"===typeof LP.stream.render.engine.dynamic&&(LP.stream.render.engine.dynamic=function(){var b={desktop:{validSlots:"F;HH;TTT;SSSS;HSS;SSH;Q S;S Q;HSS;SSH;Q S;S Q;T K;K T".split(";"),slotCfg:{F:{fsize:{min:30,max:65},lines:2},H:{fsize:{min:20,max:45},lines:2},K:{fsize:{min:20,max:65},lines:2},S:{fsize:{min:18,max:45},lines:3},Q:{fsize:{min:20,max:65},lines:2},T:{fsize:{min:18,
max:45},lines:3},L:{fsize:{min:20,max:45},lines:3},R:{fsize:{min:20,max:45},lines:3}}},tablet:{validSlots:"F;HH;TTT;SSSS;HSS;SSH;Q S;S Q;HSS;SSH;Q S;S Q;T K;K T".split(";"),slotCfg:{F:{fsize:{min:20,max:50},lines:2},H:{fsize:{min:20,max:45},lines:2},K:{fsize:{min:20,max:50},lines:2},S:{fsize:{min:16,max:45},lines:4},Q:{fsize:{min:20,max:50},lines:2},T:{fsize:{min:14,max:45},lines:3},L:{fsize:{min:16,max:45},lines:3},R:{fsize:{min:16,max:45},lines:3}}},mobile:{validSlots:"F HH L R F HH".split(" "),
slotCfg:{F:{fsize:{min:18,max:35},lines:2},H:{fsize:{min:15,max:45},lines:2},K:{fsize:{min:16,max:50},lines:2},S:{fsize:{min:15,max:45},lines:4},Q:{fsize:{min:16,max:50},lines:2},T:{fsize:{min:14,max:45},lines:3},L:{fsize:{min:15,max:40},lines:4},R:{fsize:{min:15,max:40},lines:4}}}},g=function(b,a,c,e){var f=!1;"undefined"!==typeof LP4.ab&&(f=LP4.ab.hasBlocker());var t="",h="object"===typeof e?e:r(e),g=0,m=0,k=!1;LP.stream.render.adActive()&&!f&&(k=LP.stream.comcontent.getSlotIndexes(c,b,u(e),h));
e=[];for(f=0;f<h.length;f++){t+='<div class="lp-r lp_r'+(f+1)+'">';for(var n=0,v=0;v<h[f].length;v++){n++;var q=!1;if(k&&k.includes(m)){var w=LP.stream.comcontent.getNext(c,b);e.includes(h[f])&&(h[f]="F");w&&""!=w&&(q=LP.stream.render.toHtml("<div>"+w+"</div>"),q.firstChild.classList.add("lp_p"+n+"_"+LP.stream.comcontent.getStreamEngine(c)+"_ad"),q.firstChild.classList.add("_lp_com_"),t+='<article id="lpc_'+b+"_"+g+'" class="lp-'+h[f][v].toLowerCase()+" lp-a lp-a-"+h[f].toLowerCase()+'">'+q.innerHTML+
"</article>",q=!0)}if(!1===q)if(q=LP.stream.engine.getNext(c),!1!==q)t+=d(h[f],h[f][v],b+"_"+g,q,"lp_p"+n);else break;m++;g++}t+="</div>"}a.innerHTML=t;l(a);LP.stream.render.adActive()&&LP.stream.comcontent.postRender(c)},d=function(b,a,c,e,f){LP.stream.cfg.dataFilter&&(e=LP.stream.cfg.dataFilter(e,a));LP.stream.cfg.imageUrl&&(e.image=LP.stream.cfg.imageUrl(e.image));e.title&&LP.stream.cfg.titleFilter&&(e.title=LP.stream.cfg.titleFilter(e.title));var h=e.url;null===e.url.match(/^\//)&&(h="//"+h);
var d=!1;"function"===typeof LP4.config.stream.render.slot?d=LP4.config.stream.render.slot(e,a):"string"===typeof LP4.config.stream.render.slot&&(d=LP4.config.stream.render.slot);!1===d&&(d='<article class="lp-a"><a href="%URL%"><div class="lp-a-img"><img src="%IMG%">%SLOTLABEL%</div><div class="lp-a-t"><span>%TITLE%</span></div></a></article>');slotElm=LP.stream.render.toHtml("<div>"+d+"</div>",{IMG:e.image,TITLE:e.title,DESC:e.desc,VIEWS:LP.stream.history.getUrlViews(e.url),URL:h,SLOTLABEL:"undefined"!=
typeof e.slotLabel?e.slotLabel:""});slotElm.firstChild.id="lps_"+c;slotElm.firstChild.setAttribute("data-lp-url",e.url);slotElm.firstChild.setAttribute("data-lp-section",e.section);slotElm.firstChild.setAttribute("data-lp-st",a.toUpperCase());slotElm.firstChild.classList.add("lp-"+a.toLowerCase());slotElm.firstChild.classList.add(f);slotElm.firstChild.classList.add("lp-a-"+b.toLowerCase());return slotElm.innerHTML},l=function(h){for(var a=LP4.gElmCN(h,"lp-a-t"),c=0;c<a.length;c++){var e=a[c].parentNode.getElementsByClassName("lp-a-img")[0],
f=a[c].parentNode.parentNode.getAttribute("data-lp-st"),d=x(),g=parseInt(LP.stream.render.getStyleValue(a[c],"padding-top"))+parseInt(LP.stream.render.getStyleValue(a[c],"padding-bottom")),p={fsize:{min:14,max:45},lines:4};"undefined"!==typeof b[d].slotCfg[f]&&(p=b[d].slotCfg[f]);"undefined"!==typeof LP4.config.stream.render.maxFontSize&&LP4.config.stream.render.maxFontSize<p.fsize.max&&(p.fsize.max=LP4.config.stream.render.maxFontSize);"undefined"!==typeof LP4.config.stream.render.minFontSize&&LP4.config.stream.render.minFontSize<
p.fsize.min&&LP4.config.stream.render.minFontSize<p.fsize.max&&(p.fsize.min=LP4.config.stream.render.minFontSize);var m=!1;"undefined"!==typeof LP4.config.stream.render.lineHeight&&(m=LP4.config.stream.render.lineHeight);var k=p.fsize.max;a[c].style.fontSize=k+"px";a[c].style.lineHeight=m?m:k+"px";for(var n=0;50>++n&&(a[c].scrollHeight>a[c].clientHeight||a[c].scrollWidth>a[c].clientWidth||a[c].firstChild.offsetHeight>a[c].clientHeight-g)&&!(k-1<p.fsize.min);)k--,a[c].style.fontSize=k+"px",a[c].style.lineHeight=
m?m:k+"px";a[c].style.fontSize=k+"px";a[c].style.lineHeight=m?m:k+"px";a[c].setAttribute("data-fontSize",k);a[c].setAttribute("data-childHeight",parseInt(a[c].firstElementChild.offsetHeight)+g);var l=n="L"!=f&&"R"!=f?!0:!1;"undefined"!==typeof LP4.config.stream.render.adjustGap&&0==LP4.config.stream.render.adjustGap&&(n=!1);"undefined"!==typeof LP4.config.stream.render.adjustLines&&(l=LP4.config.stream.render.adjustLines);if(n){var q=100-parseInt(a[c].firstChild.offsetWidth)/parseInt(a[c].offsetWidth)*
100;for(n=0;10<q&&15>n++;){k++;if(k<p.fsize.min||k>p.fsize.max)break;a[c].style.fontSize=k+"px";a[c].style.lineHeight=m?m:k+"px";q=100-parseInt(a[c].firstChild.offsetWidth)/parseInt(a[c].offsetWidth)*100}}if(l&&(l=parseInt(a[c].firstChild.offsetHeight/parseInt(a[c].style.lineHeight)),n=0,"undefined"!==typeof b[d].slotCfg[f]))for(;l>p.lines&&k>p.fsize.min&&30>n++;)k--,a[c].style.fontSize=k+"px",a[c].style.lineHeight=m?m:k+"px",l=parseInt(a[c].firstChild.offsetHeight/parseInt(a[c].style.lineHeight));
n=0;f=10;"undefined"!==typeof LP4.config.stream.render.minTitleHeight&&LP4.config.stream.render.minTitleHeight>f&&(f=LP4.config.stream.render.minTitleHeight);for(d=40;a[c].firstElementChild.offsetHeight+g<a[c].offsetHeight;){--d;if(d<f)break;a[c].style.height=d+"%";e.style.height=100-d+"%";if(40<++n)break}}LP4.config.stream.render.disablePostbugRender||setTimeout(function(){var a=LP4.gElmCN(h,"lp-a-t"),c=!1;"undefined"!==typeof LP4.config.stream.render.lineHeight&&(c=LP4.config.stream.render.lineHeight);
for(var b=0;b<a.length;b++)if(a[b].hasAttribute("data-fontSize")){var e=parseInt(a[b].getAttribute("data-fontSize")),d=parseInt(a[b].style.fontSize),f=parseInt(a[b].style.height),g=a[b].closest(".lp-a").querySelector(".lp-a-img"),k=parseInt(g.style.height);if(parseInt(a[b].getAttribute("data-childHeight"))>a[b].offsetHeight||a[b].firstChild.offsetHeight>a[b].offsetHeight){d=parseInt(LP.stream.render.getStyleValue(a[b],"padding-top"))+parseInt(LP.stream.render.getStyleValue(a[b],"padding-bottom"));
for(var t=0;20>++t&&(a[b].firstChild.offsetHeight+d>a[b].clientHeight||a[b].firstChild.offsetWidth>a[b].clientWidth);)e--,f+=3,k-=3,a[b].style.height=f+"%",g.style.height=k+"%",a[b].style.fontSize=e+"px",a[b].style.lineHeight=c?c:e+"px"}else d>e&&(a[b].style.fontSize=e+"px",a[b].style.lineHeight=c?c:e+"px",a[b].style.lineHeight=e+"px")}},500)},r=function(d,a,c){parseInt(window.innerWidth);var e=x();e=b[e].validSlots;if("undefined"!==typeof c&&null!==c&&0<c.length){for(var f=[],h=0;h<c.length;h++)e.includes(c[h])&&
f.push(c[h]);0<f.length&&(e=f)}h=0;c=[];if(null!==d&&0<d)for(a=0;a<d&&1E3>++h;){var g=Math.floor(Math.random()*e.length);f=e[g].replace(" ","");a+e[g].length>d||(a+=e[g].length,c.push(f))}else if(null!=a&&0<a&&++h)for(h=d=0;d<a&&100>++h;)if(f=e[Math.floor(Math.random()*e.length)].replace(" ",""),1>c.length||2>e.length||1<e.length&&c[d-1]!=f)c.push(f),d++;return c},u=function(b){return"object"===typeof b?b.join("").length:b},x=function(){var b=parseInt(window.innerWidth),a="desktop";if(500>=b||"mobile"==
LP4.getChannel())a="mobile";else if(768>=b||"tablet"==LP4.getChannel())a="tablet";return a};return{renderStream:function(b,a){for(i=0;i<a.length;i++){var c=LP.stream.render.getStreamAtr(a[i].elm,"stream-render-validformats",null);null!==c&&(c=c.split("|"));a[i].elm.classList.add("_lpStream");var d=a[i].elm.getAttribute("data-lp-stream-slot");a[i].elm.classList.add("lp_stream_"+d);if(!1!==LP.stream.render.getStreamAtr(a[i].elm,"stream-render-layout",!1))if(slotLayout=a[i].elm.getAttribute("data-lp-stream-render-layout").split("|"),
0<slotLayout.length)g(d,a[i].elm,b,slotLayout);else{console.error("LP stream: data-lp-stream-render-layout defintion is empty or invalid");break}else if(!1!==LP.stream.render.getStreamAtr(a[i].elm,"stream-render-rows",!1)){var f=LP.stream.render.getStreamAtr(a[i].elm,"stream-render-rows");c=r(null,f,c);g(d,a[i].elm,b,c)}else g(d,a[i].elm,b,a[i].total)}},renderStreamToArticleSlot:function(b,a){var c=a.parentNode.className.match(/lp-a-(\w+)/i),e=a.parentNode.className.match(/lp-(\w+)/i),f=a.className.match(/lp_p(\d+)[^\s]*/i),
g=a.parentNode.id.replace("lpc_","");null!=c&&null!=e&&(c=c[1],e=e[1],f=f[1],b=LP.stream.engine.getNext(b),!1!==b&&(f=d(c,e,g,b,"lp_p"+f),f=LP.stream.render.toHtml(f),a.parentNode.parentNode.replaceChild(f,a.parentNode),l(f)))},getCSS:function(){return'.lp-h-f,.lp-q-f{height:calc(var(--slot-height) * 2)}:root{--slot-wide-height:150px;--slot-height:300px;--slot-big-height:400px}.lp-r{margin:0;padding:0}.lp-r::after{content:"";clear:both;display:table}.lp-f,.lp-h,.lp-h-f,.lp-k,.lp-q,.lp-q-f,.lp-s,.lp-t{float:left}.lp-f{width:100%}.lp-q{width:75%}.lp-k{width:66.6666%}.lp-h{width:50%}.lp-t{width:33.3333%}.lp-s{width:25%}.lp-h-f{width:50%}.lp-q-f{width:75%}.lp-a-f,.lp-a-kt,.lp-a-qs,.lp-a-sq,.lp-a-tk,.lp-r>.lp-f>.lp-a{height:var(--slot-big-height)!important}.lp-r .lp-a{box-sizing:border-box;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;height:var(--slot-height);padding:4px}.lp-r .lp-a a{text-decoration:none;color:#000;height:100%;width:100%;}.lp-r .lp-a>a>.lp-a-t{text-align:left;font-size:24px;font-weight:700;overflow:hidden;height:40%;padding-top:5px}.lp-r .lp-a .lp-a-img{height:60%;position:relative}.lp-r .lp-a .lp-a-img>img{width:100%;height:100%;object-fit:cover;vertical-align:middle;z-index:2}.lp-r>.lp-a .lp-a-img>.lp-a-slotLabel{position:absolute;top:10px;right:10px;background-color:#FFF;z-index:3;font-size:14px;font-weight:700;text-transform:uppercase;padding:5px}.lp-a-l,.lp-a-r{height:var(--slot-wide-height)!important;width:100%}.lp-a-l .lp-a-img,.lp-a-r .lp-a-img{width:35%!important;height:100%!important}.lp-a-l .lp-a-t,.lp-a-r .lp-a-t{height:100%!important}.lp-a-l .lp-a-img{float:left;margin-right:6px}.lp-a-r .lp-a-img{float:right;margin-left:6px;margin-right:8px}.lp-r .lp-a-r .lp-a-img>.lp-a-slotLabel{left:unset!important;right:5px!important}@media only screen and (max-width:501px){:root{--slot-wide-height:100px;--slot-height:200px;--slot-big-height:300px}.lp-h,.lp-q,.lp-q-f,.lp-s{width:50%}.lp-a-l,.lp-a-r{height:var(--slot-wide-height)!important;width:100%}}@media only screen and (min-width:501px) and (max-width:769px){:root{--slot-height:250px;--slot-big-height:350px}}'}}}());
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.arrayIteratorImpl=function(a){var d=0;return function(){return d<a.length?{done:!1,value:a[d++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,d,e){a!=Array.prototype&&a!=Object.prototype&&(a[d]=e.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};
$jscomp.SymbolClass=function(a,d){this.$jscomp$symbol$id_=a;$jscomp.defineProperty(this,"description",{configurable:!0,writable:!0,value:d})};$jscomp.SymbolClass.prototype.toString=function(){return this.$jscomp$symbol$id_};$jscomp.Symbol=function(){function a(e){if(this instanceof a)throw new TypeError("Symbol is not a constructor");return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX+(e||"")+"_"+d++,e)}var d=0;return a}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("Symbol.iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))}});$jscomp.initSymbolIterator=function(){}};
$jscomp.initSymbolAsyncIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.asyncIterator;a||(a=$jscomp.global.Symbol.asyncIterator=$jscomp.global.Symbol("Symbol.asyncIterator"));$jscomp.initSymbolAsyncIterator=function(){}};$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};
$jscomp.iteratorFromArray=function(a,d){$jscomp.initSymbolIterator();a instanceof String&&(a+="");var e=0,f={next:function(){if(e<a.length){var b=e++;return{value:d(b,a[b]),done:!1}}f.next=function(){return{done:!0,value:void 0}};return f.next()}};f[Symbol.iterator]=function(){return f};return f};
$jscomp.polyfill=function(a,d,e,f){if(d){e=$jscomp.global;a=a.split(".");for(f=0;f<a.length-1;f++){var b=a[f];b in e||(e[b]={});e=e[b]}a=a[a.length-1];f=e[a];d=d(f);d!=f&&null!=d&&$jscomp.defineProperty(e,a,{configurable:!0,writable:!0,value:d})}};$jscomp.polyfill("Array.prototype.keys",function(a){return a?a:function(){return $jscomp.iteratorFromArray(this,function(a){return a})}},"es6","es3");
if("undefined"!==typeof LP.stream&&"undefined"===typeof LP.stream.storage){LP.stream.storage=function(){return{canStore:function(){return"undefined"!==typeof localStorage},set:function(a,d){"undefined"!==typeof localStorage&&""!==a&&(a=LP.stream.cfg.storageNamePrefix+"_"+a,(new Date).getTime(),d=JSON.stringify(d),(new Date).getTime(),d=LZString.compressToUTF16(d),(new Date).getTime(),0<d.length&&localStorage.setItem(a,d),(new Date).getTime())},get:function(a){if("undefined"!==typeof localStorage&&
""!==a){a=LP.stream.cfg.storageNamePrefix+"_"+a;var d=(new Date).getTime(),e=localStorage.getItem(a);if(null==e)return!1;(new Date).getTime();var f=LZString.decompressFromUTF16(e);(new Date).getTime();f=JSON.parse(f);var b=(new Date).getTime();LP.stream.debug("LP.stream.storage.get used for key ["+a+"] "+(b-d)+" ms [size: "+(2*e.length/1024/1024).toFixed(4)+"mb]");return f}},getDiagnostic:function(){var a={alsm:0,alsa:0,lpcm:0,lpca:0,lphm:0,lpha:0,lpssm:0,lpssa:0,lpsc:0};"undefined"!==typeof localStorage&&
Object.keys(localStorage).forEach(function(d){var b=parseFloat((2*localStorage.getItem(d).length/1024/1024).toFixed(4));"_LPS__cfg"===d?(a.lpcm=b,a.lpca=b):"_LPS__uh"==d?(a.lphm=b,a.lpha=b):-1<d.indexOf("_LPS__")&&(a.lpssm+=b,a.lpssa+=b,a.lpsc++);a.alsm+=b;a.alsa+=b});for(var d=["lpssm","lpssa","alsm","alsa"],e=0;e<d.length;e++)a[d[e]]=parseFloat(a[d[e]].toFixed(4));return a}}}();var LZString=function(){function a(b,a){if(!e[b]){e[b]={};for(var p=0;p<b.length;p++)e[b][b.charAt(p)]=p}return e[b][a]}
var d=String.fromCharCode,e={},f={compressToBase64:function(a){if(null==a)return"";a=f._compress(a,6,function(a){return"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a)});switch(a.length%4){default:case 0:return a;case 1:return a+"===";case 2:return a+"==";case 3:return a+"="}},decompressFromBase64:function(b){return null==b?"":""==b?null:f._decompress(b.length,32,function(p){return a("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",b.charAt(p))})},compressToUTF16:function(a){return null==
a?"":f._compress(a,15,function(a){return d(a+32)})+" "},decompressFromUTF16:function(a){return null==a?"":""==a?null:f._decompress(a.length,16384,function(b){return a.charCodeAt(b)-32})},compressToUint8Array:function(a){a=f.compress(a);for(var b=new Uint8Array(2*a.length),d=0,w=a.length;d<w;d++){var e=a.charCodeAt(d);b[2*d]=e>>>8;b[2*d+1]=e%256}return b},decompressFromUint8Array:function(a){if(null===a||void 0===a)return f.decompress(a);for(var b=Array(a.length/2),e=0,w=b.length;e<w;e++)b[e]=256*
a[2*e]+a[2*e+1];var x=[];b.forEach(function(a){x.push(d(a))});return f.decompress(x.join(""))},compressToEncodedURIComponent:function(a){return null==a?"":f._compress(a,6,function(a){return"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$".charAt(a)})},decompressFromEncodedURIComponent:function(b){if(null==b)return"";if(""==b)return null;b=b.replace(/ /g,"+");return f._decompress(b.length,32,function(d){return a("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",
b.charAt(d))})},compress:function(a){return f._compress(a,16,function(a){return d(a)})},_compress:function(a,d,e){if(null==a)return"";var b,f={},p={},m="",r=2,u=3,k=2,l=[],c=0,g=0,n;for(n=0;n<a.length;n+=1){var q=a.charAt(n);Object.prototype.hasOwnProperty.call(f,q)||(f[q]=u++,p[q]=!0);var t=m+q;if(Object.prototype.hasOwnProperty.call(f,t))m=t;else{if(Object.prototype.hasOwnProperty.call(p,m)){if(256>m.charCodeAt(0)){for(b=0;b<k;b++)c<<=1,g==d-1?(g=0,l.push(e(c)),c=0):g++;var h=m.charCodeAt(0);for(b=
0;8>b;b++)c=c<<1|h&1,g==d-1?(g=0,l.push(e(c)),c=0):g++,h>>=1}else{h=1;for(b=0;b<k;b++)c=c<<1|h,g==d-1?(g=0,l.push(e(c)),c=0):g++,h=0;h=m.charCodeAt(0);for(b=0;16>b;b++)c=c<<1|h&1,g==d-1?(g=0,l.push(e(c)),c=0):g++,h>>=1}r--;0==r&&(r=Math.pow(2,k),k++);delete p[m]}else for(h=f[m],b=0;b<k;b++)c=c<<1|h&1,g==d-1?(g=0,l.push(e(c)),c=0):g++,h>>=1;r--;0==r&&(r=Math.pow(2,k),k++);f[t]=u++;m=String(q)}}if(""!==m){if(Object.prototype.hasOwnProperty.call(p,m)){if(256>m.charCodeAt(0)){for(b=0;b<k;b++)c<<=1,g==
d-1?(g=0,l.push(e(c)),c=0):g++;h=m.charCodeAt(0);for(b=0;8>b;b++)c=c<<1|h&1,g==d-1?(g=0,l.push(e(c)),c=0):g++,h>>=1}else{h=1;for(b=0;b<k;b++)c=c<<1|h,g==d-1?(g=0,l.push(e(c)),c=0):g++,h=0;h=m.charCodeAt(0);for(b=0;16>b;b++)c=c<<1|h&1,g==d-1?(g=0,l.push(e(c)),c=0):g++,h>>=1}r--;0==r&&(r=Math.pow(2,k),k++);delete p[m]}else for(h=f[m],b=0;b<k;b++)c=c<<1|h&1,g==d-1?(g=0,l.push(e(c)),c=0):g++,h>>=1;r--;0==r&&k++}h=2;for(b=0;b<k;b++)c=c<<1|h&1,g==d-1?(g=0,l.push(e(c)),c=0):g++,h>>=1;for(;;)if(c<<=1,g==
d-1){l.push(e(c));break}else g++;return l.join("")},decompress:function(a){return null==a?"":""==a?null:f._decompress(a.length,32768,function(b){return a.charCodeAt(b)})},_decompress:function(a,e,f){var b=[],p=4,v=4,m=3,r=[],u,k,l=f(0),c=e,g=1;for(u=0;3>u;u+=1)b[u]=u;var n=0;var q=Math.pow(2,2);for(k=1;k!=q;){var t=l&c;c>>=1;0==c&&(c=e,l=f(g++));n|=(0<t?1:0)*k;k<<=1}switch(n){case 0:n=0;q=Math.pow(2,8);for(k=1;k!=q;)t=l&c,c>>=1,0==c&&(c=e,l=f(g++)),n|=(0<t?1:0)*k,k<<=1;var h=d(n);break;case 1:n=0;
q=Math.pow(2,16);for(k=1;k!=q;)t=l&c,c>>=1,0==c&&(c=e,l=f(g++)),n|=(0<t?1:0)*k,k<<=1;h=d(n);break;case 2:return""}u=b[3]=h;for(r.push(h);;){if(g>a)return"";n=0;q=Math.pow(2,m);for(k=1;k!=q;)t=l&c,c>>=1,0==c&&(c=e,l=f(g++)),n|=(0<t?1:0)*k,k<<=1;switch(h=n){case 0:n=0;q=Math.pow(2,8);for(k=1;k!=q;)t=l&c,c>>=1,0==c&&(c=e,l=f(g++)),n|=(0<t?1:0)*k,k<<=1;b[v++]=d(n);h=v-1;p--;break;case 1:n=0;q=Math.pow(2,16);for(k=1;k!=q;)t=l&c,c>>=1,0==c&&(c=e,l=f(g++)),n|=(0<t?1:0)*k,k<<=1;b[v++]=d(n);h=v-1;p--;break;
case 2:return r.join("")}0==p&&(p=Math.pow(2,m),m++);if(b[h])h=b[h];else if(h===v)h=u+u.charAt(0);else return null;r.push(h);b[v++]=u+h.charAt(0);p--;u=h;0==p&&(p=Math.pow(2,m),m++)}}};return f}()};
"undefined"!==typeof LP.stream&&"undefined"===typeof LP.stream.loader&&(LP.stream.loader=function(){var e={},k={},f={},m=function(a,c){if("undefined"===typeof e[a]||1!=e[a]){LP.stream.debug("Checking for stream: "+a);if("undefined"===typeof LP.stream.cfg.streams[a])return!1;e[a]=!0;var b=LP.stream.cfg.streams[a];f[b]=a;if(g(b)){if(LP.stream.debug("stream in cache and not ttl'ed"),"function"===typeof c)try{c(a)}catch(h){console.error("Could not call callback function: "+h.toString()),console.error(h.stack)}}else{LP.stream.debug("Loading stream from server: "+
a+" ["+b+"]");var d=LP.stream.cfg.streamUrl+"/"+LP4.id+"/get/"+b+"?cb=LP.stream.loader.ssd";LP.stream.debug(d);b=document.createElement("script");b.async=!0;b.id="lp.stream.loader_"+a;b.setAttribute("src",d);b.setAttribute("data-stream",a);d=function(b){if("function"===typeof c)try{c(a)}catch(l){console.error("Could not call callback function: "+l.toString())}setTimeout(function(){var b=document.getElementById("lp.stream.loader_"+a);b&&b.parentNode.removeChild(b)},1E3)};b.onload=d;b.onerror=d;document.getElementsByTagName("head")[0].appendChild(b)}}},
g=function(a,c){if(LP.stream.storage.canStore()){"undefined"===typeof c&&(c=!1);var b=LP.stream.storage.get(a);if(0!=b&&"object"===typeof b.d&&0<b.d.length){if(c||b.t>(new Date).getTime())return LP.stream.engine.setStream(f[a],b.d),!0;LP.stream.debug(" cached stream ["+a+"] has expired")}else LP.stream.debug(" no stream data in cache for:"+a)}return!1};return{load:function(a,c){"undefined"!==typeof k[a]?LP.stream.debug("stream already loaded: "+a):(LP.stream.debug("Loading stream: "+a),m(a,c))},ssd:function(a){if(a&&
a.success&&a.stream)if("undefined"===typeof a.delayed||!1===a.delayed){LP.stream.engine.setStream(f[a.streamId],a.stream);var c=a.streamId;a=a.stream;LP.stream.storage.canStore()&&(a={t:(new Date).getTime()+1E3*LP.stream.cfg.streamCacheTTL,d:a},LP.stream.storage.set(c,a))}else LP.stream.debug("Reusing cached data, reason: delayed...."),g(a.streamId,!0)}}}());
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.arrayIteratorImpl=function(a){var f=0;return function(){return f<a.length?{done:!1,value:a[f++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,f,c){a!=Array.prototype&&a!=Object.prototype&&(a[f]=c.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};
$jscomp.SymbolClass=function(a,f){this.$jscomp$symbol$id_=a;$jscomp.defineProperty(this,"description",{configurable:!0,writable:!0,value:f})};$jscomp.SymbolClass.prototype.toString=function(){return this.$jscomp$symbol$id_};$jscomp.Symbol=function(){function a(c){if(this instanceof a)throw new TypeError("Symbol is not a constructor");return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX+(c||"")+"_"+f++,c)}var f=0;return a}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("Symbol.iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))}});$jscomp.initSymbolIterator=function(){}};
$jscomp.initSymbolAsyncIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.asyncIterator;a||(a=$jscomp.global.Symbol.asyncIterator=$jscomp.global.Symbol("Symbol.asyncIterator"));$jscomp.initSymbolAsyncIterator=function(){}};$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};
$jscomp.iteratorFromArray=function(a,f){$jscomp.initSymbolIterator();a instanceof String&&(a+="");var c=0,e={next:function(){if(c<a.length){var g=c++;return{value:f(g,a[g]),done:!1}}e.next=function(){return{done:!0,value:void 0}};return e.next()}};e[Symbol.iterator]=function(){return e};return e};
$jscomp.polyfill=function(a,f,c,e){if(f){c=$jscomp.global;a=a.split(".");for(e=0;e<a.length-1;e++){var g=a[e];g in c||(c[g]={});c=c[g]}a=a[a.length-1];e=c[a];f=f(e);f!=e&&null!=f&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:f})}};$jscomp.polyfill("Array.prototype.keys",function(a){return a?a:function(){return $jscomp.iteratorFromArray(this,function(a){return a})}},"es6","es3");
$jscomp.polyfill("Object.is",function(a){return a?a:function(a,c){return a===c?0!==a||1/a===1/c:a!==a&&c!==c}},"es6","es3");$jscomp.polyfill("Array.prototype.includes",function(a){return a?a:function(a,c){var f=this;f instanceof String&&(f=String(f));var g=f.length;c=c||0;for(0>c&&(c=Math.max(c+g,0));c<g;c++){var b=f[c];if(b===a||Object.is(b,a))return!0}return!1}},"es7","es3");
$jscomp.checkStringArgs=function(a,f,c){if(null==a)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(f instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""};$jscomp.polyfill("String.prototype.includes",function(a){return a?a:function(a,c){return-1!==$jscomp.checkStringArgs(this,a,"includes").indexOf(a,c||0)}},"es6","es3");
"undefined"!=typeof LP.stream&&"undefined"===typeof LP.stream.comcontent&&(LP.stream.comcontent=function(){var a={},f=function(b,d){if("undefined"===typeof d||null===d)d=[].slice.call(LP4.gElmCN(document.body,"_lp_com_"));for(var c=0;c<d.length;c++)(new MutationObserver(function(d,c){if(0<d.length){if(!d[0].target.hasAttribute("_lp_checked")&&LP.stream.comcontent.engines[a[b].engine].checkEmptySlot(d[0].target)){d[0].target.setAttribute("_lp_checked",1);var h=LP.stream.getStreamSlot(d[0].target);
a[b].containerAdSlotCnt[h.streamSlotId].adErr++;LP.stream.render.renderStreamToArticleSlot(b,d[0].target)}c.disconnect()}})).observe(d[c],{attributes:!1,childList:!0,subtree:!0})},c=function(b){if("undefined"===typeof b||null===b)b=document.querySelectorAll("[data-lp-stream]");for(var d=0;d<b.length;d++){for(var c=b[d].getAttribute("data-lp-stream"),h=b[d].getAttribute("data-lp-stream-slot"),f=[].slice.call(LP4.gElmCN(b[d],"_lp_com_")),e=0;e<f.length;e++)LP.stream.comcontent.checkEmptySlot(c,f[e])&&
(LP.stream.render.renderStreamToArticleSlot(c,f[e]),a[c].containerAdSlotCnt[h].adErr++);"undefined"!==typeof LP4.config.stream.comContent.stats&&LP4.config.stream.comContent.stats&&LP4.api.log("adstream",{res:"m",set:{did:LP4.getDomain(),win:b[d].getAttribute("data-lp-stream-slot"),cid:LP4.getChannel()},inc:{rad:a[c].containerAdSlotCnt[h].adCnt-a[c].containerAdSlotCnt[h].adErr,iad:a[c].containerAdSlotCnt[h].adCnt,abd:"undefined"!==typeof LP4.ad&&LP4.ad.hasBlocker()?1:0,cnt:1}})}},e=function(b){var d=
{root:null,rootMargin:"10px 0px",threshold:.01};if("IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype){var e=new IntersectionObserver(function(d,e){d.forEach(function(d){if(d.isIntersecting)return"function"===typeof LP.stream.cfg.comContent.setup&&LP.stream.cfg.comContent.setup(),"function"===typeof LP.stream.comcontent.engines[a[b].engine].preLazyLoad&&LP.stream.comcontent.engines[a[b].engine].preLazyLoad(d.target),
e.unobserve(d.target),f(b,[d.target]),setTimeout(function(){c()},"undefined"!==typeof LP4.config.stream.comContent.timeout?1E3*LP4.config.stream.comContent.timeout:5E3),LP.stream.comcontent.engines[a[b].engine].postRenderSlot?LP.stream.comcontent.engines[a[b].engine].postRenderSlot(d.target,b):LP.stream.comcontent.engines[a[b].engine].postRender(b)})},d);[].slice.call(LP4.gElmCN(document,"_lp_com_")).forEach(function(a){e.observe(a)})}else g(b)},g=function(b){var d=function(a){a=a.getBoundingClientRect();
return 0<=a.top&&0<=a.left&&a.top<=(window.innerHeight||document.documentElement.clientHeight)},e=function(){for(var h=[].slice.call(LP4.gElmCN(document.body,"_lp_com_")),e=0;e<h.length;e++)if(!h[e].hasAttribute("_lp_schecked")&&d(h[e]))return h[e].setAttribute("_lp_schecked",1),"function"===typeof LP.stream.comcontent.engines[a[b].engine].preLazyLoad&&LP.stream.comcontent.engines[a[b].engine].preLazyLoad(h[e]),f(b,[h[e]]),setTimeout(function(){c()},"undefined"!==typeof LP4.config.stream.comContent.timeout?
1E3*LP4.config.stream.comContent.timeout:5E3),LP.stream.comcontent.engines[a[b].engine].postRender(b)};LP4.aEvt(document,"scroll",function(a){e()},!0);e()};return{engines:[],initEngine:function(b,d,c){typeof(null!=b)&&""!=b&&"undefined"!==typeof LP.stream.comcontent.engines[b]&&"undefined"===typeof a[d]&&(LP.stream.comcontent.engines[b].init(d),a[d]={engine:b,containerAdSlotCnt:{}},LP.stream.comcontent.engines[b].getCSS&&LP.stream.render.addCss&&LP.stream.render.addCss(LP.stream.comcontent.engines[b].getCSS()));
b=!1;for(var e=0;e<c.length;e++)"undefined"===typeof a[d].containerAdSlotCnt[c[e]]&&(a[d].containerAdSlotCnt[c[e]]={adMax:0,adCnt:0,adErr:0},b=!0);if(b)if(0<LP.stream.cfg.comContent.total&&0<Object.keys(a[d].containerAdSlotCnt).length){c=LP.stream.cfg.comContent.total/Object.keys(a[d].containerAdSlotCnt).length;b=0;e=null;for(var f in a[d].containerAdSlotCnt)null==e&&(e=f),a[d].containerAdSlotCnt[f].adMax=parseInt(c),b+=parseInt(c);b<LP.stream.cfg.comContent.total&&a[d].containerAdSlotCnt[e].adMax++}else for(f in a[d].containerAdSlotCnt)a[d].containerAdSlotCnt[f]=
{adMax:0,adCnt:0,adErr:0}},postRender:function(b){if("undefined"!==typeof LP.stream.cfg.comContent.lazyLoad&&LP.stream.cfg.comContent.lazyLoad)e(b);else{for(var d=[].slice.call(LP4.gElmCN(document,"_lp_com_")),g=0;g<d.length;g++)"function"===typeof LP.stream.comcontent.engines[a[b].engine].preLazyLoad&&LP.stream.comcontent.engines[a[b].engine].preLazyLoad(d[g]);f(b);setTimeout(function(){c()},"undefined"!==typeof LP4.config.stream.comContent.timeout?1E3*LP4.config.stream.comContent.timeout:5E3);return LP.stream.comcontent.engines[a[b].engine].postRender(b)}},
getNext:function(b,d){return"undefined"!==typeof a[b]&&a[b].containerAdSlotCnt[d].adCnt<a[b].containerAdSlotCnt[d].adMax?(a[b].containerAdSlotCnt[d].adCnt++,LP.stream.comcontent.engines[a[b].engine].getNext(b)):!1},getSlotIndexes:function(b,d,c,e){if(0<a[b].containerAdSlotCnt[d].adMax){d=a[b].containerAdSlotCnt[d].adMax;var f=parseInt(c/d);10<f&&parseInt(f/2)}else d=0;var g=[];"function"===typeof LP.stream.comcontent.engines[a[b].engine].getInvalidSlotSizes&&(g=LP.stream.comcontent.engines[a[b].engine].getInvalidSlotSizes(LP4.getChannel()));
b=[];f=parseInt(c/d-.5);e=e.join("");for(var h=0;h<d;h++){var k=h*f+1,l=h+1>=d?c:(h+1)*f,m=Math.floor(Math.random()*(l-k)+k);if(g.includes(e[m]))for(--k;k<=l;k++){if(!g.includes(e[k])){b.push(k);break}}else b.push(m)}return b},getStreamEngine:function(b){return a[b].engine},checkEmptySlot:function(b,c){return LP.stream.comcontent.engines[a[b].engine].checkEmptySlot(c)},getEmptySlotTimeout:function(b){return"undefined"!==typeof a[b]&&LP.stream.comcontent.engines[a[b].engine].getEmptySlotTimeout?LP.stream.comcontent.engines[a[b].engine].getEmptySlotTimeout(b):
1E4}}}());
"undefined"!==typeof LP.stream&&"undefined"!==typeof LP.stream.comcontent&&"undefined"!==typeof LP.stream.comcontent.engines&&"undefined"===typeof LP.stream.comcontent.engines.plista&&(LP.stream.comcontent.engines.plista=function(){var h=!1,f=0,g=0,l=function(){var a=".plista_widget_imgwrapper >.com-label { position:absolute;top:10px;right:10px;;background-color:#909090;background-repeat: no-repeat;background-position-x:right;background-position-y: 0px;cursor:pointer;border:2px solid #909090;z-index:1000000;box-sizing:content-box;"+
("background-image:url("+("//static.plista.com/image/adchoices/"+LP.stream.cfg.comContent.origin+"/16/FFFFFF/0/1.png")+");")+"height:16px;";var b=".plista_widget_imgwrapper >.com-label:hover {background-position-y: -17px;";switch(origin){case "no":a+="width:95px;";b+="width:120px;";break;case "de":a+="width:80px;";b+="width:117px;";break;case "se":a+="width:40px;";b+="width:85px;";break;default:a+="width:120px;",b+="width:120px;"}LP.stream.render.addCss(a+"}"+(b+"}"))},m=function(a){if(!a.hasAttribute("done")){l();
a=document.querySelectorAll("._lp_com_");for(var b=0;b<a.length;b++){var d=a[b].querySelector(".plista_widget_imgwrapper");if(null===d)break;a[b].setAttribute("done",!0);var c=document.createElement("span");c.className="com-label";LP4.aEvt(c,"mousedown",function(a){a.preventDefault();a.stopPropagation();location.href="https://www.plista.com/about/opt-out";return!1});d.style.position="relative";d.appendChild(c);c=a[b].parentNode.clientHeight;var e=parseInt(.65*c);d.style.setProperty("height",e+"px",
"important");d=d.querySelector("img");0>=d.clientHeight?d.onload=function(a){k(a.target)}:k(d);d=parseInt(.3*c);c=a[b].querySelector(".itemTitle");e=12;c.style.fontSize=e+"px";for(c.style.lineHeight=e+"px";50>=e&&c.clientHeight<d;)c.style.fontSize=e+"px",c.style.lineHeight=e+"px",e++;c.style.fontSize=e-2+"px";c.style.lineHeight=e-2+"px"}}},k=function(a){a.clientHeight<a.parentNode.clientHeight&&a.parentNode.style.setProperty("height",a.clientHeight+"px","important")};return{init:function(a){LP.stream.debug("engine plista initializing for stream: ["+
a+"]");h="undefined"!==typeof LP.stream.cfg.comContent.lazyLoad&&LP.stream.cfg.comContent.lazyLoad},postRender:function(a){if(0>=g){g++;a={name:"PLISTA"+ ++g,publickey:LP.stream.cfg.comContent.publicKey,origin:LP.stream.cfg.comContent.origin};var b="script",d=window;var c=a.name||"PLISTA";d[c]||(d[c]=a,c=d.document.getElementsByTagName(b)[0],b=d.document.createElement(b),b.async=!0,b.type="text/javascript",b.src=("https:"===d.location.protocol?"https:":"http:")+"//static"+(a.origin?"-"+a.origin:"")+
".plista.com/async"+(a.name?"/"+a.name:"")+".js",c.parentNode.insertBefore(b,c))}},getNext:function(a){return f<LP.stream.cfg.comContent.total?(f++,a=function(a){return"<div data-widget"+(h?"-src":"")+'="'+a+'"></div>'},"undefined"!==typeof LP.stream.cfg.comContent.placementName&&""!=LP.stream.cfg.comContent.placementName?"object"===typeof LP.stream.cfg.comContent.placementName?f-1<LP.stream.cfg.comContent.placementName.length?a(LP.stream.cfg.comContent.placementName[f-1]):!1:getSlot(LP.stream.cfg.comContent.placementName):
a(("undefined"!==typeof LP.stream.cfg.comContent.prefix&&""!=LP.stream.cfg.comContent.prefix?LP.stream.cfg.comContent.prefix:"plista_widget_infeed_")+f)):!1},checkEmptySlot:function(a){if(a.hasAttribute("comChecked"))return!1;a.setAttribute("comChecked",!0);if(""===a.innerHTML)return!0;var b=a.getElementsByClassName("plistaAllOuter");if(b&&"undefined"!==typeof b.length&&0===b.length)return!0;m(a);return!1},getCSS:function(){for(var a=LP4.config.stream.comContent.prefix,b="itemAd itemText plista-powered itemBrand plistaHeadline plistaFooter".split(" "),
d="",c=0;c<b.length;c++)for(var e=1;e<=LP4.config.stream.comContent.total;e++)d+="."+a+e+" ."+b[c]+"{display:none;}";b=["plista_img_imgwrapper"];for(c=0;c<b.length;c++)for(e=1;e<=LP4.config.stream.comContent.total;e++)d+="."+a+e+" ."+b[c]+"{margin-bottom:0 !important;width:100% !important;}";b=["plista_widget_imgwrapper img"];for(c=0;c<b.length;c++)for(e=1;e<=LP4.config.stream.comContent.total;e++)d+="."+a+e+" ."+b[c]+"{height:inherit !important;object-fit:cover;width:100% !important;}";return d+
".plistaList{border-bottom:0px !important;}.plistaAllOuter{height:inherit !important;}"},preLazyLoad:function(a){for(var b=document.querySelectorAll("div[data-widget-src]"),d=0;d<b.length;d++)b[d].setAttribute("data-widget",b[d].getAttribute("data-widget-src")),b[d].removeAttribute("data-widget-src");return a},getInvalidSlotSizes:function(a){return"mobile"==a?["L","R","S","Q"]:["F","S","L","R","Q"]}}}());
"undefined"!==typeof LP.stream&&"undefined"!==typeof LP.stream.comcontent&&"undefined"!==typeof LP.stream.comcontent.engines&&"undefined"===typeof LP.stream.comcontent.engines.api&&(LP.stream.comcontent.engines.api=function(){var k=!1,n=0,b=void 0,g=function(){if(null==b||0==b.length)LP.stream.debug("have no comData yet....");else for(var a=document.getElementsByClassName("_lp_com_"),f=0;f<a.length;f++)if(a[f].hasAttribute("data-com-index")&&a[f].hasAttribute("data-com-view")&&!a[f].hasAttribute("done")){a[f].removeAttribute("data-com-view");
var g=a[f].getAttribute("data-com-index");if("undefined"!==typeof b&&"undefined"!==typeof b.coms&&0<b.coms.length&&"undefined"!==typeof b.coms[g]){if("undefined"!==typeof b.render&&"undefined"!==typeof b.render.preRender)try{b.render.preRender()}catch(l){console.log("Com prerender error: "+l.toString())}var h=a[f],c=b.coms[g];h.removeAttribute("data-com-empty");"undefined"!==typeof c._renderCbs&&"undefined"!==typeof c._renderCbs.comLabel&&c._renderCbs.comLabel();var e="";"undefined"!==typeof LP4.config.stream.comContent.target&&
(e=1==LP4.config.stream.comContent.target?'target="_blank"':'target="'+LP4.config.stream.comContent.target+'"');"undefined"!==typeof LP4.config.stream.comContent.hideBrand&&1==LP4.config.stream.comContent.hideBrand&&(c.brand=null);var d=!1;"function"==typeof LP4.config.stream.comContent.slot?d=LP4.config.stream.comContent.slot(c):"string"==typeof LP4.config.stream.comContent.slot&&(d=LP4.config.stream.comContent.slot);!1===d&&(d='<a class="lp_com" href="'+c.url+'"'+e+">",d=d+'<div class="com-i">'+
('<img src="'+c.img+'">'),d+='<div class="com-label">'+(null!=c.brand?c.brand:"")+"</div>",d=d+'</div><div class="com-t">'+("<span>"+c.title+"</span>"),d+="</div></a>");h.innerHTML=d;c=h;if(!c.hasAttribute("done")&&(c.setAttribute("done",1),e=c.getElementsByClassName("com-t"),0<e.length)){h=0;d=50;e[0].style.fontSize=""+d+"px";var k=e[0].firstChild,m=parseInt(LP.stream.render.getStyleValue(e[0],"padding-top"))+parseInt(LP.stream.render.getStyleValue(e[0],"padding-bottom"));for(m=e[0].clientHeight-
m;k.offsetHeight>m&&50>++h;){c.setAttribute("done",d);d-=2;if(13>d)break;e[0].style.fontSize=""+d+"px"}e[0].setAttribute("wanted-font",e[0].style.fontSize);c=100-parseInt(e[0].firstChild.offsetWidth)/parseInt(e[0].offsetWidth)*100;h=0;10<c&&h++}if("undefined"!==typeof b.render&&"undefined"!==typeof b.render.postRender)try{b.render.postRender(b.coms[g],a[f])}catch(l){console.log("Com postrender error for '"+g+"': "+l.toString())}}else a[f].setAttribute("data-com-empty",!0),a[f].appendChild(document.createElement("SPAN"))}};
return{init:function(a){LP.stream.debug("engine ComAPI initializing for stream: ["+a+"]");k="undefined"!==typeof LP.stream.cfg.comContent.lazyLoad&&LP.stream.cfg.comContent.lazyLoad},postRender:function(a){g()},postRenderSlot:function(a,b){a.setAttribute("data-com-view",1);g()},setCC:function(a){b="undefined"!==typeof a&&null!=a&&0!=a?a:[];g()},getNext:function(a){return n<LP.stream.cfg.comContent.total&&typeof("undefined"===b)?'<div class="comcontent" data-com-index="'+n++ +'" data-com-empty="1"></div>':
!1},checkEmptySlot:function(a){return a.hasAttribute("data-com-empty")?!0:!1},getCSS:function(){return".comcontent {height:100%;}.comcontent .com-i{height:70%;position:relative;}.comcontent .com-i>img{height:100%;width:100%;object-fit:cover;vertical-align:middle;}.comcontent .com-t {height:30%;}"},preLazyLoad:function(a){a.setAttribute("data-com-view",1);k&&g();return a},getInvalidSlotSizes:function(a){return"mobile"==a?["L","R","S","Q"]:[]}}}());



LP4.id=kilkaya.cfg.installationId; // nettavisen.no sin LP4 id, mÃ¥ byttes til Amedia KK id nÃ¥r streams er satt opp.



(function() {
    var __idone = false;

    function iStreams(sCnt) {
        if (__idone) {
            return;
        }
        __idone = true;

        try {
            // do we have a stream slot on this page (can have more stream slots on the same page, remember to change code accordingly)
            var arts = document.querySelectorAll("[data-lp-stream-slot]");
            var streamId = "fb";
            var numAds = 8;
            var cCode = "no";
            var wName = "stream_belowArticle";
            // var isFront = false;
            var isL = false;
            //var cText;
            //var lpT;
            var doDebug = (location.href.indexOf('k5aDebug') > -1);
            
            if (arts.length < 1) {
                // console.log("Streams: NO slot item found...." + sCnt); // <-- can be removed, just debug
                if (typeof sCnt === "undefined") {
                    sCnt = 0;
                }
                sCnt++;
                if (sCnt < 5) {
                    __idone = false;
                    setTimeout(function() {
                        iStreams(sCnt);
                    }, 1000);x
                } else {
                    //     console.log("Streams: gave up initializing streams, container not found."); // <-- can be removed, just debug
                }
            } else {
                var div = arts[0];
                if( div.getAttribute('data-lp-stream-slot') == 'front') {
                    return;
                }
                if (LP4.getPageAtr("section") == "livsstil") {
                    streamId = "fb";
                } else if (LP4.getPageAtr("section") == "okonomi") {
                    streamId = "fb";
                } else if (LP4.getPageAtr("section") == "sport") {
                    streamId = "fb";
                } else if (LP4.getPageAtr("section") == "nyheter") {
                    streamId = "fb";
                } else {
                    streamId = "fb";
                }
                
                div.setAttribute("data-lp-stream", streamId);
                div.setAttribute("data-lp-stream-engine", "basic");
                div.setAttribute("data-lp-stream-render", "dynamic");
                div.setAttribute("style", "width:100%;");
                
                div.setAttribute(
                    "data-lp-stream-render-rows",
                    LP4.getChannel() == "mobile" ? "22" : "18"
                );
                // div.setAttribute("data-lp-stream-render-validformats", LP4.getChannel() == "mobile" ? "F|HH|HH" : "TTT|Q S|S Q|TTT|T K|K T");
                div.setAttribute(
                    "data-lp-stream-render-validformats",
                    LP4.getChannel() == "mobile" ? "F|F|HH|F" : "HH|HH|T K|K TQ S|S Q|HH|HH|T K|K TQ S|S Q|TTT|"
                );
                
                if( div.getAttribute('data-lp-stream-slot') == 'plussSlot') {
                    div.setAttribute("data-lp-stream-render-rows",1);
                    div.setAttribute("data-lp-stream-render-validformats", 'F');
                    div.setAttribute("data-lp-stream", "frontpluss");
                    numAds=0;
                }
                
                arts[0].parentNode.replaceChild(div, arts[0]);
                
                //setup stream config
                LP4.config.stream = {
                    debug: doDebug, // debugs into console, set to false when going into production
                    stats: false, // log stats if possible, leave to true
                    streamUrl: "https://streams-cdn.k5a.io/streams/v1/", // don't change this
                    //streamUrl: "https://cdn-app-eu.lp4.io/stream.json", // don't change this
                    viewThreshold: 4, // total times a content is displayed to user
                    render: {
                        adjustGap: false, // micro adjust air in text if possible
                        adjustLines: false, // adjust lines if possible (ie. reduce 5 lines into 3 if needed on the slot)
                        minFontSize: LP4.getChannel() == "mobile" ? 18 : 20, // min font size
                        maxFontSize: LP4.getChannel() == "mobile" ? 35 : 45, // max font size
                        slot:function(data,slotSize) {
                            if(data.section == 'shopping' || data.section == 'guide' || data.section == 'sportspill') {
                                return '<article class="lp-a"><a href="%URL%"><div class="lp-a-img"><img src="%IMG%"><div class="slotHeader"><span>Reklame<span></div></div><div class="lp-a-t"><span>%TITLE%</span></div></a></article>';
                            }
                            return false;
                        },
                        postRender: function($data) {
                            var i = document.querySelectorAll("._lpStream article img");
                            for (var a = 0; a < i.length; a++) {
                                i[a].setAttribute("alt", " ");
                            }
                            
                            // Set the defaul NA images to obcject-fit fill
                            var element = [];
                            var f = document.querySelectorAll(".lp-a-img img");
                            if (f && f != "undefined") {
                                for (var fi = 0; fi < f.length; fi++) {
                                    element = f[fi];
                                    if (
                                        f[fi].src.indexOf("/na-logo-fb-default-ogimage") > -1 
                                        //||
                                        //        f[fi].src.indexOf("small-positive.svg") > -1
                                    ) {
                                        f[fi].classList.add("lp-img-fill");
                                    }
                                }
                            }
                        }
                    },
                    cssText:
                    '.lp-f,.lp-h,.lp-k,.lp-s,.lp-q,.lp-t,.lp-r,.lp-l{max-width:unset!important}:root{--main-color:#000;--main-bg-color:#f5f5f5;--slot-height:400px!important}._lpStream{background-color:var(--main-bg-color)}.lp-r{display:inline-block;width:100%;padding:5px 0px!important;margin:5px 0px!important;background-color:var(--main-bg-color)}.lp-a{background-color:var(--main-bg-color);width:100%;padding:0 8px!important;margin:0!important}.lp-a-t{box-sizing:border-box;color:#000;padding:10px 10px 2px 10px!important;font-family:inherit}.lp-a:hover{text-decoration:underline}.lp-r .lp-a img{width:100%;object-fit:cover}.lp-img-fill{object-fit:fill!important}.lp-a-slotLabelA{position:absolute;top:0;height:25px;width:100%;background-color:#c4c4c4!important;color:var(--main-color);text-align:left;padding-top:2px}.lp-aLabel{font-size:18px!important;font-family:inherit;padding-left:5px;padding-top:2px;font-weight:700;text-transform:uppercase}.lp-a-slotLabel{right:unset!important;font-size:40px!important;line-height:20px!important;top:unset!important;height:35px;width:35px;bottom:0px!important;left:0px!important;background-color:#120101!important;color:#fff;border-radius:1px;text-align:center!important;font-weight:lighter!important}._lpStream .comcontent .com-i>.com-label{position:absolute;width:unset!important;height:unset!important;font-family:var(--main-font);font-size:14px;line-height:14px;font-weight:700;color:#000;background-color:#ffffff!important;border-color:#ffffff!important;padding:3px!important;box-sizing:border-box!important;top:5px!important;left:5px!important;right:unset!important;background-image:unset!important}.com-label:before{content:"ANNONSE "!important;width:75px!important}.com-t{box-sizing:border-box;font-family:inherit;font-weight:bold!important;padding:3px 0px!important;background-color:#fff!important;color:var(--main-color)!important;text-decoration:none;background-color:var(--main-bg-color)!important}.comcontent:hover{text-decoration:underline}@media only screen and (max-width:501px){:root{--slot-wide-height:120px!important;--slot-height:280px!important;--slot-big-height:280px!important}.lp-r{width:100%;padding:5px 0px!important;margin:0px!important}.lp-a{padding:0 5px!important;margin:0px!important}.lp-a-t{padding:5px!important}.lp-a-slotLabel{font-size:25px!important;line-height:12px!important;height:25px;width:25px;left:0px!important;bottom:0px!important;right:unset!important}.lp-a-slotLabelA{height:20px}._lpStream .comcontent .com-i>.com-label{font-size:12px;line-height:12px}.lp-aLabel{font-size:14px!important}.lp-a-l .lp-a-t,.lp-a-r .lp-a-t{padding:0 5px!important;margin:0px!important}.lp-r .lp-a-l img,.lp-r .lp-a-r img{margin:unset!important;width:100%;object-fit:cover;padding-bottom:0}} .lp-a .slotHeader {position:absolute;background-color:#c4c4c4;cursor:pointer;box-sizing:content-box;height:30px;width:100%;top:0px;left:0px;font-size:15px;line-height:30px;font-weight:bold;text-transform:uppercase;}.lp-a .slotHeader>span {padding-left:5px;}.lp-r .lp-a .lp-a-img>img[src*="small-positive.svg"] {object-fit: contain !important;}',
                    
                    dataFilter: function(data) {
                        data.image = data.image
                            .replace(/http\:\/\//, "https://")
                            .replace(/\+/g, encodeURIComponent("+"))
                            .replace(/\(/g, encodeURIComponent("("))
                            .replace(/\)/g, encodeURIComponent(")"))
                            .replace(/\Ã¥/g, encodeURIComponent(encodeURIComponent("Ã¥")))
                            .replace(/\Ã¸/g, encodeURIComponent(encodeURIComponent("Ã¸")))
                            .replace(/\(/, "%2528")
                            .replace(/\)/, "%2529");
                        
                        // Set max textlength based on channel, add ... if too long
                        var tL = 100;
                        LP4.getChannel() == "mobile" ? (tL = 130) : (tL = 160);
                        
                        if (tL && tL != "undefined" && data.title.length > tL) {
                            var d = data.title.length - tL;
                            data.title =
                                data.title.substring(0, data.title.length - (d + 4)) +
                                "...";
                            // console.debug("AFTER : " + data.title);
                        }
                        
                        var reg = /^\(\+\)\s(.*)/;
                        if (data.title.match(reg)) {
                            data.title = data.title.replace(reg, "$1");
                            data.slotLabel = '<div class="lp-a-slotLabel">+</div>';
                        }
                        // console.debug(data);
                        return data;
                    },
                    urlFilter: function(url) {
                        // console.log(url);
                        //var hUrl = document.location.href;
                        // manipulate urls here (can also be done via dataFilter), ie. add parameteres etc...
                        var regU = /^([a-z]+\:\/+www\.nettavisen\.no\/).*(\/\d{9,11})(\.html)?/;
                        url = url.replace(regU, "$1artikkel$2");
                        return url; //hUrl.replace(/https?\:\/\//, '');
                    },
                    customBlacklist: function(art) {
                        //console.debug(art);
                        var r = false;
                        var cbReg = /^[a-z]+\:\/+www\.nettavisen\.no\/.*\/(\d{9,11})(\.html)?/;
                        var cbReg2 = /^www\.nettavisen\.no\/artikkel\/(\d{9,11})(\.html)?/;
                        var aId = LP4.getUrl();
                        aId = aId.replace(cbReg, "$1");
                        // console.log(aId + " AID  IIIIIIIII");
                        var uId = art.url.replace(cbReg2, "$1");
                        // console.log(art.url + " ARTURL ");
                        if (aId == uId) {
                            //  console.log(aId + " matches : " + uId);
                            r = true;
                        }
                        return r;
                    },
                    // commmercial content (ads), only change total if needed. Leave the rest for now
                     comContent: {
                            stats: false,
                            total: 8,
                            placement: "rnd",
                            engine: "api",
                            lazyLoad: true,
                            timeout: 320,
                            target: true,
                            hideBrand:false,
                            postRender:function(slot) {
                                return slot;
                            },
                           /* slot:function(com) {
                               var tmpl='<a class="lp_com" href="'+com.url+'" target="_blank">';
                               tmpl+='<div class="com-i">';
                               tmpl+='<img src="'+com.img+'" alt="">';
                               tmpl+='</div>';
                               tmpl+='<div class="com-t">';
                               tmpl+='<span>'+com.title+'</span>';
                               tmpl+='</div>';
                               tmpl+= '<div class="com-label">'+(com.brand!=null?com.brand:'')+'</div>';
                               tmpl+='</a>';
                               return tmpl;
							              },*/
                            setup:function() {
                                if( typeof(LP4.config.stream.comContent.setupDone) !== 'undefined') {
                                    console.log("PAPI setup already done!");
                                    return;
                                }
                                LP4.config.stream.comContent.setupDone=true;
                                
                                (function(cfg) {
                                  var d = document,
                                  s = d.createElement("script");
                                  s.type = "text/javascript";
                                  s.onload = function() { PAPI.init(cfg); };
                                  s.src ="https://ast.mfwd.io/ast.1.0.0.min.js?20221010";
                                  d.getElementsByTagName("head")[0].appendChild(s);
                                })({
                                    astMember:7682,
                                    astPublisherId:1188073,
                                    astKeywords:{},
                                    astUser:{},
                                    astTagids:  [
                                        27588143,
                                        27588144,
                                        27588146,
                                        27588147,
                                        27588156,
                                        27588157,
                                        27588158,
                                        27588159
                                    ],
                                    //public_key:"87a6b0f7fb50a20c6b4df541",
                                    widget_name: "stream_belowArticle",
                                    //language: "no",
                                    total: 8,
                                    debug: doDebug,
                                    //uCors: true,
                                    //comStats: false,
                                    //noIAB: true,
                                 //height: 360,
                                    //width: 640,
                                    //title: undefined,
                                    //description: undefined
                              });
                            }
                     }
                    /*
                    comContent: {
                        stats: false,
                        total: numAds,
                        placement: "rnd",
                        engine: "api",
                        lazyLoad: true,
                        timeout: 5,
                        target: true,
                        setup:function() {
           	  	            if( numAds > 0) {
                                (function(cfg) {
                                    var d = document,
                                        s = d.createElement("script");
                                    s.type = "text/javascript";
                                    s.onload = function() {PAPI.init(cfg);};
                                    s.src = "https://insights.plista.com/plista.api.1.0.11.js?d=20191209";
                                    d.getElementsByTagName("head")[0].appendChild(s);
                                })({
                                    public_key: "e4b19b11ab7e195ce4426fdb",
                                    widget_name: wName,
                                    language: cCode,
                                    total: numAds,
                                    debug: false,
                                    uCors: true,
                                    noIAB: true,
                                    target: true,
                                    height: 360,
                                    width: 640,
                                    title: undefined,
                                    description: undefined
                                });
                            } // if(numAds...
                        }
                    }*/
                };

                
                LP.stream.init();
                
            } // else
        } catch (e) {
            __idone = false;
            console.error(e.toString());
        }
    } // iStreams


    if( location.href.indexOf('www.nettavisen.no') > -1 ||
        location.href.indexOf('k5a.io') > -1 
      ) {
        if (typeof LP4 !== "undefined") {
            if( document.readyState !== 'complete' ) {
                window.addEventListener('load', (event) => {
                    if(typeof(kilkaya)!=='undefined') { iStreams(); }
                });
                document.addEventListener('readystatechange', (event) => {
                    if( document.readyState=='complete') {
                        if(typeof(kilkaya)!=='undefined') { iStreams(); }
                    }
                });
                
                setTimeout(function() {
                    if(typeof(kilkaya)!=='undefined') { iStreams(); }
                },1000);
            } else {
                setTimeout(function() {
                    if(typeof(kilkaya)!=='undefined') { iStreams(); }
                },100);
            }
    }
    }
})();