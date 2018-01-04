$(document).ready(function(){
  $('.carousel').slick({
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 2,
    prevArrow: $('.prev'),
    nextArrow: $('.next'),
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
});
