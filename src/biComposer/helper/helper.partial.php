<?php

/**
 * with parent directory >> include_partial('it/partial')
 * root directory >> include_partial('partial')
 *
 */
function include_partial($name, $vars = array()) {
  global $project, $atk;
	$dir = '';
	
  foreach ($vars as $k => $v) {
    $$k = $v;
  }
  
  $path = explode('/', $name);

  if(count($path)==2) {
    $name = $path[1];
    $dir = $path[0].'/';
  }
  
  include WEB_DIR."{$dir}_{$name}.php";
}


/**
 * jQuery partial
 */
function include_jquery($version='', $dev=false) {
  // Valid url example ($version)($dev)
  // http://code.jquery.com/jquery(-1.8.0)(.min).js
  $url = "http://code.jquery.com/jquery.min.js";

  // Use desired version
  if (!empty($version)) {
    $url = str_replace('jquery.min', "jquery-$version.min", $url);
  }
  // jQuery code served in dev mode
  if ($dev) {
    $url = str_replace('.min', "", $url);
  }
  
  include PARTIAL_DIR."jquery.php";
}


/**
 * Google Analytics partial
 */
function include_tracker($ua) {
  if(!in_array(@$_SERVER['REMOTE_ADDR'], array('127.0.0.1', '::1'))) {
    include PARTIAL_DIR."tracker.php";
  }
}
