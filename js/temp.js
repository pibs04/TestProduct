$(document).ready( function() {

	$.ajax({
		url: 'http://localhost:8000/category',
		method: 'GET',
		dataType: 'json',
		headers: {"Access-Control-Allow-Origin": "*"},
		success: function(data, status) {

		}
	});
  	


});