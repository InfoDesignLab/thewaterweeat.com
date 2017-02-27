<?php

/**
 * Generate img tag with resize
 */
function imgTagResize($resource, $w='0', $h='0', $local_path='') {
  return "<img src=\"".getResizeUrl($resource,$w,$h,$local_path)."\" width=\"$w\" height=\"$h\" />";
}
