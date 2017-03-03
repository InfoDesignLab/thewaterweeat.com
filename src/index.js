require('es6-promise').polyfill()
require('./vendor/html5/prefixfree')
require('./vendor/html5/objectkeys.js')
require('./vendor/jquery/jquery.easing.js')
require('./vendor/jquery/jquery.nicescroll.js')

require('./css/media-query.css');

var badIE = window.attachEvent && !window.addEventListener;
var mobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
if (badIE || mobileDevice) {
  // no need for a breakpoint here, as there's little extra KB.
  require('./css/static.css');
  $('.main').append(require('./_static.html'));
  require('./js/virtual.water.static.js')
} else {
  require.ensure([], function() {
    require('./css/layout.css');
    require('./css/animations.css');
    $('.main').append(require('./_dynamic.js'));
    require('./vendor/jquery/jquery.inview.js')

    require('./vendor/jquery/CLDRPluralRuleParser.js')
    require('./vendor/jquery/jquery.i18n.js')
    require('./vendor/jquery/jquery.i18n.messagestore.js')
    require('./vendor/jquery/jquery.i18n.fallbacks.js')
    require('./vendor/jquery/jquery.i18n.parser.js')
    require('./vendor/jquery/jquery.i18n.emitter.js')
    require('./vendor/jquery/jquery.i18n.language.js')

    require('./js/virtual.water.i18n.js');
    require('./js/virtual.water.intro.js');
    require('./js/virtual.water.house.js');
    require('./js/virtual.water.flickering.js');
    require('./js/virtual.water.stats.js');
    require('./js/virtual.water.invisible.js');
    require('./js/virtual.water.discover.js');
    require('./js/virtual.water.bottles.js');
    require('./js/virtual.water.graph.js');
    require('./js/virtual.water.end.js');
  }, 'dynamic')
}
