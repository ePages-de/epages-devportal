$(document).ready(function() {

  toggleSearchbar();

  function toggleSearchbar() {
    $('.navigation__search-button').click(function() {
      $('.navigation__search-input').addClass('navigation__search-input--open').focus();
    });
  }

  $(document).mouseup(function(e) {
    var container = $('.navigation__search-input');

    if (!container.is(e.target) && container.has(e.target).length === 0 && !(window.location.href.indexOf('search') !== -1)) {
      container.removeClass('navigation__search-input--open');
    }
  });
});
