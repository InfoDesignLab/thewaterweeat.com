var { bindInviewEvent } = require('./virtual.water.init.js')

$(document).ready(function(){

  var $house = $('#house');
  var $houseUncoverBlank = $house.find('.uncover-blank');
  var $houseCover = $house.find('.cover');
  var $afterIntroBlock = $('#after-intro');

  bindInviewEvent($house);

  $(window).on('scroll resize', function(){

    if (!$afterIntroBlock.hasClass('hide')){

      var scrollTop = $(window).scrollTop();

      if ($house.hasClass('inview') && scrollTop >= $houseUncoverBlank.offset().top){

        $houseCover.css({
          bottom: scrollTop - $houseUncoverBlank.offset().top
        });
      }else{
        $houseCover.css({
          bottom:0
        });
      }
    }
  });
});
