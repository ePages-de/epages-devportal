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
            <div class="card  card--post"> \
              <a class="card--post__post-link" href="' + post.url + '"> \
                <div class="card--post__header" style="background-image: url(/assets/img/pages/blog/headers/' + post.header_image + '); background-position: center ' + post.header_position + '"></div> \
                <div class="card--post__body"> \
                  <h3 class="card--post__title">' + post.title + '</h3> \
                  <div class="card--post__footer"> \
                    <p class="card--post__author">' + post.authors + '</p> \
                    <p class="card--post__date">' + new Date(post.date).toString("MMM d, yyyy") + '</p> \
                  </div> \
                </div> \
              </a> \
              <a href="/blog/' + post.category + '" class="card--post__category  card--post__category--' + post.category + '">' + post.category_name + '</a> \
            </div>';
        });
        $('#loading').attr('data-next', data.next_page);
        $('#posts').append(html);
        $('#loading').hide();
      }
    });
  }
});
