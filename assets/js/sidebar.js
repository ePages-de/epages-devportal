$(document).ready(function() {
  var activeLink = $('li.sidebar__link a[href$="' + window.location.pathname + '"]')
  activeLink.parent().addClass('sidebar__link--active');

  activeLink.parent().parent().css('display', 'block');

  $('li.sidebar__button').click(function() {
    if ($(window).width() <= 992 && !$(this).next().is(':visible')){
      $(this).siblings('.sidebar__section').slideUp();
      $(this).siblings('.sidebar__button').find('.sidebar__arrow').removeClass('fa-caret-up').addClass('fa-caret-down');
      $(this).find('.sidebar__arrow').removeClass('fa-caret-down').addClass('fa-caret-up');
      $(this).next().slideToggle();
    }
  })
});
