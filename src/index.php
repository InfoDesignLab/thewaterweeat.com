<?php
define('ROOT', realpath(dirname(__FILE__).'/'));
define('WEB_DIR', ROOT.'/');
require 'helper/helper.ua.php';
require 'helper/helper.partial.php';
$browser = getBrowser();
$is_old = $browser['name'] == 'msie' && $browser['version'] < 9;
?>
<!DOCTYPE html>
<html>
  <head>
    <?php include_partial('meta'); ?>
    <?php if ($is_old || isMobileDevice()): ?>
      <link type="text/css" rel="stylesheet" href="css/static.css" />
    <?php endif; ?>
    <link type="text/css" rel="stylesheet" href="css/media-query.css" />
    <?php include_tracker('UA-21936787-50') ?>
  </head>
  <body class="load">
  	<?php include_once("analyticstracking.php") ?>

    <?php include_partial('loader'); ?>

    <div class="main">
      <img src="thumb.jpg" alt="" style="position: absolute; opacity:0; filter:alpha(opacity=0); top: 0px;left: 0px;" />
      <?php
        if ($is_old || isMobileDevice()) {
          include_partial('static');
        } else {
          include_partial('intro');
          include_partial('drops_wall');
          include_partial('house');
          include_partial('stats');
          include_partial('pre_discover');
          include_partial('discover');
          include_partial('bottles_wall');
          include_partial('graphics');
          include_partial('solution');
          include_partial('end');
          include_partial('share');
          include_partial('credits');
        }
      ?>

    </div>

    <script src="js/html5/html5shim.js"></script>
    <script src="js/html5/objectkeys.js"></script>
    <script src="js/html5/respond.min.js"></script>
    <script src="js/jquery/jquery.min.js"></script>
    <script src="js/jquery/jquery.easing.js"></script>
    <script src="js/jquery/jquery.nicescroll.js"></script>
    <script src="js/jquery/jquery.inview.js"></script>
    <script src="js/jquery/CLDRPluralRuleParser.js"></script>
    <script src="js/jquery/jquery.i18n.js"></script>
    <script src="js/jquery/jquery.i18n.messagestore.js"></script>
    <script src="js/jquery/jquery.i18n.fallbacks.js"></script>
    <script src="js/jquery/jquery.i18n.parser.js"></script>
    <script src="js/jquery/jquery.i18n.emitter.js"></script>
    <script src="js/jquery/jquery.i18n.language.js"></script>
    <script src="js/virtual.water.init.js"></script>
    <script src="js/virtual.water.i18n.js"></script>

    <?php if($is_old || isMobileDevice()): ?>
      <script src="js/virtual.water.static.js"></script>
    <?php else:?>
      <?php include_partial('js'); ?>
    <?php endif?>

  </body>
</html>
