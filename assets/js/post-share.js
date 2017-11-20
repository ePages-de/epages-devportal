$(document).ready(function() {
  $(window).scroll(function() {
    if ($('.post-share').overlaps('.header, .footer').length === 0) {
      $('.post-share').css('opacity', '1');
    } else {
      $('.post-share').css('opacity', '0');
    }
  });
});
