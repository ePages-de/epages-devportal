$(document).ready(function() {

  navbarScroll();

  $(window).scroll(function() {
    navbarScroll();
  });

  function navbarScroll() {
    var vh = 100;

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
