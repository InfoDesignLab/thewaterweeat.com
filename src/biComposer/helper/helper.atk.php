<?php

/**
 * Format an atk date to a given format
 */
function atkDate($date=array(), $format='%d %B %Y') {
  if (!empty($date)) {
    return strftime($format, strtotime("{$date['year']}-{$date['month']}-{$date['day']}"));
  }
}

function hasAtktext($textField) {
  return strlen($textField)>6;
}

function hasAtkFile($file=array()) {
  return !empty( $file['orgfilename'] );
}

function getAtkFile($file=array()) {
  return $file['orgfilename'];
}


// Methods alias //

function hasAtkImg($img=array()) {
  return hasAtkFile($img);
}

function getAtkImg($img=array()) {
  return getAtkFile($img);
}

