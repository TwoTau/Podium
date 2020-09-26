const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http);

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const db = low(new FileSync('db.json'));

// initialize with default data if db is empty
db.defaults(require('./default-data.json')).write();

const PORT = process.env.PORT || 8000;

app.use(cors({
	origin: 'http://localhost:3000'
}));

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

const studentSockets = [];
let teacherSocket = null;

// maps classroom name to studentSockets list and teacherSocket
const classroom = {
	"some-name": {
		studentSockets: [],
		teacherSocket: null
	}
};

io.on('connection', (socket) => {
	console.log('New client connected');

	socket.on('new teacher', (data) => {
		handleTeacher(socket, data.username);
	});

	socket.on('new student', (data) => {
		handleStudent(socket, data.username);
	});
});

function handleTeacher(socket, username) {
	teacherSocket = socket;

	socket.on('disconnect', () => {
		teacherSocket = null;
		console.log(`Teacher with username ${username} disconnected.`);
	});

	socket.on('start quiz', (data) => {
		// assume quizName is a valid quiz name
		let quizName = data.quizName;
		const quiz = db
			.get('quizzes')
			.find({ name: quizName })
			.value();

		if (!quiz) {
			console.error(`No quiz with name "${quizName}" found`);
			return;
		}

		console.log(`Starting quiz "${quizName}"`);

		startQuiz(quiz);
	});
}

function handleStudent(socket, username) {
	socket.username = username;
	studentSockets.push(socket);
	console.log(`New student with username "${username}" connected. Current users: ${studentSockets.length}`);

	socket.on('disconnect', () => {
		const index = studentSockets.indexOf(socket);
		if (index > -1) {
			studentSockets.splice(index, 1);
		}
		console.log(`Client with username ${username} disconnected. Current users: ${studentSockets.length}`);
	});

	socket.on('answer submission', (data) => {
		console.log(`${username} answered "${data.answer}"`);
	});
}

function startQuiz(quizData) {
	let questions = quizData.questions;
	let currQuestionIndex = 0;

	io.emit('new question', questions[currQuestionIndex]);
}

http.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});