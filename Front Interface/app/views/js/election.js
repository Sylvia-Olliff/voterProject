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
});