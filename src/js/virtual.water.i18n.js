var i18n = $.i18n();

var langs = require('./langs.js')

var langFromPath = location.pathname.replace(/\//g, '')
if (Object.keys(langs).indexOf(langFromPath) !== -1) {
  i18n.locale = langFromPath;
} else {
  i18n.locale = 'en';
}

if (!/^en/.test(i18n.locale)) {
  i18n.load(JSON.parse($('#translation').html()), i18n.locale).done(function(translations, status, request) {
    $('body').i18n();
    $('[data-i18n-metres]').each(function() {
      $(this).html($.i18n('$1 METRES', $(this).data('i18n-metres')));
    });
    $('#share-download-link').attr('href', $('#share-download-link').attr('href').replace(/\.jpg/, '-' + i18n.locale + '.jpg'));
    $('#translated-by').html('Translated by: <b>' + $.i18n('metadata-authors') + '</b><br/>');
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
