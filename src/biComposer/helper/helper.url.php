<?php

function redirect($url='./') {
  if( !headers_sent() ) {
    header('Location: '.$url, true);
  }
}

/**
 * Return a GET parameter threaten as SLUG
 */
function getSlug($default='',$pos=0) {
  $slug = array_keys($_GET);
  return $slug ? filter_var($slug[$pos], FILTER_SANITIZE_STRING) : $default;
}


/**
 * Return first GET parameter threaten as SLUG
 */
function getParameter($param) {
  if (array_key_exists($param, $_GET) && isset($_GET[$param])) {
    return filter_input(INPUT_GET, $param, FILTER_SANITIZE_STRING);
  }
  return null;
}


/**
 * Generate common resize url for timthumb
 */
function getResizeUrl($resource, $w='0', $h='0', $local_path='') {
  if (is_array($resource)) {
    $resource = getAtkImg($resource);
  }
  return "resize/{$w}x{$h}/r/{$local_path}{$resource}";
}

/**
 * Generate common resize url for timthumb, specific for Youtube external thumbnail
 */
function getResizeUrlYoutube($resource, $w='0', $h='0') {
  return "youtube/{$w}x{$h}/r/{$resource}";
}

