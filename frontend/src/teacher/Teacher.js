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
	}

	constructor(props) {
		super(props);
		this.state = {
			username: 'mrs-teacher-name', // TODO
			contentType: this.contentStates.STUDENT_LIST,
			quizzes: [],
			students: [],
		};

		this.setStudentList();
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

			this.io.on('classroom in use', () => {
				alert('A teacher with that username is already logged in. Close that tab and refresh to try with a different username.');
			});

			console.log("Successfully connected to the database!");
		});

		socket.on("disconnect", (reason) => {
			console.log(`Your connection to the server has been lost: ${reason}.`);
			this.props.setConnectionStatus(false);
		});
	}

	async setStudentList() {
		try {
			const result = await axios.get(server_endpoint + '/students');
			this.setState({
				students: result.data.students,
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

	viewStudentList = () => {
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
		alert(`Starting quiz ${quizName}`);
		this.io.emit('start quiz', {
			quizName,
		});
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
			// Set quizes to updated list of quizes
			this.setState({
				quizzes: result.data.quizzes,
			});
		} catch (error) {
			console.error(error);
		}
	}


	getUnanswered = () => {
		// TODO: return the list of students that have not answered yet
	}

	getAnswered = () => {
		// TODO: return the list of students that have answered
	}

	getAnswers = () => {
		// TODO: return the list of submitted answers to be displayed
	}

	render() {
		return (
			<div className="teacher">
				<div className="teacher-nav">
					<button onClick={this.viewStudentList} className={this.state.contentType === this.contentStates.STUDENT_LIST ? 'selected' : ''}>View Student List</button>
					<button onClick={this.viewQuizList} className={this.state.contentType === this.contentStates.QUIZ_LIST ? 'selected' : ''}>Quiz List</button>
					<button onClick={this.viewCreateQuiz} className={this.state.contentType === this.contentStates.CREATE_QUIZ ? 'selected' : ''}>Create Quiz</button>
				</div>
				<div>{this.state.content}</div>
				<div className={this.state.contentType === this.contentStates.STUDENT_LIST ? 'show' : 'hide'}>
					<StudentList students={this.state.students} />
				</div>
				<div className={this.state.contentType === this.contentStates.QUIZ_LIST ? 'show' : 'hide'}>
					<QuizList quizzes={this.state.quizzes} onQuizStart={this.onQuizStart} onQuizEdit={this.onQuizEdit} />
				</div>
				<div className={this.state.contentType === this.contentStates.CREATE_QUIZ ? 'show' : 'hide'}>
					<CreateQuiz quizzes={this.state.quizzes} submitQuiz={this.onQuizSubmit} name={this.state.editQuizName} />
				</div>
				<div className='show'>
					<QuizView unanswered={this.getUnanswered() || []} answered={this.getAnswered() || []} answers={this.getAnswers() || []}></QuizView>
				</div>
			</div>
		);
	}
}

export default Teacher;