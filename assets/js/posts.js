$(document).ready(function() {

  wrapAnchorAroundImage();

  function wrapAnchorAroundImage() {
    $('.card--markdown img').each(function(index) {
      $(this).wrap("<a href='" + this.src + "' data-lightbox='image-" + index + "'></a>");
    });
  }
});
