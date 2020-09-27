import React, { Component } from "react";
import StudentList from './StudentList';
import CreateQuiz from './CreateQuiz';
import QuizList from './QuizList';
import QuizView from './TeacherQuizView';
import axios from 'axios';
import { server_endpoint, socket_endpoint } from '../config.json';
import './Teacher.css';
import io from 'socket.io-client';

class Teacher extends Component {
	contentStates = {
		STUDENT_LIST: 'StudentList',
		QUIZ_LIST: 'QuizList',
		CREATE_QUIZ: 'CreateQuiz',
		QUIZ_IN_SESSION: 'QuizInSession',
	}

	constructor(props) {
		super(props);
		this.state = {
			username: 'mrs-teacher-name', // TODO
			contentType: this.contentStates.STUDENT_LIST,
			quizzes: [],
			allStudents: [],
			students: [], // list of strings (usernames)
			studentsAnswered: [], // list of strings (usernames)
			answers: [],
			prompt: null,
			questionType: null,
			placeholder: null,
			isQuizEnded: false,
		};

		this.setAllStudentsList();
		this.setQuizzesList();

		this.props.onPageSet('teacher');
		this.props.onNameSet(this.state.username);

		// Opens up a socket to the database
		const socket = io(socket_endpoint, { autoConnect: true });

		this.io = socket;

		socket.on("connect", () => {
			this.props.setConnectionStatus(true);

			this.io.emit('new teacher', {
				username: this.state.username || 'Anonymous'
			});

			socket.on('classroom in use', () => {
				alert('A teacher with that username is already logged in. Close that tab and refresh to try with a different username.');
			});

			console.log("Successfully connected to the database!");
		});

		socket.on("disconnect", (reason) => {
			console.log(`Your connection to the server has been lost: ${reason}.`);
			this.props.setConnectionStatus(false);
		});

		socket.on("user update", ({students}) => {
			console.log(students)
			this.setState({students: students});
		})

		socket.on("new question", (data) => {
			this.setState({
				prompt: data.prompt,
				questionType: data.type,
				placeholder: data.placeholder,
			});
		});

		socket.on("new answer", (data) => {
			let { student, answer } = data;
			this.setState((state) => ({
				studentsAnswered: [...state.studentsAnswered, student],
				answers: [...state.answers, { answer, student, votes: 0 }],
			}));
		});

		socket.on("question vote", (data) => {
			this.setState({
				answers: data.answers,
			});
		});

		socket.on('quiz end', () => {
			this.setState({
				isQuizEnded: true,
			});
		});
	}

	async setAllStudentsList() {
		try {
			const result = await axios.get(server_endpoint + '/students');
			this.setState({
				allStudents: result.data.students,
			});
		} catch (error) {
			console.error(error);
		}
	}

	async setQuizzesList() {
		try {
			const result = await axios.get(server_endpoint + '/teacher/quizlist', {
				params: {
					username: this.state.username,
				},
			});
			this.setState({
				quizzes: result.data.quizzes,
			});
		} catch (error) {
			console.error(error);
		}
	}

	viewAllStudentsList = () => {
		this.setState({
			contentType: this.contentStates.STUDENT_LIST,
		});
	}

	viewQuizList = () => {
		this.setState({
			contentType: this.contentStates.QUIZ_LIST,
		});
	}

	viewCreateQuiz = () => {
		this.setState({
			editQuizName: undefined,
			contentType: this.contentStates.CREATE_QUIZ,
		});
	}

	onQuizStart = (quizName) => {
		this.io.emit('start quiz', {
			quizName,
		});
		this.onNextQuestion(); // start first question immediately

		this.setState({
			contentType: this.contentStates.QUIZ_IN_SESSION,
		})
	}

	onQuizEdit = (quizName) => {
		this.setState({
			editQuizName: quizName,
			contentType: this.contentStates.CREATE_QUIZ,
		});
	}

	onQuizSubmit = async (quiz) => {
		quiz.created = new Date();
		this.setState({
			contentType: this.contentStates.QUIZ_LIST,
		});
		try {
			const result = await axios.post(server_endpoint + '/teacher/createquiz', {
				params: {
					username: this.state.username,
					quiz: quiz,
				},
			});
			// Set quizzes to updated list of quizes
			this.setState({
				quizzes: result.data.quizzes,
			});
		} catch (error) {
			console.error(error);
		}
	}

	onNextQuestion = () => {
		this.setState({
			studentsAnswered: [],
			answers: [],
		});
		this.io.emit('next question');
	}

	onEndSubmission = () => {
		this.io.emit('end submission');
	}

	onQuizEnd = () => {
		this.viewQuizList();
		this.io.emit('end quiz');
	}

	getUnanswered = () => {
		return this.state.students.filter((s) => !this.state.studentsAnswered.includes(s));
	}

	getAnswered = () => {
		return this.state.studentsAnswered;
	}

	render() {
		return (
			<div className="teacher">
				<div className={this.state.contentType === this.contentStates.QUIZ_IN_SESSION ? 'hide' : 'teacher-nav'}>
					<button onClick={this.viewAllStudentsList} className={this.state.contentType === this.contentStates.STUDENT_LIST ? 'selected' : ''}>View All Students</button>
					<button onClick={this.viewQuizList} className={this.state.contentType === this.contentStates.QUIZ_LIST ? 'selected' : ''}>Quiz List</button>
					<button onClick={this.viewCreateQuiz} className={this.state.contentType === this.contentStates.CREATE_QUIZ ? 'selected' : ''}>Create Quiz</button>
				</div>
				<div>{this.state.content}</div>
				<div className={this.state.contentType === this.contentStates.STUDENT_LIST ? 'show' : 'hide'}>
					<StudentList students={this.state.allStudents} />
				</div>
				<div className={this.state.contentType === this.contentStates.QUIZ_LIST ? 'show' : 'hide'}>
					<QuizList quizzes={this.state.quizzes} onQuizStart={this.onQuizStart} onQuizEdit={this.onQuizEdit} />
				</div>
				<div className={this.state.contentType === this.contentStates.CREATE_QUIZ ? 'show' : 'hide'}>
					<CreateQuiz quizzes={this.state.quizzes} submitQuiz={this.onQuizSubmit} name={this.state.editQuizName} />
				</div>
				<div className={this.state.contentType === this.contentStates.QUIZ_IN_SESSION ? 'show' : 'hide'}>
					<QuizView
						prompt={this.state.prompt}
						type={this.state.questionType}
						unanswered={this.getUnanswered() || []}
						answered={this.getAnswered() || []}
						answers={this.state.answers}
						onNextQuestion={this.onNextQuestion}
						onEndSubmission={this.onEndSubmission}
						isQuizEnded={this.state.isQuizEnded}>
					</QuizView>
				</div>
			</div>
		);
	}
}

export default Teacher;