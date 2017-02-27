<?php

// Apply culture
switch ($_SERVER['PROJECT_ENV']) {
  // SVILUPPO
  case 'dev':
    define('ENV','dev');
    break;
  
  // PRODUZIONE
  default:
    define('ENV','prod');
}
