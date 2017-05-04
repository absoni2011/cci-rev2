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


    // Worldwide location map
    var wmConfig = {
        'default':{
            'landcolor':'#D3D3D3', //land color
            'bordercolor':'#DCDCDC', //borders between countries
            'shadowcolor':'#000000', //shadow color below the points
            'shadowOpacity':'75', //shadow opacity, value, 0-100
            'namesShadowColor':'#666666', //tooltip shadow color
        },
        'points':[
        {
            'shape':'circle',//choose the shape of the pin circle or rectangle
            'hover': '<u><b>COLOR COMMUNICATIONS, INC. | WASHINGTON DC</b></u><br><span style="color:black; background-color:#80B2FF;">Sales Offices<br>Phone:(800) 458-5743</span>',//the content of the hover popup
            'pos_X':146,//location of the pin on X axis
            'pos_Y':107,//location of the pin on Y axis
            'diameter':7,
            'outline':'#F5F5F5',//outline color of the pin
            'thickness':0,//thickness of the line (0 to hide the line)
            'upcolor':'#1975FF',//color of the pin when map loads
            'overcolor':'#80B2FF',//color of the pin when mouse hover
            'downcolor':'#80B2FF',//color of the pin when clicked 
            //(trick, if you make this pin un-clickable > make the overcolor and downcolor the same)
            'url':'http://www.ccicolor.com',//URL of this pin
            'target':'_blank',//'_blank' opens URL in new window//'_self' opens URL in the same window //'none' pin is not clickable
            'enable':true,//true/false to enable/disable this pin
        },
        {
            'shape':'circle',
            'hover': '<u><b>COLOR COMMUNICATIONS, INC.| BUFFALO, NY</b></u><br><span style="color:black; background-color:#E680CC;">Sales Offices<br>Phone:(800) 458-5743</span>',
            'pos_X':145.6,
            'pos_Y':96.8,
            'diameter':7,
            'outline':'#F5F5F5',
            'thickness':0,
            'upcolor':'#D119A3',
            'overcolor':'#E680CC',
            'downcolor':'#E680CC',
            'url':'http://www.ccicolor.com',
            'target':'_blank',
            'enable':true,
        },
        {
            'shape':'circle',
            'hover': '<b> COLOR COMMUNICATIONS, INC. ERIE | CASTLEREA, IRELAND </b></u><br><span style="color:black; background-color:#FFE066;"<b></b>Full Production & Manufacturing Facilities<br>Phone: +353 94 96 21000</span>',
            'pos_X':287,
            'pos_Y':73,
            'diameter':7,
            'outline':'#F5F5F5',
            'thickness':0,
            'upcolor':'#FFE066',
            'overcolor':'#FFFFB2',
            'downcolor':'#FFFFB2',
            'url':'cci-europe.html',
            'target':'_blank',
            'enable':true,
        },
        {
        'shape':'circle',
            'hover': '<b> COLOR COMMUNICATIONS, INC. AUSTRALASIA | AUCKLAND, NEW ZEALAND </b></u><br><span style="color:black; background-color:#B280FF;"<b></b>Full Production & Manufacturing Facilities<br>Phone: +64 9 274 6027</span>',
            'pos_X':649,
            'pos_Y':291,
            'diameter':7,
            'outline':'#F5F5F5',
            'thickness':0,
            'upcolor':'#7519FF',
            'overcolor':'#B280FF',
            'downcolor':'#B280FF',
            'url':'http://www.ccia.co.nz/',
            'target':'_blank',
            'enable':true,
        },
        {
        'shape':'circle',
            'hover': '<b> COLOR COMMUNICATIONS, INC. NORTH AMERICA | CHICAGO, IL </b></u><br><span style="color:black; background-color:#FFA366;"<b></b>North America Headquarters<br>Phone:(800) 458-5743 </span>',
            'pos_X':127,
            'pos_Y':97,
            'diameter':7,
            'outline':'F5F5F5',
            'thickness':0,
            'upcolor':'#FF6600',
            'overcolor':'#FFC299',
            'downcolor':'#FFC299',
            'url':'http://www.ccicolor.com/',
            'target':'_blank',
            'enable':true,
        },
        {
        'shape':'circle',
            'hover': '<u><b>COLOR COMMUNICATIONS, INC.| CLEVELAND, OH</b></u><br><span style="color:black; background-color:#00FF99;">Sales Offices<br>Phone:(800) 458-5743</span>',
            'pos_X':138,
            'pos_Y':100,
            'diameter':7,
            'outline':'#00FF99',
            'thickness':0,
            'upcolor':'#00FF99',
            'overcolor':'#99FFCC',
            'downcolor':'#99FFCC',
            'url':'http://www.ccicolor.com',
            'target':'_blank',
            'enable':true,
        },
        {
            'shape':'circle',
            'hover': '<b> COLOR COMMUNICATIONS, INC. EUROPE AND UK | THE NETHERLANDS </b></u><br><span style="color:black; background-color:#99EBED;"<b></b>Full Production & Manufacturing Facilities<br>Phone: +31 650 50 29 25</span>',
            'pos_X':303,
            'pos_Y':81,
            'diameter':7,
            'outline':'#00CED1',
            'thickness':0,
            'upcolor':'#00CED1',
            'overcolor':'#99EBED',
            'downcolor':'#99EBED',
            'url':'cci-europe.html',
            'target':'_blank',
            'enable':true,
        },
        {
            'shape':'circle',
            'hover': '<b> COLOR COMMUNICATIONS, INC. | INDIA </b></u><br><span style="color:black; background-color:#A30000;"<b></b>Full Production & Manufacturing Facilities<br>Phone: +64 9 274 6027</span>',
            'pos_X':460,
            'pos_Y':141,
            'diameter':7,
            'outline':'#A30000',
            'thickness':0,
            'upcolor':'#A30000',
            'overcolor':'#E68080',
            'downcolor':'#E68080',
            'url':'cci-australasia.html',
            'target':'_blank',
            'enable':true,
        }
        ]
    }

    //land's color and border color
    if($('#land').find('path').eq(0).attr('fill') != 'undefined'){
        $('#land').find('path').attr({'fill':wmConfig['default']['landcolor']}).css({'stroke':wmConfig['default']['bordercolor']});
    }
    if($('#islands').find('line').eq(0).attr('fill') != 'undefined'){
        $('#islands').find('line').attr({'fill':wmConfig['default']['landcolor']}).css({'stroke':wmConfig['default']['bordercolor']});
    }

    //configuration for title text's shadow
    $('.tip').css({
        'box-shadow':'1px 2px 4px '+wmConfig['default']['namesShadowColor'],
        '-moz-box-shadow':'2px 3px 6px '+wmConfig['default']['namesShadowColor'],
        '-webkit-box-shadow':'2px 3px 6px '+wmConfig['default']['namesShadowColor'],
    });

    //configuration for map shadow
    if($('#shadow').find('path').eq(0).attr('fill') != 'undefined'){
        var shadowOpacity = wmConfig['default']['shadowOpacity'];
        var shadowOpacity = parseInt(shadowOpacity);
        if (shadowOpacity >=100){shadowOpacity = 1;}else if(shadowOpacity <=0){shadowOpacity =0;}else{shadowOpacity = shadowOpacity/100;}

        $('#shadow').find('path').attr({'fill':wmConfig['default']['shadowcolor']}).css({'fill-opacity':shadowOpacity})
    };


    var points_len = wmConfig['points'].length;
    if( points_len > 0){
        var xmlns = 'http://www.w3.org/2000/svg';
        var tsvg_obj = document.getElementById('map_points');
        var svg_circle,svg_rect;
        for(var i=0;i<points_len;i++){
            if (wmConfig['points'][i]['shape']=='circle'){
                svg_circle = document.createElementNS(xmlns, 'circle');
                svg_circle.setAttributeNS(null, 'cx', wmConfig['points'][i]['pos_X']+1);
                svg_circle.setAttributeNS(null, 'cy', wmConfig['points'][i]['pos_Y']+1);
                svg_circle.setAttributeNS(null, 'r', wmConfig['points'][i]['diameter']/2);
                svg_circle.setAttributeNS(null, 'fill', wmConfig['default']['shadowcolor']);
                svg_circle.setAttributeNS(null, 'style','fill-opacity:'+shadowOpacity);
                svg_circle.setAttributeNS(null, 'id','map_points_shadow_'+i);
                tsvg_obj.appendChild(svg_circle);
                svg_circle = document.createElementNS(xmlns, 'circle');
                svg_circle.setAttributeNS(null, 'cx', wmConfig['points'][i]['pos_X']);
                svg_circle.setAttributeNS(null, 'cy', wmConfig['points'][i]['pos_Y']);
                svg_circle.setAttributeNS(null, 'r', wmConfig['points'][i]['diameter']/2);
                svg_circle.setAttributeNS(null, 'fill', wmConfig['points'][i]['upcolor']);
                svg_circle.setAttributeNS(null, 'stroke',wmConfig['points'][i]['outline']);
                svg_circle.setAttributeNS(null, 'stroke-width',wmConfig['points'][i]['thickness']);
                svg_circle.setAttributeNS(null, 'id','map_points_'+i);
                tsvg_obj.appendChild(svg_circle);
                dynamicAddEvent(i);
            }
            else if(wmConfig['points'][i]['shape']=='rectangle'){
                svg_rect = document.createElementNS(xmlns, 'rect');
                svg_rect.setAttributeNS(null, 'x', wmConfig['points'][i]['pos_X']- wmConfig['points'][i]['width']/2+1);
                svg_rect.setAttributeNS(null, 'y', wmConfig['points'][i]['pos_Y']- wmConfig['points'][i]['height']/2+1);
                svg_rect.setAttributeNS(null, 'width', wmConfig['points'][i]['width']);
                svg_rect.setAttributeNS(null, 'height', wmConfig['points'][i]['height']);
                svg_rect.setAttributeNS(null, 'fill', wmConfig['default']['shadowcolor']);
                svg_rect.setAttributeNS(null, 'style','fill-opacity:'+shadowOpacity);
                svg_rect.setAttributeNS(null, 'id','map_points_shadow_'+i);
                tsvg_obj.appendChild(svg_rect);
                svg_rect = document.createElementNS(xmlns, 'rect');
                svg_rect.setAttributeNS(null, 'x', wmConfig['points'][i]['pos_X']- wmConfig['points'][i]['width']/2);
                svg_rect.setAttributeNS(null, 'y', wmConfig['points'][i]['pos_Y']- wmConfig['points'][i]['height']/2);
                svg_rect.setAttributeNS(null, 'width', wmConfig['points'][i]['width']);
                svg_rect.setAttributeNS(null, 'height', wmConfig['points'][i]['height']);
                svg_rect.setAttributeNS(null, 'fill', wmConfig['points'][i]['upcolor']);
                svg_rect.setAttributeNS(null, 'stroke',wmConfig['points'][i]['outline']);
                svg_rect.setAttributeNS(null, 'stroke-width',wmConfig['points'][i]['thickness']);
                svg_rect.setAttributeNS(null, 'id','map_points_'+i);
                tsvg_obj.appendChild(svg_rect);
                dynamicAddEvent(i);
            }
        }
    }

    function dynamicAddEvent(id){
        var obj = $('#map_points_'+id);
        
        if(wmConfig['points'][id]['enable'] == true){
            obj.attr({'cursor':'pointer'});
            obj.hover(function(){
                $('#tip').show().html(wmConfig['points'][id]['hover']);
                obj.css({'fill':wmConfig['points'][id]['overcolor']})
            },function(){
                $('#tip').hide();
                obj.css({'fill':wmConfig['points'][id]['upcolor']});
            });
            //clicking effect
            obj.mousedown(function(){
                obj.css({'fill':wmConfig['points'][id]['downcolor']});
            });
            obj.mouseup(function(){
                obj.css({'fill':wmConfig['points'][id]['overcolor']});
                if(wmConfig['points'][id]['target'] == '_blank'){
                    window.open(wmConfig['points'][id]['url']); 
                }else if(wmConfig['points'][id]['target'] == '_self'){
                    window.location.href=wmConfig['points'][id]['url'];
                }else{
                }
            });
            obj.mousemove(function(e){
                var x=e.pageX+10, y=e.pageY+15;
                var tipw=$('#tip').outerWidth(), tiph=$('#tip').outerHeight(), 
                x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
                y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
                $('#tip').css({left:x, top:y})
            });
        };
    };
    
})();


