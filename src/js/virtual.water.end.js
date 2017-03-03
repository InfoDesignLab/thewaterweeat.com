$(document).ready(function(){
  
  var $suggestion = $('#the-end .suggestion');
  var $notForget = $('#the-end .not-forget');
  var $diet = $('#the-end .diet');
  
  $(window).on('scroll', function(){
    
    var scrollTop = $(window).scrollTop();
    
    $suggestion.each(function(index){
      
      var $suggest = $(this);
      
      if (scrollTop >= $suggest.offset().top - ($(window).height()/2) && !$suggest.hasClass('show')){
        
        $suggest.addClass('show');
        
        $suggest.find('.icon .bg').animate({
          width: $suggest.find('.icon').width(),
          height: $suggest.find('.icon').height(),
          marginTop: -1*($suggest.find('.icon').height()/2),
          marginLeft: -1*($suggest.find('.icon').width()/2)
        },'slow', 'easeInOutExpo', function(){
          $suggest.find('.icon .image').animate({
            marginTop: 0
          },600, 'easeOutExpo',function(){
            $suggest.find('p').animate({
              opacity:1
            },'fast');            
          });
        });        
      }      
    });
        
    if(scrollTop >= $notForget.offset().top - ($(window).height()/2) && !$notForget.hasClass('show')){
      $notForget.addClass('show');
      
      $notForget.find('p').animate({
        opacity:1
      }, 'slow');
      
      $notForget.find('.item .icon .bg').animate({
        width: $notForget.find('.item .icon').width(),
        height: $notForget.find('.item .icon').height(),
        marginTop: -1*($notForget.find('.item .icon').height()/2),
        marginLeft: -1*($notForget.find('.item .icon').width()/2)
      }, 'slow', 'easeInOutExpo', function(){
        
        $notForget.find('.item').each(function(index){
          var $item = $(this);
          
          $item.find('.icon .image').delay(index * 600).animate({
            marginTop: 0
          },'fast', 'easeOutExpo', function(){
            $item.find('.number').animate({
              opacity:1
            }, 'fast');
            $item.find('.text').animate({
              opacity:1
            }, 'fast');           
          });     
        });        
      });      
    }
  });
  
});
