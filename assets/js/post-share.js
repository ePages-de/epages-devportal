$(document).ready(function() {

  togglePostShare();

  $(window).scroll(function() {
    togglePostShare();
  });

  $(window).on('resize', togglePostShare);

  function togglePostShare() {
    if ($('.post-share').overlaps('.header, .footer').length === 0) {
      $('.post-share').css('opacity', '1');
    } else {
      $('.post-share').css('opacity', '0');
    }
  }
});
