$(document).ready(function(){
	$.ajax({
		type: "GET",
		dataType: "HTML",
		url: "electionData",
		cache: false,
		success: function(result) {
			$("#fedData").html(result);

		},
		error: function(jqXHR, status, err) {
			console.log("Error");
			console.log(status, err);	
		}
	});	

	$(".voter-buttons").on('click', function(evt){
		evt.preventDefault();

		var clicked = $(this);

		$(".voter-buttons").removeClass('active');
		clicked.addClass('active');
		
	});


});