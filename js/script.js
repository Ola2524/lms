$(document).ready(function () {
    // Loader
    $('.loader').fadeOut()

    // WOW plugin

    new WOW().init();

    // niceScroll
    // $("html").niceScroll({ cursorwidth: '10px', autohidemode: false, zindex: 999999, cursorcolor: '#4175FC', cursorborder: 'none', cursorborderradius: '2px' });

    // Setting box
    $('.setting-btn').click(function (e) {
        e.stopPropagation();

        $('.setting-btn i').toggleClass('fa-spin');
        $('.settings').toggleClass('open');
    });

    $('.settings').click(function (e) {
        e.stopPropagation();
    })

    $(document).click(function (e) {
        if ($('.settings').hasClass('open')) {
            if (e.target != $('.setting-btn') || e.target != $('.settings')) {
                $('.setting-btn i').toggleClass('fa-spin');
                $('.settings').toggleClass('open');               
            }
        }
    })

    // Choose Color
    const mainColor = localStorage.getItem('mainColor')
    const hoverColor = localStorage.getItem('hoverColor')

    if (mainColor !== null) {
        document.documentElement.style.setProperty('--main-color', mainColor);
        document.documentElement.style.setProperty('--hover-color', hoverColor);

        $('.colors li').filter(function () {
            return $(this).data("color") === mainColor;
        }).addClass('active').siblings().removeClass('active');
    }

    $('.colors li').click(function () {
        document.documentElement.style.setProperty('--main-color', $(this).data('color'));
        document.documentElement.style.setProperty('--hover-color', $(this).data('hover'));

        $(this).addClass('active').siblings().removeClass('active');

        localStorage.setItem('mainColor', $(this).data('color'));
        localStorage.setItem('hoverColor', $(this).data('hover'));
    })

    // About image change color

    $('.about-img').on('load', function () {
        let svgDoc = this.contentDocument;

        $(svgDoc).find('polygon').css('fill', mainColor);

        let path = $(svgDoc).find('path');

        path.each(function () {
            if ($(this).css('fill') == 'rgb(108, 99, 255)' || $(this).css('fill') == '#6c63ff') {
                $(this).css('fill', mainColor);
            }
        });
    });

    // About image change color on click

    $('.about-img').each(function () {
        let svgDoc = this.contentDocument;
        let path = $(svgDoc).find('path');

        $('.colors li').click(function () {
            let this_color = $(this);
            path.each(function () {
                let this_path = $(this);
                $('.colors li').each(function () {
                    if (this_path.css('fill') == $(this).data('color') || this_path.css('fill') == 'rgb(108, 99, 255)') {
                        this_path.css('fill', this_color.data('color'));
                    }
                });
            });

            $(svgDoc).find('polygon').css('fill', $(this).data('color'));

        })
    });

    // Navbar Elevater

    $(window).on('scroll', function () {
        $(document).scrollTop() >= $('nav').height() ? $('nav').css('boxShadow', '0 4px 8px rgba(0, 0, 0, 0.3)') : $('nav').css('boxShadow', 'none');
    });

    // mixitup
    mixitup('.courses-cards');

    $('.courses-nav li').click(function () {
        $(this).addClass('active').siblings().removeClass();
    });

});


// Gsap
gsap.registerPlugin('ScrollTrigger');

// ScrollTrigger.create({
//     markers: true,
//     start: 'top 6%',
//     trigger: ".banner",
//     toggleClass: { targets: "nav", className: "nav-scroll" },

// });

gsap.to(".about-img", {
    x: -600,
    duration: 8,
    scrollTrigger: {
        trigger: ".about-img",
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
        toggelAction: "restart none none none"
    }
});

gsap.to(".about-content", {
    x: 800,
    duration: 8,
    scrollTrigger: {
        trigger: ".about-content",
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
        toggelAction: "restart none none none"
    }
});