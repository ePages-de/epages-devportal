$(document).ready(function() {

  $('.progress').css('top', $('.navbar').outerHeight() + 'px');
  progressShow();

  $(window).scroll(function() {
    progressShow();
    progressbarScroll();
  });

  function progressShow() {
    var vh = 320;

    if ($(window).scrollTop() < vh) {
      $('body > .progress').removeClass('progress--visible').addClass('progress--hidden');
    } else {
      $('body > .progress').removeClass('progress--hidden').addClass('progress--visible');
    }
  }

  function progressbarScroll() {
    var winTop = $(window).scrollTop() - 320,
        navHeight = $('.navbar').height(),
        cardMarginTop = parseInt($('.content-wrapper').css('margin-top')),
        cardMarginBottom = parseInt($('.cross-reading').css('margin-top')),
        cardHeight = $('.card--markdown').outerHeight(),
        docHeight = cardHeight + navHeight + cardMarginTop + cardMarginBottom,
        winHeight = $(window).height();

    var totalScroll = (winTop / (docHeight - winHeight)) * 100;

    $('.progress__bar').css('width', totalScroll+'%');
  }
});
