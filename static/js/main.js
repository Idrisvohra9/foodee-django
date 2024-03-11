;(function () {
	
	'use strict';



	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	var fullHeight = function() {
		if ( !isiPad() && !isiPhone() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			})
		}
		

	};

	var sliderMain = function() {
		
	  	$('#iv-home .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000
	  	});

	  	$('#iv-home .flexslider .slides > li').css('height', $(window).height());	
	  	$(window).resize(function(){
	  		$('#iv-home .flexslider .slides > li').css('height', $(window).height());	
	  	});

	};

	var sliderSayings = function() {
		$('#iv-sayings .flexslider').flexslider({
			animation: "slide",
			slideshowSpeed: 5000,
			directionNav: false,
			controlNav: true,
			smoothHeight: true,
			reverse: true
	  	});
	}

	var offcanvasMenu = function() {
		$('body').prepend('<div id="iv-offcanvas" />');
		$('body').prepend('<a href="#" class="js-iv-nav-toggle iv-nav-toggle"><i></i></a>');

		$('.iv-main-nav .iv-menu-1 a, .iv-main-nav .iv-menu-2 a').each(function(){

			var $this = $(this);

			$('#iv-offcanvas').append($this.clone());

		});
		// $('#iv-offcanvas').append
	};

	var mainMenuSticky = function() {
		
		var sticky = $('.js-sticky');

		sticky.css('height', sticky.height());
		$(window).resize(function(){
			sticky.css('height', sticky.height());
		});

		var $section = $('.iv-main-nav');
		
		$section.waypoint(function(direction) {
		  	
		  	if (direction === 'down') {

			    	$section.css({
			    		'position' : 'fixed',
			    		'top' : 0,
			    		'width' : '100%',
			    		'z-index' : 99999
			    	}).addClass('iv-shadow');;

			}

		}, {
	  		offset: '0px'
		});

		$('.js-sticky').waypoint(function(direction) {
		  	if (direction === 'up') {
		    	$section.attr('style', '').removeClass('iv-shadow');
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 69; }
		});

	};
	
	// Parallax
	var parallax = function() {

		$(window).stellar();

	};


	// Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-iv-nav-toggle', function(event){

			var $this = $(this);

			$('body').toggleClass('iv-overflow offcanvas-visible');
			$this.toggleClass('active');
			event.preventDefault();

		});

	};

	var scrolledWindow = function() {

		$(window).scroll(function(){

			var scrollPos = $(this).scrollTop();


			$('#iv-home .iv-text').css({
		      'opacity' : 1-(scrollPos/300),
		      'margin-top' : (-212) + (scrollPos/1)
		   });

		   $('#iv-home .flexslider .iv-overlay').css({
				'opacity' : (.5)+(scrollPos/2000)
		   });

		   if (scrollPos > 300) {
				$('#iv-home .iv-text').css('display', 'none');
			} else {
				$('#iv-home .iv-text').css('display', 'block');
			}
		   

		});

		$(window).resize(function() {
			if ( $('body').hasClass('offcanvas-visible') ) {
		   	$('body').removeClass('offcanvas-visible');
		   	$('.js-iv-nav-toggle').removeClass('active');
		   }
		});
		
	};


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500);
			
			return false;
		});
	
	};


	// Page Nav
	var clickMenu = function() {
		var topVal = ( $(window).width() < 769 ) ? 0 : 58;

		$(window).resize(function(){
			topVal = ( $(window).width() < 769 ) ? 0 : 58;		
		});
		$('.iv-main-nav a:not([class="external"]), #iv-offcanvas a:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section');

				if ( $('div[data-section="' + section + '"]').length ) {

					$('html, body').animate({
			        	scrollTop: $('div[data-section="' + section + '"]').offset().top - topVal
			    	}, 500);	
			    	
			   }

		    event.preventDefault();

		    // return false;
		});


	};

	// Reflect scrolling in navigation
	var navActive = function(section) {
		
		$('.iv-main-nav a[data-nav-section], #iv-offcanvas a[data-nav-section]').removeClass('active');
		$('.iv-main-nav, #iv-offcanvas').find('a[data-nav-section="'+section+'"]').addClass('active');
		
	};

	var navigationSection = function() {

		var $section = $('div[data-section]');
		
		$section.waypoint(function(direction) {
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}

		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};


	// Animations
	var homeAnimate = function() {
		if ( $('#iv-home').length > 0 ) {	

			$('#iv-home').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						$('#iv-home .to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 200);

					
					$(this.element).addClass('animated');
						
				}
			} , { offset: '80%' } );

		}
	};



	var aboutAnimate = function() {
		var about = $('#iv-about');
		if ( about.length > 0 ) {	

			about.waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						about.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 200);

					setTimeout(function() {
						about.find('.to-animate-2').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeIn animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 200);

					

					$(this.element).addClass('animated');
						
				}
			} , { offset: '80%' } );

		}
	};

	var sayingsAnimate = function() {
		var sayings = $('#iv-sayings');
		if ( sayings.length > 0 ) {	

			sayings.waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						sayings.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 200);


					$(this.element).addClass('animated');
						
				}
			} , { offset: '80%' } );

		}
	};

	var featureAnimate = function() {
		var feature = $('#iv-featured');
		if ( feature.length > 0 ) {	

			feature.waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						feature.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 200);

					setTimeout(function() {
						feature.find('.to-animate-2').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('bounceIn animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 500);


					$(this.element).addClass('animated');
						
				}
			} , { offset: '80%' } );

		}
	};

	var typeAnimate = function() {
		var type = $('#iv-type');
		if ( type.length > 0 ) {	

			type.waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						type.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 200);

					$(this.element).addClass('animated');
						
				}
			} , { offset: '80%' } );

		}
	};

	var foodMenusAnimate = function() {
		var menus = $('#iv-menus');
		if ( menus.length > 0 ) {	

			menus.waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						menus.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 200);

					setTimeout(function() {
						menus.find('.to-animate-2').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeIn animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 500);

					$(this.element).addClass('animated');
						
				}
			} , { offset: '80%' } );

		}
	};


	var eventsAnimate = function() {
		var events = $('#iv-events');
		if ( events.length > 0 ) {	

			events.waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						events.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeIn animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 200);

					setTimeout(function() {
						events.find('.to-animate-2').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 500);

					$(this.element).addClass('animated');
						
				}
			} , { offset: '80%' } );

		}
	};

	var reservationAnimate = function() {
		var contact = $('#iv-contact');
		if ( contact.length > 0 ) {	

			contact.waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						contact.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeIn animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 200);

					setTimeout(function() {
						contact.find('.to-animate-2').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 500);

					$(this.element).addClass('animated');
						
				}
			} , { offset: '80%' } );

		}
	};

	var footerAnimate = function() {
		var footer = $('#iv-footer');
		if ( footer.length > 0 ) {	

			footer.waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						footer.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeIn animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 200);

					setTimeout(function() {
						footer.find('.to-animate-2').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 500);

					$(this.element).addClass('animated');
						
				}
			} , { offset: '80%' } );

		}
	};
	


	// Document on load.
	$(function(){

		fullHeight();
		sliderMain();
		sliderSayings();
		offcanvasMenu();
		mainMenuSticky();
		parallax();
		burgerMenu();
		scrolledWindow();
		clickMenu();
		navigationSection();
		goToTop();


		// Animations
		homeAnimate();
		aboutAnimate();
		sayingsAnimate();
		featureAnimate();
		typeAnimate();
		foodMenusAnimate();
		eventsAnimate();
		reservationAnimate();
		footerAnimate();

		

	});


}());