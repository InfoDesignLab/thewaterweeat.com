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
