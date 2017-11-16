$(document).ready(function() {

  $('.arrow-up').click(function() {
    $('html, body').animate({ scrollTop: 0 }, 800, 'swing');
  });

  $(window).scroll(function() {
    if ($(this).scrollTop()>500) {
      $('.arrow-up').fadeIn();
    } else {
      $('.arrow-up').fadeOut();
    }
  });
});