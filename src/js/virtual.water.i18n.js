var i18n = $.i18n()

i18n.locale = 'it';

if (!/^en/.test(i18n.locale)) {
  i18n.load('i18n/' + i18n.locale + '.json', i18n.locale).done(function(translations, status, request) {
    $('body').i18n();
  });
}
