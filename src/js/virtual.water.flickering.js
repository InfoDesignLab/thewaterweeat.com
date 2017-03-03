$(document).ready(function(){
  var $house = $('#house');
  var $prediscover = $('#pre-discover');

  $(window).on('scroll', function(){

    var scrollTop = $(window).scrollTop();

    if (scrollTop >= ($house.offset().top - $(window).height() - 150) && scrollTop <= ($prediscover.offset().top + 257)){

      $('.flickering').each(function(){
        if (!$(this).hasClass('visible')){
          $(this).addClass('visible');
        }
      });
    }else{
      $('.flickering').each(function(){
        if ($(this).hasClass('visible')){
          $(this).removeClass('visible');
        }
      });
    }

  });

});
