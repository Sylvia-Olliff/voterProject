const CARD_CHECK_FAIL = "Please Insert a Valid Smartcard";
const CARD_CHECK_PASS = "Card Detected, Please Click Submit";

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

	$("#checkCardResponse").html();
	//TODO: detect the presence of a card reader
	//		and inserted card. Display a message here if one is not.
});