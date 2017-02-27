$document.ready(function(){
  
  var $prediscover = $('#pre-discover');
  var $discover = $('#discover');
  var $discoverBar = $('#discover-bar');
  var $discoverText = $('#discover .lets-discover');
  var $conceptsItems = $discover.find('.item');  
  var $firstBarItem = $discover.find('.item.bar-item:first');
  var $discoverEnd = $discover.find('.end');
  
  $window.on('resize', function(){
    
    $conceptsItems.each(function(i){        
      var $item = $(this);
        
      if ($item.hasClass('show')){
            
        if ($item.find('.box').length > 0){
          
          var $img = $item.find('.box img');
          var imgWidth = $window.width() > 1024 ? parseInt($img.attr('img-width')) + 80 : $item.find('.box').width() + 80;
          var imgHeight = $window.width() > 1024 ? parseInt($img.attr('img-height')) + 80 : $item.find('.box').height() + 80;

          $img.css({
            width: imgWidth - 80,
            height: imgHeight - 80,
            marginTop: -1 * ((imgHeight - 80) / 2), 
            marginLeft: -1 * ((imgWidth - 80) / 2) 
          });

        }
      }        
    });   
  });
  
  $window.on('scroll', function(){
    
    var scrollTop = $window.scrollTop();
      
    $prediscover.find('p').each(function(){
      var $item = $(this);
      if (scrollTop >= $item.offset().top - (($window.height()/2) + 325) && !$item.hasClass('show')){
        $item.addClass('show').animate({
          paddingTop:0,
          opacity:1
        },'slow', 'swing');
      }
    });
      
    if (scrollTop >= $discoverText.offset().top - (($window.height()/2) + 325) && !$discoverText.hasClass('show')){
      $discoverText.addClass('show').animate({
        opacity:1
      },'slow', 'swing');
    }
      
    
    if (scrollTop >= $discover.offset().top - $window.height()/2 && scrollTop < $discover.offset().top + $discover.height()){
      
      if (scrollTop >= $firstBarItem.offset().top - $window.height()/2 && scrollTop < $discoverEnd.offset().top - $discoverEnd.height()){
        if(!$discoverBar.hasClass('show')){
          $discoverBar.addClass('show').animate({
            top: 0
          }, 'slow', 'easeInOutExpo');
        }
      }else{
        if($discoverBar.hasClass('show')){
          $discoverBar.removeClass('show').animate({
            top: -86
          }, 'slow', 'easeInOutExpo');
        }
      }
      
      $conceptsItems.each(function(i){        
        var $item = $(this);
        var id = $item.attr('id');
        var $barImage = $discoverBar.find('img[alt*=' + id + ']');
        
        if (scrollTop >= $item.offset().top - ($window.height()/3 + 200) && !$item.hasClass('show')){

          $item.addClass('show').find('p').animate({
            paddingTop: 0,
            opacity: 1
          }, 600, function(){
            if ($item.find('.litres').length > 0){
              $item.find('.litres img').animate({
                left:0
              }, 'slow', 'easeInOutExpo');
            }
          });
            
          if ($item.find('.box').length > 0){
            var $img = $item.find('.box img');
            var imgWidth = $window.width() > 1024 ? parseInt($img.attr('img-width')) + 80 : $item.find('.box').width() + 80;
            var imgHeight = $window.width() > 1024 ? parseInt($img.attr('img-height')) + 80 : $item.find('.box').height() + 80;
              
            $img.delay(400).animate({
              width: imgWidth,
              height: imgHeight,
              marginTop: -1 * (imgHeight / 2), 
              marginLeft: -1 * (imgWidth / 2) 
            }, 400, 'easeInExpo', function(){
              $img.animate({
                width: imgWidth - 80,
                height: imgHeight - 80,
                marginTop: -1 * ((imgHeight - 80) / 2), 
                marginLeft: -1 * ((imgWidth - 80) / 2) 
              }, 400)
            });
          }

        }        
        
        if ($barImage.length > 0 && scrollTop >= $item.offset().top){
          if (!$barImage.hasClass('show')){
            $barImage.addClass('show').animate({
              opacity: 1
            });
          } 
        }else{
          if ($barImage.hasClass('show')){
            $barImage.removeClass('show').animate({
              opacity: 0
            });
          } 
        } 
      });      
    }else{
      
      if($discoverBar.hasClass('show')){
        $discoverBar.removeClass('show').animate({
          top: -86
        }, 'slow', 'easeInOutExpo');
      }
      
    }
  });
  
});