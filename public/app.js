var deleteBear = function(){

	var id = $(event.target).closest('tr').attr('id');
	var bear = $(event.target).closest('tr');
	$.ajax({
		url: '/api/bears/' + id,
		method: 'DELETE',
	}).done(function(){
		console.log("Bear is deleted!")
		bear.remove();
	})
}

$('.deleteBear').on('click', deleteBear);


