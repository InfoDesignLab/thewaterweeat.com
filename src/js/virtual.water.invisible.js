var { showNiceScroll, hideNiceScroll } = require('./virtual.water.init.js');

$(document).ready(function(){

  var $report = $('#stats .report');
  var $invisible = $('#stats .zoom');
  var $istogram = $('#stats .istogram');
  var $invisibleBlank = $('#stats-invisible-parts-blank');
  var $resumeContainer = $('#stats .invisible-parts .resume .text-container');
  var $svgPanel = $('#svg-water');

  var $zoomFirst = $('.zoom-out[data-zoom=1]');
  var $zoomSecond = $('.zoom-out[data-zoom=2]');
  var $zoomThird = $('.zoom-out[data-zoom=3]');

  /*RAPHAEL*/

  require('./svg-water.js')

  function setZoom(zoom){
    $svgPanel.removeClass('zoom1 zoom2 zoom3').addClass(zoom);
  }

  function onScroll(){
    var scrollTop = $(window).scrollTop();
    var start = $invisibleBlank.offset().top;
    var end =  $invisibleBlank.height();
    var txtHeight = $resumeContainer.height() - $resumeContainer.find('p:last').outerHeight();
    var newTop = ((scrollTop - start)*txtHeight)/end;

    $resumeContainer.css({
      top: -1 * newTop
    });

    if (newTop >= 0 && newTop < txtHeight/9 && !$zoomFirst.hasClass('show')){
      $zoomFirst.addClass('show');
      $zoomSecond.removeClass('show');
      $zoomThird.removeClass('show');
      setZoom('zoom1');
    }

    if (newTop >= txtHeight/8.5 && newTop < (txtHeight/2) && !$zoomSecond.hasClass('show')){
      $zoomFirst.removeClass('show');
      $zoomSecond.addClass('show');
      $zoomThird.removeClass('show');
      setZoom('zoom2');
    }

    if (newTop >= (txtHeight - 500) && newTop < txtHeight && !$zoomThird.hasClass('show')){
      $zoomFirst.removeClass('show');
      $zoomSecond.removeClass('show');
      $zoomThird.addClass('show');
      setZoom('zoom3');
    }
  }

  $(window).on('scroll', function(){

    var scrollTop = $(window).scrollTop();

    $(window).trigger('scrollForZoom');

    if (scrollTop >= $invisibleBlank.offset().top &&  scrollTop < $invisibleBlank.offset().top + $invisibleBlank.height()){
      if (!$istogram.hasClass('hide')){
        hideNiceScroll();
        $resumeContainer.css({
          top: 0
        });
        $('html,body').scrollTop($invisibleBlank.offset().top);

        if ($.browser.msie || $.browser.opera){
          $report.removeClass('z-index-3').addClass('z-index-1');
        }

        $istogram.addClass('hide');
        $invisible.delay(300).queue(function(next){
          $invisible.addClass('show');
          next();
        });

        $invisible.delay(500).queue(function(next){
          showNiceScroll();
          $('html,body').scrollTop($invisibleBlank.offset().top + 1);
          $(window).on('scrollForZoom', onScroll);
          next();
        });
      }
    }else if (scrollTop < $invisibleBlank.offset().top){
      if ($invisible.hasClass('show')){
        $(window).off('scrollForZoom');

        if ($.browser.msie || $.browser.opera){
          $report.removeClass('z-index-1').addClass('z-index-3');
        }

        $invisible.removeClass('show');
        $istogram.delay(300).queue(function(next){
          $istogram.removeClass('hide');
          next();
        });
      }
    }
  });

});
