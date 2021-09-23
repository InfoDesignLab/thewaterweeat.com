const otaClient = require('@crowdin/ota-client').default;
const { getCrowdinLanguages } = require('./api-crowdin.js');

if (typeof $.i18n !== 'undefined') {
  var i18n = $.i18n();
  var $langSelector = $('#lang-selector');

  const hash = '36fa9f1cb0913e3d0b6b358vlbn';
  const client = new otaClient(hash);
  const translationFileName = '/translations.json';

  function composeLangSelect(langs) {
    $.each(langs, (_, value) => {
      $langSelector.append($('<option>', { value: value.id, selected: value.id === i18n.locale }).text(value.name));
    });
  }

  function switchLocale(locale) {
    console.log(locale);
    i18n.locale = locale;
    client.setCurrentLocale(locale);
  }

  async function getTranslation(locale) {
    return await client.getFileTranslations(translationFileName, locale).catch(error => console.log(error));
  }

  function calcLocale(langs) {
    const browserLanguage = langs.find(lang => lang.twoLettersCode === i18n.options.locale);
    if (!!browserLanguage) return browserLanguage.id;
    else return i18n.options.fallbackLocale;
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

  getCrowdinLanguages()
    .then(async langs => {
      i18n.languages = langs;
      switchLocale(calcLocale(langs));
      composeLangSelect(i18n.languages);
      return i18n.locale;
    })
    .then(async locale => await getTranslation(locale))
    .then(translations => mountTranslation(translations, i18n.locale))
    .catch(error => console.error(error));

  $(function () {
    $langSelector.on('change', async event => {
      switchLocale(event.target.value);
      i18n.messageStore.load(i18n.locale, client.getFileTranslations(translationFileName, i18n.locale));
      await getTranslation(i18n.locale).then(translations => mountTranslation(translations, i18n.locale));
    });
  });
}
