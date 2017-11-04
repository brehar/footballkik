'use strict';

module.exports = function(io) {
	io.on('connection', socket => {
		socket.on('join', (params, callback) => {
			socket.join(params.room);
			callback();
		});

		socket.on('createMessage', (message, callback) => {
			io.to(message.room).emit('newMessage', { text: message.text, room: message.room, from: message.sender });
			callback();
		});
	});
};
