<?php 


function __($array, $str) {
  global $ln;
  return $array["{$str}_{$ln}"];
}


// --- Replace url from $org culture to $dst culture

function language_menu_url($org, $dst) {
  return str_replace("/$org/", "/$dst/", $_SERVER['REQUEST_URI']);
}
