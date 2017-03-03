$(document).ready(function(){

  var $bottlesContainer = $('#bottles-wall');
  var $bottlesContent = $bottlesContainer.find('.content');
  var $bottlesParagraph = $bottlesContainer.find('.to-show p');
  var $bottlesMetres = $bottlesContainer.find('.label');
  var $solutionParagraph = $('#solution').find('p,h1');


  for (var i = 1; i < 154; i++){
    var $bottlesRowClone = $('.bottles-row:first').clone();
    $bottlesRowClone.appendTo($bottlesContent);
    $bottlesRowClone.find('.value').html('' + (154 - i) * 100);
  }

  $(window).on('scroll', function(){

    var scrollTop = $(window).scrollTop();
    $bottlesParagraph.each(function(){

      var $p = $(this);

      if (scrollTop >= $p.offset().top - $(window).height()/2 && !$p.hasClass('show')){

        $p.addClass('show').animate({
          paddingTop:0,
          opacity:1
        },'slow', 'swing');

      }

    });

    $bottlesMetres.each(function(){
      var $item = $(this);

      if (scrollTop >= $item.offset().top - $(window).height()/2 && !$item.hasClass('show')){

        $item.addClass('show').animate({
          opacity:1
        },'fast', 'swing');

      }

    });


    $solutionParagraph.each(function(){
      var $par = $(this);

      if (scrollTop >= $par.offset().top - ($(window).height()/2 + 350) && !$par.hasClass('show')){
        $par.addClass('show').animate({
          paddingTop: 0,
          opacity:1
        },'slow','swing');

      }

    });

  });
});
