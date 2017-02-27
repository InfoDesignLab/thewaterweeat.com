$(document).ready(function(){
  
  var $graphics = $('#graphics');
  var $graph = $graphics.find('.graph');
  
  $window.on('scroll', function(){
    
    if (!$afterIntroBlock.hasClass('hide')){
      var scrollTop = $window.scrollTop();

      if (scrollTop >= $graph.offset().top - $window.height() / 2 && !$graph.hasClass('show')){    
        $graph.addClass('show').find('.item').each(function(i){        
          $(this).delay(i*100).animate({
            opacity:1
          }, 'slow');        
        });      
      }    
    }    
  });
    
  
});


