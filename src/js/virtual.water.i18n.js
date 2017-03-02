var i18n = $.i18n();

var langs = {
  'en': 'English',
  'it': 'Italian',
  'no': 'Norwegian',
};

var langFromPath = location.pathname.replace(/\//g, '')
if (Object.keys(langs).indexOf(langFromPath) !== -1) {
  i18n.locale = langFromPath;
} else {
  i18n.locale = 'en';
}

if (!/^en/.test(i18n.locale)) {
  var i18nPath = $('html').attr('i18npath');
  i18n.load(i18nPath + i18n.locale + '.json', i18n.locale).done(function(translations, status, request) {
    $('body').i18n();
    $('[data-i18n-metres]').each(function() {
      $(this).html($.i18n('$1 METRES', $(this).data('i18n-metres')));
    });
  });
}

$(function() {
  var $langSelector = $('#lang-selector')
  $.each(langs, function(key, value) {
    $langSelector.append($('<option>', { value: key, selected: key === i18n.locale }).text(value));
  });

  $langSelector.on('change', function(event) {
    var intendedLang = $(this).val();
    if (intendedLang !== i18n.locale) {
      var path;
      if (intendedLang === 'en') {
        path = '/';
      } else {
        path = '/' + intendedLang + '/';
      }
      window.location = location.protocol + '//' + location.host + path;
    }
  });
})
