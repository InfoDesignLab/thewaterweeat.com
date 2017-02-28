/*INIT*/

$window.on('load', function(){
  if (!$.browser.webkit){
    $loader.find('p').fadeOut();
  }

  if ($.browser.opera){
    $('.wave, .wave-top, .wave-bottom').css({'-o-animation': 'none', 'background-position' : '0px 0px'});
  }

  $loader.find('.load-image').fadeOut('slow', function(){
    $body.removeClass('load');
    setNiceScroll();

    $loader.animate({
      height: 0
    }, 1600, 'easeInOutCubic', function(){
      $loader.remove();
    });
  });
});

$document.ready(function(){

  var totalDropRows = 3520 / 40;

  var $intro = $('#intro');
  var $dropRows = null;
  var $dropsContainer = $('.drops-container');
  var $dropsParagraph = $('.drops-paragraph');
  var $dropsCounter = $('.drops-counter');
  var $dropsWall = $('#drops-wall');
  var endShow = false;
  var x = 0;

  if($.browser.msie || $.browser.opera){
    $dropsCounter.find('h1').css({
      top: -85,
      color: '#00aced',
      opacity:0
    });
  }

  function createDropsGrid(){
    var $rowToClone = $('.drops-row').clone();

    for (var i = 1; i < totalDropRows; i++){
      var $clone = $rowToClone.clone();
      $clone.find('.litre span').html(40 * (i + 1));
      $dropsContainer.append($clone);
    }

    $dropRows = $('.drops-row');
    $window.bind('scroll', onIntroScrollEvent);
  }

  function showDropsCounter(){

    var $counterContainer = $dropsCounter.find('.counter');
    var $counter = $counterContainer.find('.count');
    var $words = $counterContainer.children('span');
    var counterIndex = $words.index($counter);
    var value = 0;

    $counterContainer.addClass('drop-animation');

    if($.browser.msie || $.browser.opera){
      $('.drops-paragraph .wave').css({backgroundPosition:'-210px 0px'});
    }

    for (var i = 0; i < counterIndex + 1; i++){
      var word = $words[i];

      if($.browser.msie){
        $(word).delay(i*200).animate({
          opacity:1
        });
      }else{
        $(word).delay(i*200).queue(function(next){
          $(this).addClass('show');
          next();
        });
      }
    }

    $counter.html($counter.html().replace(/(\d+)/, '<span class="show number">$1</span>'));
    var $number = $counter.find('.number')

    $counter.delay(counterIndex * 200).animate({
      'val' : 3496
    }, {
      duration: 1200,
      step: function(now, fx){

        var floor = Math.floor(now);
        var value = floor.toString();

        if (value > 999){
          value = value[0] + '<span class="blank-point"></span>' + value.substr(1, value.length);
        }

        $number.html(value);

      },
      complete: function(){
        for (var i = counterIndex + 1; i < $words.length; i++){
          var word = $words[i];

          if($.browser.msie){
            $(word).delay((i - (counterIndex + 1))*200).animate({
              opacity:1
            });
          }else{
            $(word).delay((i - (counterIndex + 1))*200).queue(function(next){
              $(this).addClass('show');
              next();
            });
          }
        }

        setTimeout(function(){

          if($.browser.msie || $.browser.opera){
            $dropsCounter.find('h1').animate({
              opacity:1
            });
          }

          $dropsParagraph.addClass('show').animate({
            marginTop: ($.browser.msie || $.browser.opera) ? -200 : -275
          },1200,'easeInOutCubic');

          $dropsParagraph.find('p').first().animate({
            paddingTop:0,
            opacity: 1
          });

          $dropsWall.css({
            position: 'relative',
            top: 0
          });

          $htmlBody.scrollTop($dropsCounter.offset().top - 165);
          showNiceScroll();

          $window.on('scroll', function(){
            $dropsParagraph.find('p').each(function(i){
              var $p = $(this);
              if ($p.offset().top <= $window.scrollTop() + ($window.height()/2) + 400 && !$p.hasClass('show')){
                $p.addClass('show').animate({
                  paddingTop:0,
                  opacity: 1
                });
              }
            });

            if ($dropsParagraph.find('.solution').offset().top <= $window.scrollTop() + ($window.height()/2) + 250 && !$dropsParagraph.find('.solution').hasClass('show')){
              $dropsParagraph.find('.solution').addClass('show').animate({
                opacity:1
              });
            }
          });

          $('#house, #stats').css({
            visibility:'visible'
          });


        }, 1000);
      }
    });
  }

  function onIntroScrollEvent(){

    var scrollTop = $window.scrollTop();
    x = $dropsCounter.offset().top - 180

    if (scrollTop >= $dropsContainer.offset().top - ($window.height()/3) && scrollTop < $dropsContainer.offset().top + $dropsContainer.height()){

      $dropRows.each(function(i){

        var $row = $(this);

        if ($row.offset().top <= scrollTop + ($window.height()/3) && !$row.hasClass('show')){
          $row.addClass('show');
          $row.find('.litre').addClass('show');
          $row.find('.blue-bg').addClass('show');

          if($dropRows.index($row) == 0){
            $intro.find('.drop-graph span').addClass('show');
          }else if($dropRows.index($row) == $dropRows.length - 1){
            $row.find('.blue-bg').width(365);
          }
        }
      });
    }

    if (scrollTop >= x && !endShow){
      endShow = true;
      hideNiceScroll();
      $dropsWall.css({
        position: 'fixed',
        top: -1 * 1946,
        left: 0,
        right: 0
      });
      showDropsCounter();
    }
  }

  createDropsGrid();

});
