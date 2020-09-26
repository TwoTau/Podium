import React, { Component } from "react";
import StudentList from './StudentList';
import CreateQuiz from './CreateQuiz';
import QuizList from './QuizList';
import axios from 'axios';
import { server_endpoint } from '../config.json';
import './Teacher.css';

class Teacher extends Component {
	contentStates = {
		STUDENT_LIST: 'StudentList',
		QUIZ_LIST: 'QuizList',
		CREATE_QUIZ: 'CreateQuiz',
	}

	constructor(props) {
		super(props);
		this.state = {
			contentType: this.contentStates.STUDENT_LIST,
			quizzes: [],
			students: [],
		};
		this.state.content = <StudentList students={this.state.students} />;

		this.setStudentList();
		this.setQuizzesList();
	}

	async setStudentList() {
		try {
			const result = await axios.get(server_endpoint + '/students');
			this.setState({
				students: result.data.students
			});
		} catch (error) {
			console.error(error);
		}
	}

	async setQuizzesList() {
		try {
			const result = await axios.get(server_endpoint + '/teacher/quizlist', {
				params: {
					username: 'mrs-teacher-name', // TODO
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
		if (this.state.contentType !== this.contentStates.STUDENT_LIST) {
			this.setState({
				content: <StudentList students={this.state.students} />,
				contentType: this.contentStates.STUDENT_LIST,
			});
		}
	}

	viewQuizList = () => {
		if (this.state.contentType !== this.contentStates.QUIZ_LIST) {
			this.setState({
				content: <QuizList quizzes={this.state.quizzes} />,
				contentType: this.contentStates.QUIZ_LIST,
			});
		}
	}

	viewCreateQuiz = () => {
		if (this.state.contentType !== this.contentStates.CREATE_QUIZ) {
			this.setState({
				content: <CreateQuiz />,
				contentType: this.contentStates.CREATE_QUIZ,
			});
		}
	}

	render() {
		return (
            <div>
                <div className="quiz-create">
                    <button onClick={this.viewStudentList}>View Student List</button>
                    <button onClick={this.viewQuizList}>Quiz List</button>
                    <button onClick={this.viewCreateQuiz}>Create Quiz</button>
                </div>
				<div>{this.state.content}</div>
			</div>
		);
	}
}

export default Teacher;