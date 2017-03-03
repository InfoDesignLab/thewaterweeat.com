# Translations

To add a new language, please follow these steps:

1. Add the corresponding [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) code (eg: 'es' for Spanish) to the langs hash in `src/js/langs.js`, eg: `'es': 'Spanish',`

2. Add the link annotation in `src/_meta.html`, eg: `<link rel="alternate" hreflang="es" href="http://waterweeat.com/es/" />`

3. Add the image version with the corresponding translation at eg: `src/download/thewaterweeat-es.jpg`. Note: Just copy the english version if the translated version is not ready yet.

4. Add the translation json file in the `src/i18n` folder, eg: `src/i18n/es.json`

5. Add a file with a name such as: 'src/index.es.html', with this content (note to replace es.json with appropriate code for intended language):
```html
<!DOCTYPE html>
<html>
  <head>
    ${require('html-loader?interpolate&attrs=link:href!./meta.html')}
  </head>
  <body class="load">
    ${require('html-loader?interpolate!./main.html')}
    <script type="application/json" id="translation">
      ${require('text-loader!./i18n/es.json')}
    </script>
  </body>
</html>
```

6. Test locally and deploy the new version

## Please note:

- The json translation file should be encoded in `utf-8`.

- You can start the file by copying from the template at `src/i18n/qqq.json`.

- This template should be kept up-to-date with new sentences.
