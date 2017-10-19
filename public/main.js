$(document).ready(() => {
	$('.button-collapse').sideNav();

	$('#alert-close').click(() => {
		$('#alert-box').fadeOut('slow', () => {});
	});
});
