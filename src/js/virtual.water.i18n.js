var i18n = $.i18n();

var langs = {
  'en': 'English',
  'it': 'Italian',
  'no': 'Norwegian',
};

var subdomain, maindomain;

if (/\./.test(window.location.host)) {
  var domainComponents = window.location.host.split('.')
  subdomain = domainComponents[0]
  maindomain = domainComponents.slice(1).join('.')
} else {
  maindomain = window.location.host;
}

if (Object.keys(langs).indexOf(subdomain) !== -1) {
  i18n.locale = subdomain;
} else {
  i18n.locale = 'en';
}

if (!/^en/.test(i18n.locale)) {
  i18n.load('i18n/' + i18n.locale + '.json', i18n.locale).done(function(translations, status, request) {
    $('body').i18n();
    $('[data-i18n-metres]').each(function() {
      $(this).html($.i18n('$1 METRES', $(this).data('i18n-metres')));
    })
  });
}

$(function() {
  var $langSelector = $('#lang-selector')
  $.each(langs, function(key, value) {
    $langSelector.append($('<option>', { value: key }).text(value));
  });

  $langSelector.on('change', function(event) {
    var intendedLang = $(this).val();
    if (intendedLang !== i18n.locale) {
      var domain;
      if (intendedLang === 'en') {
        domain = maindomain;
      } else {
        domain = intendedLang + '.' + maindomain;
      }
      window.location = location.protocol + '//' + domain + location.pathname;
    }
  });
})
