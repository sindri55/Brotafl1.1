$(document).ready(function(){
    var globalDiffY = 125;
    var fixed = false;

    $.stellar.positionProperty.bannerTransform = {
	  setPosition: function($el, x, startX, y, startY) {
	  	var transform = "";
	  	var diffY = y - startY;
	  	var diffX = x - startX;

	  	var offset = 40;
	  	var offset2 = 335 + startY;

	  	//console.log($el);
	  	//console.log("y: " + y + ", startY: " + startY);
	  	//console.log("x: " + x + ", startX: " + startX);
	  	// console.log("diffX: " + diffX);
	  	//console.log("diffY: " + diffY);
	  	if($el.hasClass('logo-img')){
	  		if((y - startY) >= 335){
		  		y = y * 2;
		  		fixed = true;
		  	} else {
		  		fixed = false;
		  	}

		  	if(fixed !== true){
				var realDiffY = diffY - globalDiffY;
		  		var toScale = ((200 - realDiffY) / 250) + 0.4;
		  		
		  		transform += 'translate3d(' +
			  		(x - startX) + 'px, ' +
			  		((y - startY) - offset) + 'px, ' +
			  		'0)';

		  		transform += 'scale(' + toScale + ')';
		  	} else {
		  		transform += 'translate3d(' +
			  		(x - startX) + 'px, ' +
			  		((y - startY) - offset2 - offset) + 'px, ' +
			  		'0)';
				transform += 'scale(0.36)';
		  	}
	  	} else {
	  		transform += 'translate3d(' +
		  		(x - startX) + 'px, ' +
		  		(y - startY) + 'px, ' +
		  		'0)';
	  	}

	  	$el.css('transform', transform);
	  }
	};

	var navbarLogo = $('.navbar .logo');
	var logo = $('.banner .logo-img');

	$.stellar({
		// Set scrolling to be in either one or both directions
        horizontalScrolling: false,
        verticalScrolling: true,

        // Set the global alignment offsets
        horizontalOffset: 0,
        verticalOffset: 0,

        // Refreshes parallax content on window load and resize
  		responsive: true,

  		// Select which property is used to calculate scroll.
		// Choose 'scroll', 'position', 'margin' or 'transform',
		// or write your own 'scrollProperty' plugin.
		scrollProperty: 'scroll',

		// Select which property is used to position elements.
		// Choose between 'position' or 'transform',
		// or write your own 'positionProperty' plugin.
    	positionProperty: 'bannerTransform',

    	// Enable or disable the two types of parallax
		parallaxBackgrounds: false,
		parallaxElements: true,

    	// Hide parallax elements that move outside the viewport
		hideDistantElements: false,

		// Customise how elements are shown and hidden
		hideElement: function($elem) { $elem.hide(); },
		showElement: function($elem) { $elem.show(); }
	});
});