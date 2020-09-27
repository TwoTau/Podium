const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http);

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const Classroom = require('./classroom');
const db = low(new FileSync('db.json'));

// initialize with default data if db is empty
db.defaults(require('./default-data.json')).write();

const PORT = process.env.PORT || 8000;

app.use(cors({
	origin: 'http://localhost:3000'
}));

app.use(express.json());

app.get('/', (req, res) => {
	console.log('Got request to /');
	res.send('Hello world');
});

app.get('/students', (req, res) => {
	console.log('Got request for all students');

	const students = db
		.get('students')
		.value();

	res.send({
		students,
	});
});

app.get('/teacher/quizlist', (req, res) => {
	if (!req.query.username) {
		console.log('Got bad request for quiz list');
		res.status(400).send('Missing username param');
		return;
	}

	console.log('Got request for quiz list for ' + req.query.username);

	const teacher = db
		.get('teachers')
		.find({ username: req.query.username })
		.value();

	if (!teacher) {
		console.log(`Teacher ${req.query.username} does not exist`);
		res.status(400).send('Teacher does not exist');
		return;
	}

	const quizzes = db
		.get('quizzes')
		.filter((q) => teacher.quizzes.includes(q.name))
		.map((q) => ({
			name: q.name,
			created: q.created
		}))
		.value();

	res.send({
		quizzes,
	});
});

app.post('/teacher/createquiz', (req, res) => {
	// TODO
	console.log('Got request for create quiz for ');
	res.send({});
});

// maps teacher name to Classroom
const classrooms = {};

io.on('connection', (socket) => {
	console.log('New client connected');

	socket.on('new teacher', (data) => {
		handleTeacher(socket, data.username);
	});

	socket.on('new student', (data) => {
		handleStudent(socket, data.username, data.teacher);
	});
});

function handleTeacher(socket, username) {
	let classroom = classrooms[username];

	if (classroom) { // error if teacher with same name already connected
		console.log(`Classroom "${username} is already open. Closing connection.`);
		socket.emit('classroom in use');
		socket.disconnect();
		return;
	}

	classroom = new Classroom(db, io, socket, username, () => {
		delete classrooms[username];
	});
	classrooms[username] = classroom;
}

function handleStudent(socket, username, teacher) {
	const classroom = classrooms[teacher];

	if (!classroom) { // error if teacher NOT already connected
		console.log(`New student ${username} tried connecting to nonexistent classroom ${teacher}. Closing connection.`);
		socket.emit('invalid teacher');
		socket.disconnect();
		return;
	} else if (classroom.hasStudent(username)) { // error if username already connected to classroom
		console.log(`Student ${username} tried connecting to ${teacher} but has already connected. Closing connection.`);
		socket.emit('invalid username');
		socket.disconnect();
		return;
	}

	classroom.addStudent(socket, username);
}

http.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});