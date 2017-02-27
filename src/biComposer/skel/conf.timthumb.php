<?php

// Debug
define('DEBUG_ON', FALSE);
define('DEBUG_LEVEL', 1);

// Hotlinking
define('ALLOW_EXTERNAL', FALSE);
define('ALLOW_ALL_EXTERNAL_SITES', FALSE);

// Cache
define('FILE_CACHE_ENABLED', TRUE);

// Default images
define('ERROR_IMAGE', '');
define('NOT_FOUND_IMAGE', '');

// image settings
define('DEFAULT_Q', 90);
define('DEFAULT_ZC', 1);
define('DEFAULT_F', '');
define('DEFAULT_S', 0);
define('DEFAULT_CC', 'ffffff');
define('PNG_IS_TRANSPARENT', TRUE);

// External sites allowed to fetch images
$ALLOWED_SITES = array(
    'flickr.com',
    'staticflickr.com',
    'img.youtube.com',
    //'picasa.com',
    //'upload.wikimedia.org',
    //'photobucket.com',
    //'imgur.com',
    //'imageshack.us',
    //'tinypic.com',
    'localhost',
);