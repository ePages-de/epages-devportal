(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) {
      var appendString = '';

      for (var i = 0; i < results.length; i++) {
        var item = store[results[i].ref];
        var appendString = appendString + '\
          <div class="card  card--post"> \
            <div class="card--post__header" style="background-image: url(/assets/img/blog/headers/' + item.image + '); background-position: center {{ include.header-position }}"> \
              <a href="/blog/category/' + item.category + '" class="card--post__category">' + item.category + '</a> \
            </div> \
            <a href="' + item.url + '" class="card--post__body"> \
              <h3 class="card--post__title">' + item.title + '</h3> \
              <div class="card--post__footer"> \
                <p class="card--post__author">' + item.authors + '</p> \
                <p class="card--post__date">' + new Date(item.date).format("mmm d, yyyy") + '</p> \
              </div> \
            </a> \
          </div>';
      }

      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<li>No results found</li>';
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  var searchTerm = getQueryVariable('query');

  if (searchTerm) {
    var searchBox = document.getElementById('search-box');
    searchBox.setAttribute("value", searchTerm);
    searchBox.className += ' navigation__search-input--open';

    var idx = lunr(function () {
      this.field('id');
      this.field('title', { boost: 10 });
      this.field('authors');
      this.field('category');
      this.field('content');
    });

    for (var key in window.store) {
      idx.add({
        'id': key,
        'title': window.store[key].title,
        'authors': window.store[key].authors,
        'category': window.store[key].category,
        'content': window.store[key].content
      });

      var results = idx.search(searchTerm);
      displaySearchResults(results, window.store);
    }
  }
})();
