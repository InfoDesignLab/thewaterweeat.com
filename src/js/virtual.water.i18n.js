const otaClient = require('@crowdin/ota-client').default;
const langMap = require('./lang-map.js');

var i18n = $.i18n();
var $langSelector = $('#lang-selector');

const hash = '36fa9f1cb0913e3d0b6b358vlbn';
const client = new otaClient(hash);
const translationFileName = '/translations.json';

function composeLangSelect(langs) {
  $.each(langs, (_, value) => {
    $langSelector.append(
      $('<option>', { value: value, selected: value === i18n.locale }).text(langMap[value.split('-')[0]].name)
    );
  });
}

function switchLocale(locale) {
  i18n.locale = locale;
}

async function getTranslation(locale) {
  return await client.getFileTranslations(translationFileName, locale).catch(error => console.log(error));
}

function mountTranslation(translations, locale) {
  return i18n.load(translations, i18n.locale).done(() => {
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
    i18n.languages = langs;
    switchLocale(i18n.languages.includes(i18n.options.locale) ? i18n.options.locale : i18n.options.fallbackLocale);
    composeLangSelect(i18n.languages);
    return i18n.locale;
  })
  .then(async locale => await getTranslation(locale))
  .then(translations => mountTranslation(translations, i18n.locale))
  // .then(async () => await getAllTranslations())
  .catch(error => console.error(error));

$(function () {
  $langSelector.on('change', async event => {
    switchLocale(event.target.value);
    i18n.messageStore.load(i18n.locale, client.getFileTranslations(translationFileName, i18n.locale));
    await getTranslation(i18n.locale).then(translations => mountTranslation(translations, i18n.locale));
  });
});
