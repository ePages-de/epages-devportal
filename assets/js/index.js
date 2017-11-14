---
---

{% capture signup_form %}{% include components/signup-form.html %}{% endcapture%}

$(document).ready(function() {
// Show the popup when you click on the popup button
$("a.popup").click(function(e){
    e.preventDefault();

    $.magnificPopup.open({
    items: {
        src: "{{ signup_form | strip_newlines | replace: '"', "'" }}",
        type: 'inline'
    },
    callbacks: {
        close: function() {
        cleanForms();
        $('.modal #response-text').hide();
        $('.modal #main-text').show();
        }
    }
    });
});

$(document).on('submit', '#demoshopform-now', function() {
    $('.modal .load-spinner').show();
    $('.modal #main-text').hide();
});

$('#frame--epages-now').on('load', function() {
    $('.modal .load-spinner').hide();
    $('.modal #response-text').show();
});

function cleanForms() {
    $('.form__input').val("");
    $('.form__input').val("");
    $('input[type="checkbox"]').attr('checked', false);
    // Remove yellow color from autocompleted input fields
    if (navigator.userAgent.toLowerCase().indexOf('chrome') >= 0) {
    $('input:-webkit-autofill').each(function(){
        var text = $(this).val();
        var name = $(this).attr('name');
        $(this).after(this.outerHTML).remove();
        $('input[name=" + name + "]').val(text);
    });
    }
}
});