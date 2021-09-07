var langs = require('./langs.js');
var langFromPath = location.pathname.replace(/\//g, '');
var lang;
const otaClient = require('@crowdin/ota-client').default;

var i18n = $.i18n();
const hash = '36fa9f1cb0913e3d0b6b358vlbn';

const client = new otaClient(hash);

async function getTranslations(locale) {
  console.log('Getting translations for locale: ' + locale);

  return await client
    .getFileTranslations('/translations.json', locale)
    .then(translations => {
      mountTranslation(translations, locale);
    })
    .catch(error => console.log(error));
}

function mountTranslation(translations, locale) {
  console.log('Mounting translations for locale: ' + locale);
  return i18n.load(translations, locale).done(function (translations, status, request) {
    $('body').i18n();
    $('[data-i18n-metres]').each(function () {
      $(this).html($.i18n('$1 METRES', $(this).data('i18n-metres')));
    });
    $('#share-download-link').attr(
      'href',
      $('#share-download-link')
        .attr('href')
        .replace(/\.jpg/, '-' + i18n.locale + '.jpg')
    );
    $('#translated-by').html('Translated by: <b>' + $.i18n('metadata-authors') + '</b><br/>');
  });
}

client
  .listLanguages()
  .then(langs => {
    const locale = langFromPath
      ? langFromPath
      : langs.includes(i18n.options.locale)
      ? i18n.options.locale
      : i18n.options.fallbackLocale;

    client.setCurrentLocale(locale);
    i18n.locale = locale;

    return client.getCurrentLocale();
  })
  .then(locale => {
    getTranslations(locale);
  })
  .catch(error => console.error(error));

$(function () {
  var $langSelector = $('#lang-selector');
  $.each(langs, function (key, value) {
    $langSelector.append($('<option>', { value: key, selected: key === lang }).text(value));
  });

  $langSelector.on('change', function (event) {
    var intendedLang = $(this).val();
    if (intendedLang !== lang) {
      var path;
      if (intendedLang === 'en') {
        path = '/';
      } else {
        path = '/' + intendedLang + '/';
      }
      window.location = location.protocol + '//' + location.host + path;
      client.setCurrentLocale(intendedLang);
    }
  });
});
