$(document).ready(function() {

  $(window).scroll(function() {
    navbarScroll();
  });

  $('.navigation__button').click(function() {
    $('.navigation__background').show();
    $('.navigation').addClass('navigation--open');
    $(document.documentElement).css('overflow-y', 'hidden');

    $('.navigation__background').click(function() {
      hideMobileNavigation();
    });
  });

  function navbarScroll() {
    var vh = $('.header').outerHeight() / 4;

    if ($(window).scrollTop() < vh) {
      $('body > .navbar').removeClass('navbar--white').addClass('navbar--transparent');
      $('body > .navbar .navbar-wrapper a .logo').attr('src', '/assets/img/logo_developer_portal_white.svg');
      $('body > .navbar .navbar-wrapper .navigation__button img').attr('src', '/assets/img/icons/menu_white.svg');
    } else {
      $('body > .navbar').removeClass('navbar--transparent').addClass('navbar--white');
      $('body > .navbar .navbar-wrapper a .logo').attr('src', '/assets/img/logo_developer_portal_4c.svg');
      $('body > .navbar .navbar-wrapper .navigation__button img').attr('src', '/assets/img/icons/menu_gray.svg');
    }
  }

  function hideMobileNavigation() {
    $('.navigation__background').hide();
    $('.navigation').removeClass('navigation--open');
    $(document.documentElement).css('overflow-y', 'auto');
  }
});
