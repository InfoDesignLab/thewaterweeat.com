<?php
/**
 * @version   SVN: $Rev: 43 $ – $Date: 2012-07-16 16:11:33 +0200 (lun, 16 lug 2012) $
 * @author    SVN: $Author: dha $
 */

// Global paths
define('ROOT',          realpath(dirname(__FILE__).'/..'));
define('VENDOR_DIR',    ROOT.'/biComposer/');
define('APP_DIR',       ROOT.'/biApp/');
define('WEB_DIR',       ROOT.'/');
define('PARTIAL_DIR',   VENDOR_DIR.'/partial/');


// init project
require VENDOR_DIR.'basili.co/Project.php';
// Load project configurations
require APP_DIR.'conf.php';
// Load project specific stuff (vars, funcs, ecc)
require APP_DIR.'app.php';


// Default project modules
$project->addModules(array(
  'project',
  'helper',
  'flickr',
));


// Load modules
$project->loadModules();

// Set $atk container
// TODO: fix in a better way
list($atk) = $project->loadDefaultObjects();
