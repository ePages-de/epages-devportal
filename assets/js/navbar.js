$(document).ready(function() {

  navbarScroll();

  $(window).scroll(function() {
    navbarScroll();
  });

  if ($(window).width() <= 768) {
    $('.navigation__link--disabled').click(function() {
      $('svg', this).toggleClass('fa-caret-down').toggleClass('fa-caret-up');
      if ($('svg', this).hasClass('fa-caret-up')) {
        $(this).siblings('.dropdown').slideDown();
      } else {
        $(this).siblings('.dropdown').slideUp();
      }
    });
  }

  function navbarScroll() {
    var vh = 100;

    if ($(window).scrollTop() < vh) {
      $('body > .navbar').removeClass('navbar--dark').addClass('navbar--transparent');
      $('.dropdown').addClass('dropdown--border');
    } else {
      $('body > .navbar').removeClass('navbar--transparent').addClass('navbar--dark');
      $('.dropdown').removeClass('dropdown--border');
    }
  }

  $('.navigation__button').click(function() {
    $('.navigation__background').show();
    $('.navigation').addClass('navigation--open');
    $(document.documentElement).css('overflow-y', 'hidden');

    $('.navigation__background').click(function() {
      hideMobileNavigation();
    });
  });

  function hideMobileNavigation() {
    $('.navigation__background').hide();
    $('.navigation').removeClass('navigation--open');
    $(document.documentElement).css('overflow-y', 'auto');
  }
});
