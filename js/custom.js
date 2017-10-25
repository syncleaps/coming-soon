$(window).on('load', function() {
	"use strict";
    $('.loading').fadeOut(1000);
    $('#loader').delay(350).fadeOut('slow');
});

$(function(){    
	"use strict";
    
    // Countdown
    if ($("#counter")[0]) {
        $('#counter').downCount({
            date: '11/03/2017 12:00:00', // Update date here with your lauching date
            offset: +10
        });
    }
    
    // Slider
    if ($("#slider")[0]) {
        $('#slider').carousel();
    }
    
    // Menu icon
    $("#menu .hamburger a").on('click',function(){
		$(this).toggleClass("close-icon");
		$("#menu").toggleClass("open-menu");
	});
    
    // Scroll bar
    var setScrollBar = function(){
        if($(window).width() > 1000){
            if ($(".scroll-bar-white")[0]) {
                $(".scroll-bar-white").niceScroll({
                    cursorcolor:"#fff"
                });
            }
            if ($(".scroll-bar-black")[0]) {
                $(".scroll-bar-black").niceScroll({
                    cursorcolor:"#111312"
                });
            }
        }
    };
    setScrollBar();
    
    // Scroll bar
    if ($("#snow")[0]) {
        $.letItSnow('#snow', {
            stickyFlakes: 'lis-flake--js',
            makeFlakes: true,
            sticky: true
        });
    }
    
    // Water ripples effect
    if ($(".back-image-ripple")[0]) {
        $('.back-image-ripple').ripples({
            resolution: 512,
            dropRadius: 20, //px
            perturbance: 0.04
        });
        setInterval(function() {
            var $el = $('.back-image-ripple');
            var x = Math.random() * $el.outerWidth();
            var y = Math.random() * $el.outerHeight();
            var dropRadius = 20;
            var strength = 0.04 + Math.random() * 0.04;

            $el.ripples('drop', x, y, dropRadius, strength);
        }, 10000);
    }
});

// Gradient ganretor
(function($) {
    "use strict";
    var colors = new Array(
        [62,35,255],
        [255,35,98],
        [45,175,230],
        [255,128,0]);
    
    var step = 0;
    //color table indices for: 
    // current color left
    // next color left
    // current color right
    // next color right
    var colorIndices = [0,1,2,3];

    //transition speed
    var gradientSpeed = 0.002;

    function updateGradient(){
        if ( $===undefined ) {
			return;
		}

        var c0_0 = colors[colorIndices[0]];
        var c0_1 = colors[colorIndices[1]];
        var c1_0 = colors[colorIndices[2]];
        var c1_1 = colors[colorIndices[3]];

        var istep = 1 - step;
        var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
        var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
        var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
        var color1 = "rgb("+r1+","+g1+","+b1+")";

        var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
        var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
        var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
        var color2 = "rgb("+r2+","+g2+","+b2+")";

        $('.gradient').css({
            background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"
        }).css({
            background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"
        });

        step += gradientSpeed;
        if ( step >= 1 ){
            step %= 1;
            colorIndices[0] = colorIndices[1];
            colorIndices[2] = colorIndices[3];

            //pick two new target color indices
            //do not pick the same as the current one
            colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
            colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
        }
    }
    setInterval(updateGradient,10);
})(jQuery);

// Tabs
(function($) {
    "use strict";
    var $items = $('#menu > nav > ul > li');
    var $content = $('#content > li');
    $items.click(function() {
        $items.removeClass('active');
        $(this).addClass('active');
        
        var index = $items.index($(this));
        $content.removeClass('open-tab');
        $content.eq(index).addClass("open-tab");
    }).eq(0).mouseover();
})(jQuery);

// Newsletter
(function($) {
    "use strict";
    $("#subscribe").validate({
        // if valid, post data via AJAX
        submitHandler: function(form) {
            $.post("php/subscribe.php", { email: $("#newsletterEmail").val() }, function(data) {
                $('#response').html(data);
            });
        },

        // all fields are required
        rules: {
            email: {
                required: true,
                email: true
            }
        }
    });
})(jQuery);

// Contact
var url="php/contact.php";
(function($) {
    "use strict";
    $('#contact-frm').submit(function(event) {
        event.preventDefault();
        var name = $('#name').val();
        var email = $('#email').val();
        var msg = $('#msg').val();
        
        var form = $(this);
        $.ajax({
            type: "post",
            url: url,
            data: "name="+name+"&email="+email+"&msg="+msg,
        }).done(function(data) {
            if (data==="true") {
                {
                    $('#success').empty();$('#success').append("Your message has been sent. We'll be in touch with you soon").removeClass('error');
                }
            } 
            else {
                $('#success').empty();$('#success').append("Sending fail, Please try again letter").addClass('error');
            }
        }).fail(function(data) {
            $('#success').append("Sending fail, Please try again letter").addClass('error');
        });
    });
})(jQuery);

$(window).no('resize', function(){
    "use strict";
    setScrollBar();
});