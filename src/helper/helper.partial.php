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
 * Google Analytics partial
 */
function include_tracker($ua) {
  if(!in_array(@$_SERVER['REMOTE_ADDR'], array('127.0.0.1', '::1'))) {
    include WEB_DIR."tracker.php";
  }
}
