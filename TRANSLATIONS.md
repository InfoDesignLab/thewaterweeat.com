# Translations

To add a new language, please follow these steps:

1. Add the corresponding [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) code (eg: 'es' for Spanish) to the langs hash in `src/js/virtual.water.i18n.js`, eg: `'es': 'Spanish',`

2. Add a folder named with the same code (eg: 'src/es'), and inside add a file named `index.php` with this content: `<?php define('PREFIX', '../'); include_once('../index.php') ?>`

3. Add the link annotation in `src/_meta.php`, eg: `<link rel="alternate" hreflang="es" href="http://waterweeat.com/es/" />`

4. Add the translation json file in the `src/i18n` folder, eg: `src/i18n/es.json`

5. Test locally and deploy the new version

Please note:

- The json translation file should be encoded in `utf-8`.

- You can start the file by copying from the template at `src/i18n/qqq.json`.

- This template should be kept up-to-date with new sentences.
