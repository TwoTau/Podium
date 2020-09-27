class Classroom {
	constructor(db, io, teacherSocket, teacherName, onClosed) {
		this.db = db;
		this.io = io;
		this.onClosed = onClosed;
		this.onTeacherConnect(teacherSocket, teacherName);
	}

	onTeacherConnect(socket, username) {
		this.teacher = socket;
		this.roomName = username;
		this.teacherName = username;
		this.students = [];
		this.state = 'teacher joined';

		socket.join(this.roomName);

		console.log(`Teacher ${username} connected and created an empty classroom.`);

		socket.on('disconnect', () => {
			console.log(`Teacher ${username} disconnected. Destroying classroom.`);

			// disconnect all students
			for (let studentSocket of this.students) {
				studentSocket.disconnect();
			}

			this.isClosed = true;
			this.onClosed();
		});

		socket.on('start quiz', (data) => {
			this.startQuiz(data.quizName);
		});

		socket.on('next question', () => {
			this.nextQuestion()
		});

		socket.on('end submission', () => {
			this.endSubmission()
		});

		socket.on('end quiz', () => {
			this.endQuiz()
		});
	}

	addStudent(socket, username) {
		socket.username = username;
		this.students.push(socket);
		socket.join(this.roomName);

		console.log(`New student ${username} connected to ${this.roomName}. Current students: ${this.students.length}`);

		this.sendUpdate();

		if (this.state !== 'teacher joined' && this.state !== 'quiz ended') {
			socket.emit('quiz start');
			socket.emit('new question', this.quiz.questions[this.currQuestion]);
		}

		socket.on('disconnect', () => {
			const index = this.students.indexOf(socket);
			if (index > -1) {
				this.students.splice(index, 1);
			}
			console.log(`Student ${username} disconnected from "${this.roomName}". Current students: ${this.students.length}`);
		});

		socket.on('answer submission', (data) => {
			this.onAnswerSubmission(username, data.answer);
		});

		socket.on('vote submission', (data) => {
			this.onVoteSubmission(username, data.student, data.vote);
		});
	}

	hasStudent(studentName) {
		return this.students.map((s) => s.username).includes(studentName);
	}

	sendAll(event, data) {
		this.io.to(this.roomName).emit(event, data || {});
	}

	sendUpdate() {
		this.sendAll('user update', {
			students: this.students.map((s) => s.username),
		});
	}

	startQuiz(quizName) {
		const quiz = this.db
			.get('quizzes')
			.find({ name: quizName })
			.value();

		if (!quiz) { // error if no quiz with that name
			console.error(`No quiz with name "${quizName}" found`);
			return;
		}

		this.sendAll('quiz start');

		console.log(`Starting quiz "${quizName}"`);

		this.quiz = quiz;
		this.state = 'quiz start';
		this.currQuestion = -1;
	}

	nextQuestion() {
		this.currQuestion++;
		this.answers = [];
		this.state = 'question submission';
		this.sendAll('new question', this.quiz.questions[this.currQuestion]);
	}

	endSubmission() {
		this.state = 'question vote';

		// initialize all votes to 0
		for (let answer of this.answers) {
			answer.votes = 0;
		}

		this.sendAll('submission end', {
			answers: this.answers
		});
	}

	endQuiz() {
		this.quiz = {};
		this.state = 'quiz ended';
		this.sendAll('quiz end');
		this.onClosed();
	}

	onAnswerSubmission(student, answer) {
		if (this.state !== 'question submission') { // error if not allowing answers
			console.error(`Student ${student} tried to answer during state "${this.state}". Returning.`);
			return;
		}

		console.log(`${student} answered "${answer}"`);

		this.answers.push({
			student,
			answer,
		});
		this.sendAll('new answer', {
			student,
			answer,
		});
	}

	onVoteSubmission(voter, student, vote) {
		if (this.state !== 'question vote') { // error if not allowing votes
			console.error(`Student ${voter} tried to vote during state "${this.state}". Returning.`);
			return;
		}

		let answer = this.answers.find((a) => a.student === student);

		if (!answer) { // error if no answer
			console.error(`${voter} failed to vote ${vote} on nonexistent answer authored by ${student}`);
			return;
		}

		console.log(`${voter} voted ${data.vote} on answer by ${data.student}`);

		answer.votes += vote;

		this.sendAll('question vote', {
			answers: this.answers.map((a) => ({
				student: a.student,
				votes: a.votes,
			})),
		});
	}
}

module.exports = Classroom;