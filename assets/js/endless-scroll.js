$(document).ready(function() {
  loadPosts();

  $(window).scroll(function() {
    if ($(document).height() - $(window).height() == $(window).scrollTop() && !(typeof $('#loading').attr('data-next') === 'undefined')) {
      loadPosts();
    }
  });

  function loadPosts() {
    $('#loading').show();
    $.ajax({
      url: $('#loading').attr('data-next'),
      dataType: 'json',
      success: function(data) {
        var html = '';
        $.each(data.posts, function(index, post) {
          html += '\
            <a href="' + post.url + '" class="card  card--post"> \
              <div class="card--post__header" style="background-image: url(/assets/img/pages/blog/headers/' + post.header_image + '); background-position: center ' + post.header_position + '"> \
                <span class="card--post__category  category--' + post.category + '  category--' + post.category + '--active">' + post.category_name + '</span> \
              </div> \
              <div class="card--post__body"> \
                <h3 class="card--post__title">' + post.title + '</h3> \
                <div class="card--post__footer"> \
                  <p class="card--post__author">' + post.authors + '</p> \
                  <p class="card--post__date">' + post.date + '</p> \
                </div> \
              </div> \
            </a>';
        });
        $('#loading').attr('data-next', data.next_page);
        $('#posts').append(html);
        $('#loading').hide();
      }
    });
  }
});
