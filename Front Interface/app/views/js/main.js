const CARD_CHECK_FAIL = "Please Insert a Valid Smartcard";
const CARD_CHECK_PASS = "Card Detected, Please Click Submit";

$(document).ready(function(){

	$("#start").on('click', function(evt){
		evt.preventDefault();

		window.location.href="192.168.1.13:8888/elections";
	});
});