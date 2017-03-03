var { setNiceScroll } = require('./virtual.water.init.js')

$(window).on('load', function(){

  $('#discover .box.grains, #discover .box.hay, #discover .box.cow').css({left: 60});

  $('#loader').find('.load-image').fadeOut('slow');

  $('#old-browser-warning').html('<span style="color: #3e4c3e; font-size: 13px;">For a full-animated version use Chrome, Firefox, Safari. You will get a static version on Internet Explorer 9-8-7, Opera, iPad.</span><br/><br/>')

  if ($.browser.msie){
    $('#loader').find('.obsolete').fadeIn('slow', function(){
      $('#loader').find('#continue').on('click', function(e){
        e.preventDefault();

        $('#loader').find('.obsolete').fadeOut('slow', function(){
          $('body').removeClass('load');
          setNiceScroll();

          $('#loader').animate({
            height: 0
          }, 1600, 'easeInOutCubic', function(){
            $('#loader').remove();
          });
        });

      });

    });
  }else{
    $('body').removeClass('load');

    $('#loader').animate({
      height: 0
    }, 1600, 'easeInOutCubic', function(){
      $('#loader').remove();
    });
  }
});
