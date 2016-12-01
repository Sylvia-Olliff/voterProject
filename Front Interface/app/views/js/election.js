$(document).ready(function(){
	$.ajax({
		type: "GET",
		dataType: "HTML",
		url: "electionData",
		cache: false,
		success: function(result) {
			$("#fedData").html(result);

			$(".voter-buttons").on('click', function(evt){
				evt.preventDefault();

				var clicked = $(this);

				$(".voter-buttons").removeClass('active');
				clicked.addClass('active');
				
			});


			$("#nextBtn").on('click', function(evt) {
				evt.preventDefault();
				
				BootstrapDialog.show({
			        title: 'Personal Key',
			        type: BootstrapDialog.TYPE_SUCCESS,
			        message: function(dialog) {
			            var $content = $("<div class='row'><div class='col-md-6 text-right'><label for='pKey'>Personal Key: </label></div><div class='col-md-6 text-center'><input type='text' class='form-control' id='pkey' placeholder='example key'></div></div>");
			                
			            return $content;
			        },
			        buttons: [{
			            id: 'btn-1',
			            label: 'Click to Submit.',
			            action: function(dialog) {
			                dialog.setClosable(true);

			                var input = dialog.getModalBody().find('input').val();

			                var data = {secret: input, vote: $(".active").attr('id')};

			                $.ajax({
			                	type: "POST",
			                	dataType: "HTML",
			                	url: "voteData",
			                	data: data,
			                	cache: false,
			                	success: function(result) {
			                		console.log(result);
			                	},
			                	error: function(jqXHR, status, err) {
			                		console.log("Error");
			                		console.log(status, err);
			                	}
			                });

			            },
			            function(dialogItself){
                    		dialogItself.close();
                		}
                	}]
                });
			});

		},
		error: function(jqXHR, status, err) {
			console.log("Error");
			console.log(status, err);	
		}
	});	
});