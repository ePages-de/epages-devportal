$(document).ready(function() {

  navbarScroll();

  $(window).scroll(function() {
    navbarScroll();
  });

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
