// header shrink-------------------------------------------------------------------
function init() {
    window.addEventListener('scroll', function (e) {
        var distanceY = window.pageYOffset || document.documentElement.scrollTop,
                shrinkOn = 0,
                header = document.querySelector("header");
        if (distanceY > shrinkOn) {
            classie.add(header, "smaller");
        } else {
            if (classie.has(header, "smaller")) {
                classie.remove(header, "smaller");
            }
        }
    });
}
window.onload = init();

 jQuery(document).ready(function(){
                    jQuery(".menuzord-nav").menuzord({
                        align: ""
                    });
                });


$(document).ready(function() {
        $('.popup-with-form').magnificPopup({
          type: 'inline',
          preloader: false,
          focus: '#name',

          // When elemened is focused, some mobile browsers in some cases zoom in
          // It looks not nice, so we disable it:
          callbacks: {
            beforeOpen: function() {
              if($(window).width() < 700) {
                this.st.focus = false;
              } else {
                this.st.focus = '#name';
              }
            }
          }
        });
      });
  
	  $('.gallery').each(function() { // the containers for all your galleries
    $(this).magnificPopup({
        delegate: 'a.zoom', // the selector for gallery item
        type: 'image',
        gallery: {
          enabled:true
        }
    });
});

 
      $(document).ready(function() {
        $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
          disableOn: 00,
          type: 'iframe',
          mainClass: 'mfp-fade',
          removalDelay: 160,
          preloader: false,

          fixedContentPos: false
        });
      });
	$('.slider').owlCarousel({
				loop:true,
				items:1,
				nav:false,
				dots:false,
				autoplay:true,
				autoplaySpeed:800,
				autoplayHoverPause:true
				
			})
			$('.doctor-slide').owlCarousel({
				loop:false,
				items:3,
				margin:30,
				stagePadding:30,
				rewind:true,
				nav:false,
				dots:false,
				autoplay:true,
				autoplaySpeed:800,
				autoplayHoverPause:true,
				responsive:{
					0:{
						items:1
					},
					320:{
						items:2
					},
					992:{
						items:3
					}
				}
				
			})
			$('.testimonial-slide').owlCarousel({
				loop:true,
				items:1,
				nav:false,
				dots:true,
				autoplay:true,
				autoplaySpeed:800,
				autoplayHoverPause:true
				
			})
			      
	  
	  