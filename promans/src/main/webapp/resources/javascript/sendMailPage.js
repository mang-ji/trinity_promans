/*$("#file").on('change',function(){
  var fileName = $("#file").val();
  $(".upload-name").val(fileName);
});*/

$(document).ready(function(){ 
	var fileTarget = $('.filebox .upload-hidden'); 
	fileTarget.on('change', function(){
	if(window.FileReader){
	var filename = $(this)[0].files[0].name; 
	} else {
		var filename = $(this).val().split('/').pop().split('\\').pop();
		} 
		$(this).siblings('.upload-name').val(filename); 
		}); 
		});
