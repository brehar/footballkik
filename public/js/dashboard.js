$(document).ready(function() {
	$('.button-collapse').sideNav();

	let $uploadInput = $('.upload-input');
	let $uploadContainer = $('.upload-container');
	let $submitButtonContainer = $('.submit-button-container');
	let $uploadButtonContainer = $('.upload-button-container');

	$('.upload-button').on('click', function() {
		$uploadInput.click();
	});

	$uploadInput.on('change', function() {
		if ($uploadInput.val() !== '') {
			let formData = new FormData();
			formData.append('upload', $uploadInput[0].files[0]);

			$.ajax({
				url: '/upload',
				type: 'POST',
				data: formData,
				processData: false,
				contentType: false,
				success: function() {
					$uploadContainer.show();
					// $('.file-path').prop('disabled', true);
					// $uploadInput.prop('disabled', true);
					$submitButtonContainer.show();
					$uploadButtonContainer.hide();
				}
			});
		}
	});
});
