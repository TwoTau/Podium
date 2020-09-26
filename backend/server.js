const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
	console.log('Got request to /');
	res.send('Hello world');
});

app.get('/teacher/quizlist', (req, res) =>
{
	console.log(req.query);
	if (req.query.id) {
		console.log('Got request for quiz list for ' + req.query.id);
		res.status(200);
		res.send({
			data: [  // Temp data, use db in future
				{
					name: 'quiz1',
					id: 'quiz1id',
					date: new Date(),
				},
				{
					name: 'quiz2',
					id: 'quiz2id',
					date: new Date(),
				}
			]
		});
	}
	else
	{
		console.log('Got bad request for quiz list');
		res.status(400);
		res.send({
			data: []
		})
	}
});

app.post('/teacher/createquiz', (req, res) =>
{
	console.log(req.body);
	console.log('Got request for create quiz for ');
	res.status(200);
	res.send({
	});
});

app.post('/teacher/createinstaquiz', (req, res) =>
{
	console.log('Got request for create instaQuiz for ');
	res.status(200);
	res.send({
	});
});

app.get('/student/joinquiz', (req, res) =>
{ 
	console.log('Got request to join for ');
	res.status(200);
	res.send({
	})
})

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