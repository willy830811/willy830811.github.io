$(document).ready(() => {

	let windowHeight = $(window).height();
	$('.full_height').height(windowHeight);

	$(window).on('resize', function() {
		windowHeight = $(window).height();
		$('.full_height').height(windowHeight);
	})

})