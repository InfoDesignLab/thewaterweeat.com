function setNiceScroll(){

  if ($.browser.msie && $.browser.version < 8){
    return;
  }

  var conf = {
    cursorcolor: '#009ad5',
    cursorborder: '0px',
    cursoropacitymin: '0.5',
    cursoropacitymax: '1',
    cursorwidth: '8px',
    railoffset: true
  }

  if ($.browser.msie){
    conf['mousescrollstep'] = 20;
  }

  if ($.browser.webkit){
    conf['mousescrollstep'] = 15;
  }

  if($.browser.mozilla){
    conf['mousescrollstep'] = 15;
  }

  if($.browser.opera){
    conf['scrollspeed'] = 1000;
    conf['mousescrollstep'] = 0.5;
  }

  $('body').niceScroll(conf);
}

function removeNiceScroll(){
  $('body').getNiceScroll().remove();
}

function showNiceScroll(){
  $('body').getNiceScroll().show();
}

function hideNiceScroll(){
  $('body').getNiceScroll().hide();
}

function bindInviewEvent($el){
  $el.bind('inview', function (event, visible) {
    if (visible) {
      $(this).addClass("inview");
    } else {
      $(this).removeClass("inview");
    }
  });
}

function unbindInviewEvent($el){
  $el.unbind('inview');
}

module.exports = {
  setNiceScroll,
  removeNiceScroll,
  showNiceScroll,
  hideNiceScroll,
  bindInviewEvent,
  unbindInviewEvent,
}
