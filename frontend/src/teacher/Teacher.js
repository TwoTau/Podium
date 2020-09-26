import React, { Component } from "react";
import StudentList from './StudentList';
import CreateQuiz from './CreateQuiz';
import QuizList from './QuizList';
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
			this.io.emit('new teacher', {
				username: this.state.username || 'Anonymous'
			});

			console.log("Successfully connected to the database!");
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
			contentType: this.contentStates.CREATE_QUIZ,
		});
	}

	onQuizStart = (quizName) => {
		alert(`Starting quiz ${quizName}`);
		this.io.emit('start quiz', {
			quizName,
		});
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
					<QuizList quizzes={this.state.quizzes} onQuizStart={this.onQuizStart} />
				</div>
				<div className={this.state.contentType === this.contentStates.CREATE_QUIZ ? 'show' : 'hide'}>
					<CreateQuiz />
				</div>
			</div>
		);
	}
}

export default Teacher;