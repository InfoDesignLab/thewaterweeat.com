$(window).on('load', function(){
  
  $('#discover .box.grains, #discover .box.hay, #discover .box.cow').css({left: 60});
  
  $loader.find('.load-image').fadeOut('slow');
  
  if ($.browser.msie){
    $loader.find('.obsolete').fadeIn('slow', function(){
      $loader.find('#continue').on('click', function(e){
        e.preventDefault();
      
        $loader.find('p').fadeOut('slow');
        $loader.find('.obsolete').fadeOut('slow', function(){
          $body.removeClass('load');
          setNiceScroll();
    
          $loader.animate({
            height: 0
          }, 1600, 'easeInOutCubic', function(){
            $loader.remove();
          });
        });
      
      });
  
    });
  }else{
    $loader.find('p').fadeOut('slow', function(){
      $body.removeClass('load');
    
      $loader.animate({
        height: 0
      }, 1600, 'easeInOutCubic', function(){
        $loader.remove();
      });
    });    
  }
});