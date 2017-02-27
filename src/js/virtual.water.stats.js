$document.ready(function(){
  
  var $stats = $('#stats');
  var $statsReport = $('#stats .report');
  var $statsBlank = $('#stats-report-blank');
  var $statsProgress = $statsBlank.find('.stats-progress');
  var $statsContainer = $stats.find('.container');
  var $istrogram = $statsContainer.find('.istogram');
  var $graphics = $statsContainer.find('.graphics');
  var $legends = $statsContainer.find('.legends');
  var $water = $graphics.find('.water');
  var $waterBlocks = $water.find('.block');
  var scrollTop = -1
  var start = -1;
  var end = -1
  var progress = 0;
  
  var $firstParagraph = $legends.find('p').first();
  var $lastParagraph = $legends.find('p').last();
  
  if ($.browser.msie || $.browser.opera){
    $statsReport.removeClass('z-index-1').addClass('z-index-3');
  }
  
  $window.on('scroll', function(){
    
    scrollTop = $window.scrollTop();
    start = $stats.offset().top
    end = (start + $stats.height()) + $statsProgress.height() - $statsProgress.children().last().height()/2;

    if (scrollTop >= $stats.offset().top){

      if (!$statsContainer.hasClass('fixed')){
        $statsContainer.addClass('fixed');
        
        if (!$firstParagraph.hasClass('show') && $lastParagraph.hasClass('show')){
          $firstParagraph.addClass('show').animate({left:0}, 500, 'easeInOutCubic');
          $lastParagraph.removeClass('show').animate({left:-300}, 500, 'easeInOutCubic');
        }
      }

      if (scrollTop >= start){

        progress = ((scrollTop - start) / (end - start)) * 100;
        
        if ($firstParagraph.hasClass('show') && !$lastParagraph.hasClass('show')){
          $firstParagraph.removeClass('show').animate({left:-300}, 500, 'easeInOutCubic');
          $lastParagraph.addClass('show').animate({left:0}, 500, 'easeInOutCubic');
        }

        $water.css({
          height: progress + '%'
        });

        if (progress >=55){
          if (!$lastParagraph.hasClass('fadeout')){
            $lastParagraph.addClass('fadeout').animate({
              opacity:0
            },'fast');                       
          }
        }else{
          if ($lastParagraph.hasClass('fadeout')){
            $lastParagraph.removeClass('fadeout').animate({
              opacity: 1
            },'fast');           
          }
        }

        $waterBlocks.each(function(i){

          var $block = $(this);
          var blockStart = parseInt($block.attr('data-perc-start'));
          var blockEnd = parseInt($block.attr('data-perc-end'));
          var blockLabel = $block.attr('data-perc-label') + '%';
          var blockTitle = $block.attr('data-title');

          if (progress > blockStart && progress < blockEnd){ 
            $block.find('span').html(Math.floor(progress - blockStart) + '%');
            
            if (!$legends.find('.labels .' + blockTitle).hasClass('show')){
              $legends.find('.labels .' + blockTitle).addClass('show').animate({left:0}, 500, 'easeInOutCubic');           
            }
            
          }else if(progress >= blockEnd){
            if (!$block.find('.line').hasClass('show')){
              $block.find('.line').addClass('show').animate({
                width:644
              },500,'easeInOutCubic');
            }
            
            $block.find('span').html(blockLabel);   
            
            if (!$legends.find('.labels .' + blockTitle).hasClass('show')){
              $legends.find('.labels .' + blockTitle).addClass('show').animate({left:0}, 500, 'easeInOutCubic');                   
            }
            
          }else if(progress <= blockStart){
            
            if ($legends.find('.labels .' + blockTitle).hasClass('show')){
              $legends.find('.labels .' + blockTitle).removeClass('show').animate({left:350}, 500, 'easeInOutCubic');              
            }
            
            if ($block.find('.line').hasClass('show')){
              $block.find('.line').removeClass('show').animate({
                width:0
              },500,'easeInOutCubic');
            }              
          }              
        });
      }else{
        
        if($legends.find('.labels .label').first().hasClass('show')){
          $legends.find('.labels .label').first().removeClass('show').animate({left:350}, 500, 'easeInOutCubic');
        }
        
        $graphics.find('.water').css({
          height: 0 + '%'
        });
        
        if (!$firstParagraph.hasClass('show') && $lastParagraph.hasClass('show')){
          $firstParagraph.addClass('show').animate({left:0}, 500, 'easeInOutCubic');
          $lastParagraph.removeClass('show').animate({left:-300}, 500, 'easeInOutCubic');
        }
      }
    }else{
      
      if ($statsContainer.hasClass('fixed')){
          $statsContainer.removeClass('fixed');
          $legends.find('.labels .label').removeClass('show').animate({left:350}, 500, 'easeInOutCubic');
          $graphics.find('.water').css({
            height: 0 + '%'
          });

          if (!$firstParagraph.hasClass('show') && $lastParagraph.hasClass('show')){
            $firstParagraph.addClass('show').animate({left:0}, 500, 'easeInOutCubic');
            $lastParagraph.removeClass('show').animate({left:-300}, 500, 'easeInOutCubic');
          }
      }else{
        if (!$firstParagraph.is(':animated') && !$lastParagraph.is(':animated')){
          $firstParagraph.removeClass('fadeout fadein').css({opacity:1, left:0});
          $lastParagraph.removeClass('fadeout fadein').css({opacity:1, left:-300});          
        }
      }
    }
  });
  
});