document.addEventListener("DOMContentLoaded", function() {
	var ul = document.createElement('ul');
	var url = "https://bb-election-api.herokuapp.com/";
	var body = document.getElementById('body');
	body.append(ul);

	var request = $.ajax({
		url: url,
		method: 'GET',
		dataType: 'json',
	})

	request.done(function(data){
		var candidates = (data['candidates']);
		candidates.forEach(function(candidate){
			var br = document.createElement('br');

			var candidateNameLiTag = document.createElement('li');
			var candidateVoteLiTag = document.createElement('li');

			var name = candidate.name;
			var votes = candidate.votes;

			candidateVoteLiTag.innerText = "votes: " + votes;
			candidateNameLiTag.innerText = "name: " + name;

			ul.append(candidateNameLiTag);

			ul.append(candidateVoteLiTag);
			ul.append(br);

			var form = document.createElement('form');
			//form.innerText = 'hi'
			candidateVoteLiTag.append(form);
			
		})
		
		console.log('made api call successfully');
	})

	request.fail(function(request, status, error){
		console.log(request + status + error);
	})

	request.always(function(){
		console.log('request made');
	})



});