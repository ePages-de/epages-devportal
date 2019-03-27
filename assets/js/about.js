$(document).ready(function(){
  // Carousel
  $('.js-carousel--about').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  });
  // Lightbox
  $('.js-lightbox__youtube').magnificPopup({
    type:'iframe'
  });

  $('.js-lightbox__image').magnificPopup({
    type:'image'
  });
});
