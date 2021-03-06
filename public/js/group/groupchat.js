$(document).ready(function() {
	const socket = io();
	const room = $('#groupName').val();
	const sender = $('#sender').val();

	socket.on('connect', function() {
		socket.emit('join', { room, sender }, function() {
			console.log(`Joined channel ${room}...`);
		});
	});

	socket.on('usersList', function(users) {
		let $ol = $('<ol>');

		for (let i = 0; i < users.length; i++) {
			$ol.append(`<p>${users[i]}</p>`);
		}

		$('#users').html($ol);
	});

	socket.on('newMessage', function(data) {
		const template = $('#message-template').html();
		const message = Mustache.render(template, {
			text: data.text,
			sender: data.from
		});

		$('#messages').append(message);
	});

	$('#message-form').on('submit', function(e) {
		e.preventDefault();

		let $msg = $('#msg');

		socket.emit('createMessage', { text: $msg.val(), room, sender }, function() {
			$msg.val('');
		});
	});
});
