<?php

/*
 * Locale settings for current Project
 */

//sets default CULTURE if not defined manually in biApp/conf.php
if(!defined(CULTURE)){
  define('CULTURE','it_IT,ita,italian');
}

$cultures = explode(',',CULTURE);
$cultures_size = count($cultures);

for ($i=0;$i<($cultures_size*2);$i++) {
    $culture_isset = ($i<$cultures_size) ? Project::setLanguage($cultures[$i].'.UTF-8') : Project::setLanguage($cultures[$i%$cultures_size]);
    if ($culture_isset!==FALSE) break;
}