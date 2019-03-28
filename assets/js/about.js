$(document).ready(function () {
  // Carousel
  $('.js-carousel--about').slick({
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 481,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          adaptiveHeight: true
        }
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true
        }
      }
    ]
  });
});

// Google Maps
var locations = [
  {
    name: 'Barcelona',
    position: new google.maps.LatLng(41.390205, 2.154007),
    type: 'office'
  },
  {
    name: 'Jena',
    position: new google.maps.LatLng(50.929823, 11.596630),
    type: 'office'
  },
  {
    name: 'Hamburg',
    position: new google.maps.LatLng(53.557145, 9.958720),
    type: 'office'
  },
  {
    name: 'Bilbao',
    position: new google.maps.LatLng(43.264634, -2.936826),
    type: 'remote'
  }
];

var descriptions = {
  'Barcelona': '<div class="tooltip">' +
    '<div class="tooltip__image tooltip__image--barcelona"></div>' +
    '<div class="tooltip__text">' +
    '<h4>Barcelona</h4>' +
    '<p>ePages Southern Europe S.L.</p>' +
    '<p>Diagonal 435, 5º - 1ª</p>' +
    '<p>08036 Barcelona</p>' +
    '</div>' +
    '</div>',
  'Jena': '<div class="tooltip">' +
    '<div class="tooltip__image tooltip__image--jena"></div>' +
    '<div class="tooltip__text">' +
    '<h4>Jena</h4>' +
    '<p>ePages GmbH</p>' +
    '<p>Heinrich-Heine-Straße 1</p>' +
    '<p>07743 Jena</p>' +
    '</div>' +
    '</div>',
  'Hamburg': '<div class="tooltip">' +
    '<div class="tooltip__image tooltip__image--hamburg"></div>' +
    '<div class="tooltip__text">' +
    '<h4>Hamburg</h4>' +
    '<p>ePages GmbH</p>' +
    '<p>Pilatuspool 2</p>' +
    '<p>20355 Hamburg</p>' +
    '</div>' +
    '</div>',
  'Bilbao': '<div class="tooltip">' +
    '<div class="tooltip__image tooltip__image--bilbao"></div>' +
    '<div class="tooltip__text">' +
    '<h4>Bilbao</h4>' +
    '<p>ePages Southern Europe S.L.</p>' +
    '<p>Remote work</p>' +
    '</div>' +
    '</div>',
};

var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 4,
  center: new google.maps.LatLng(50.718216, 4.532518),
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  zoomControl: false,
  fullscreenControl: false,
  streetViewControl: false,
  mapTypeControl: false
});

var infowindow = new google.maps.InfoWindow();

var marker, i;

var icons = {
  office: {
    url: "/assets/img/pages/about/office.svg",
    scaledSize: new google.maps.Size(40, 40)
  },
  remote: {
    url: "/assets/img/pages/about/remote.svg",
    scaledSize: new google.maps.Size(40, 40)
  }
};

for (i = 0; i < locations.length; i++) {
  marker = new google.maps.Marker({
    position: locations[i].position,
    map: map,
    icon: icons[locations[i].type]
  });

  google.maps.event.addListener(marker, 'click', (function (marker, i) {
    return function () {
      infowindow.setContent(descriptions[locations[i].name]);
      infowindow.open(map, marker);
    }
  })(marker, i));
}