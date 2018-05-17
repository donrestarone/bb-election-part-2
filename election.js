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
	
			candidateVoteLiTag.className = 'vote';

			var name = candidate.name;
			var votes = candidate.votes;

			candidateVoteLiTag.innerText = "votes: " + votes;
			candidateNameLiTag.innerText = "name: " + name;

			ul.append(candidateNameLiTag);

			ul.append(candidateVoteLiTag);
			ul.append(br);

			//append form/button and the hidden field to the li
			var form = document.createElement('form');
			var submitButton = document.createElement('input');
			submitButton.setAttribute('type', 'submit');
			//api call stuff
			form.setAttribute('method', 'POST');
			form.setAttribute('action', 'https://bb-election-api.herokuapp.com/vote');
			
			form.append(submitButton);
			candidateVoteLiTag.append(form);
			//hidden field will have the name of the particular candidate
			var hiddenField = document.createElement('input');
			hiddenField.type = 'hidden';
			hiddenField.name = 'name';
			hiddenField.value = name;

			form.append(hiddenField);

			//make the ajax side of things work
			form.addEventListener('submit', function(event){
				console.log('ive been clicked');
				event.preventDefault();
				$.ajax({
					url: form.getAttribute('action'),
					method: form.getAttribute('method'),
					dataType: 'json',
					data: $(hiddenField).serialize()
				}).done(function(data){
					console.log('request successful');

					var request = $.ajax({
						url: url,
						method: 'GET',
						dataType: 'json',
					}).done(function(data){
						console.log(data);
						var updatedCandidates = data['candidates'];
						var i = 0;

						var candidateLiListVote = document.querySelectorAll('.vote')

						updatedCandidates.forEach(function(candidate){
							votes = candidate.votes;
							candidateLiListVote[i].innerText = "";
							candidateLiListVote[i].innerText = "votes: " + votes;
							i++;

							
						})
					})

				}).fail(function(jqXHR, status){
					console.log('fail' + jqXHR + status);
				})
			})

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