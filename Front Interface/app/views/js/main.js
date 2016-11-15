const CARD_CHECK_FAIL = "Please Insert a Valid Smartcard";
const CARD_CHECK_PASS = "Card Detected, Please Click Submit";

$(document).ready(function(){

	//TODO: If there is no event to tie into, check for card presence
	//		every 10 secs. (this may require local software to be 
	//		more effecient)

	$("#checkCardResponse").html();
	//TODO: detect the presence of a card reader
	//		and inserted card. Display a message here if one is not.
});