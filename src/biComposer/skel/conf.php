<?php
/**
 * @version   SVN: $Rev: 49 $ – $Date: 2012-08-24 16:32:38 +0200 (ven, 24 ago 2012) $
 * @author    SVN: $Author: dha $
 */

// --- PROJECT PROPERTIES

// Unique project name (no whitespace or accented words)
define('APP_NAME',          'NomeCliente');
// Production domain
define('APP_DOMAIN',        'dominio.tld');
// Default recipient
define('APP_EMAIL',         'info@'.APP_DOMAIN);
// Default BCC in emails
define('BCC_TO',            'info@basili.co');
// Backoffice directory
define('ADMIN_DIR',         ROOT.'/backoffice/');
// Session duration
define('SESSION_TIMEOUT',   60*60*24);
// Locale
define('CULTURE',           'it_IT');



// --- PROJECT MODULES

// Uncomment following line to use a backoffice
// $project->useBackoffice();
