const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
	console.log('Got request to /');
	res.send('Hello world');
});

// Realtime message sending socket part
io.on('connection', (socket) => {
	console.log('New client connected');
	// On getting drawing from request emit it to all users
	socket.on('drawing', (dwg) => {
		io.emit('drawing', dwg);
	});
});

http.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});