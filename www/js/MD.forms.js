$(document).ready(function() {
	$(".md-form-control").focusout(function() {
		if($(this).val())
			$(this).addClass('used');
		else
			$(this).removeClass('used');
	});
});