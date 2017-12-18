---
---

// {% capture signup_html %}{% include components/signup-form.html %}{% endcapture%}

// $(document).ready(function() {
//   // Show the popup when you click on the popup button
//   $('a[href="#signup"]').click(function(e) {
//     e.preventDefault();
//     openPopup();
//   });

//   // Show the popup when coming from /#register.html
//   if (window.location.hash === '#register.html') {
//     openPopup();
//   }

//   $.magnificPopup.instance.close = function () {
//     if (!$('.load-spinner').is(':visible')) {
//       $.magnificPopup.proto.close.call(this);
//       cleanForms();
//       $('.modal #response-text').hide();
//       $('.modal #main-text').show();
//     }
//   };

//   $(document).on('submit', '#demoshopform-now', function() {
//     $('.modal .load-spinner').show();
//     $('.modal #main-text').hide();
//   });

//   $('#frame--epages-now').on('load', function() {
//     $('.modal .load-spinner').hide();
//     $('.modal #response-text').show();
//   });

//   function cleanForms() {
//     $('.form__input').val("");
//     $('.form__input').val("");
//     $('input[type="checkbox"]').attr('checked', false);
//     if (navigator.userAgent.toLowerCase().indexOf('chrome') >= 0) {
//       $('input:-webkit-autofill').each(function() {
//         var text = $(this).val();
//         var name = $(this).attr('name');
//         $(this).after(this.outerHTML).remove();
//         $('input[name=" + name + "]').val(text);
//       });
//     }
//   }

//   function openPopup() {
//     $.magnificPopup.open({
//       items: {
//         src: "{{ signup_html | strip_newlines | replace: '"', "'" }}",
//         type: 'inline'
//       }
//     });
//   }
// });

$(document).ready(function(){
  $('.carousel').slick({
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 2,
    prevArrow: $('.prev'),
    nextArrow: $('.next'),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
});
