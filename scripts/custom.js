(function() {

    // Script to activate the boostrap carousel
    $('.carousel').carousel({
        interval: 4000 //changes the speed
    });

    /* Script to active lightGallery slider on the following pages
    * color-cards.html
    * specialitycolor-stains-finishes.html
    * the-art-of-color.html
    */
    $('#light-gallery').lightGallery();


    // Script to show/hide tooltip on hover
    $('.slider-images span').css('display', 'none')
    $('.slider-images').hover(function() {
        $(this).find('span').slideDown('100')
    }, function() {
        $(this).find('span').slideUp('100')
    });

    /* Script to active pgwSlider on the following pages
    * automotive-oem-refinish.html
    * color-solutions.html
    */
    $('.pgwSlideshow').pgwSlideshow({
        autoSlide: true,
        intervalDuration: 4000
    });

    // Script to scroll page to top
    var offset = 220;
    var duration = 500;
    $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
            $('.back-to-top').fadeIn(duration);
        } else {
            $('.back-to-top').fadeOut(duration);
        }
    });

    $('.back-to-top').click(function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, duration);
        return false;
    });

    // Contact Form
    $('#contactForm input,#contactForm textarea').jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // something to have when submit produces an error ?
            // Not decided if I need it yet
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $('input#name').val();
            var phone = $('input#phone').val();
            var email = $('input#email').val();
            var message = $('textarea#message').val();
            var company = $('input#company').val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: './bin/contact_me.php',
                type: 'POST',
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    company: company,
                    message: message
                },
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html('<div class=\'alert alert-success\'>');
                    $('#success > .alert-success').html('<button type=\'button\' class=\'close\' data-dismiss=\'alert\' aria-hidden=\'true\'>&times;')
                        .append('</button>');
                    $('#success > .alert-success')
                        .append('<strong>Your message has been sent. </strong>');
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger('reset');
                },
                error: function() {
                    // Fail message
                    $('#success').html('<div class=\'alert alert-danger\'>');
                    $('#success > .alert-danger').html('<button type=\'button\' class=\'close\' data-dismiss=\'alert\' aria-hidden=\'true\'>&times;')
                        .append('</button>');
                    $('#success > .alert-danger').append('<strong>Sorry ' + firstName + ' it seems that my mail server is not responding...</strong> Could you please email me directly to <a href=\'mailto:me@example.com?Subject=Message_Me from myprogrammingblog.com;>me@example.com</a> ? Sorry for the inconvenience!');
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger('reset');
                },
            })
        },
        filter: function() {
            return $(this).is(':visible');
        }
    });

    // Contact Form on Fundamental Color Tools Page
    $('#contactFormTools input,#contactFormTools textarea').jqBootstrapValidation({
        preventSubmit: true,
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var color = $('input[name="color"]').val();
            var age = $('input[name="age"]').val();
            var industry = $('input[name="industry"]').val();
            var message = $('textarea#message').val();
            $.ajax({
                url: './bin/fundamental_contact.php',
                type: 'POST',
                data: {
                    color: color,
                    age: age,
                    industry: industry,
                    message: message
                },
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html('<div class=\'alert alert-success\'>');
                    $('#success > .alert-success').html('<button type=\'button\' class=\'close\' data-dismiss=\'alert\' aria-hidden=\'true\'>&times;')
                        .append('</button>');
                    $('#success > .alert-success')
                        .append('<strong>Your message has been sent. Thank You for your feedback. </strong>');
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactFormTools').trigger('reset');
                },
                error: function() {
                    // Fail message
                    $('#success').html('<div class=\'alert alert-danger\'>');
                    $('#success > .alert-danger').html('<button type=\'button\' class=\'close\' data-dismiss=\'alert\' aria-hidden=\'true\'>&times;')
                        .append('</button>');
                    // $('#success > .alert-danger').append('<strong>Sorry it seems that my mail server is not responding...</strong>');
                    $('#success > .alert-danger').append('<strong>Sorry it seems that my mail server is not responding...</strong> Could you please email me directly to <a href=\'mailto:me@example.com?Subject=Message_Me from myprogrammingblog.com;>me@example.com</a> ? Sorry for the inconvenience!');
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactFormTools').trigger('reset');
                },
            })
        },
        filter: function() {
            return $(this).is(':visible');
        }
    });

    $('a[data-toggle="tab"]').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
    });

    // When clicking on Full hide fail/success boxes
    $('#name,input[name="color"]').focus(function() {
        $('#success').html('');
    });


    