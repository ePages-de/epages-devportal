$(document).ready(function() {
  loadPosts();

  $(window).scroll(function() {
    var scrollTop = $(document).scrollTop();
    var windowHeight = $(window).height();
    var bodyHeight = $(document).height() - windowHeight;
    var scrollPercentage = (scrollTop / bodyHeight);

    if (scrollPercentage > 0.9 && !(typeof $('#loading').attr('data-next') === 'undefined') && !$.active) {
      loadPosts();
    }
  });

  function loadPosts() {
    $('#loading').show();
    $.ajax({
      url: $('#loading').attr('data-next'),
      dataType: 'json',
      success: function(data) {
        $('#loading').attr('data-next', data.next_page);
        $('#posts').append(data.posts);
        $('#loading').hide();
      }
    });
  }
});
