import React, { Component } from "react";
import QuizQuestion from "./QuizQuestion";
import "./Student.css";
import { server_endpoint, socket_endpoint } from '../config.json';
import io from 'socket.io-client';
import Podium from "./Podium";
import VoteGallery from "./VoteGallery";
import axios from "axios";

const colors = ['green', 'blue', 'yellow', 'red'];
let index = 0;

class Student extends Component {
	constructor(props) {
		super(props);

		// For testing purposes. Delete later.
		this.state = {
			students: [],
			hasQuizStarted: false,
			username: 'Jeremy',
			prompt: "What is 1 + 1?",
			type: "short-answer",
			answers: [],
			hasSubmitted: false,
		};

		this.setStudentList();

		this.props.onPageSet('student');

		this.state.username = prompt('What is your username?') || 'Jeremy';

		this.props.onNameSet(this.state.username);

		// Opens up a socket to the database
		const socket = io(socket_endpoint, { autoConnect: true });

		this.io = socket;

		socket.on("connect", () => {
			this.props.setConnectionStatus(true);
			this.io.emit('new student', {
				username: this.state.username || 'Anonymous',
				teacher: 'Mrs. Anderson',
			});
			console.log("Successfully connected to the database!");
		});

		socket.on("new question", (questionData) => {
			console.log(questionData);
			this.setState({
				prompt: questionData.prompt,
				placeholder: questionData.placeholder,
				type: questionData.type,
			});
		});

		socket.on('invalid teacher', () => {
			alert('The teacher name is invalid. The teacher must be logged in first. Refresh to try again with a different teacher, or later.');
		});

		socket.on('invalid username', () => {
			alert('That username is already in use with this teacher. Refresh to try with a different username.');
		});

		socket.on("disconnect", (reason) => {
			console.log(`Your connection to the server has been lost: ${reason}.`);
			this.props.setConnectionStatus(false);
			this.setState({
				hasQuizStarted: false,
			});
		});

		socket.on('quiz start', (data) => {
			// this.setState({
			// 	hasQuizStarted: true,
			// });
		});

		socket.on("new question", (question) => {
			this.setState({
				...question,
				hasQuizStarted: true,
				answers: [],
				hasSubmitted: false,
			});

			let color = colors[(index++) % colors.length];
			document.body.style.background = `var(--${color}-medium)`;
		});

		socket.on('submission end', (data) => {
			this.setState({
				answers: data.answers,
				hasSubmitted: true,
			});
		});

		socket.on("quiz end", () => {
			alert('Quiz has ended!');
		})
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

	submit = (answer) => {
		console.log(`Submitted: ${answer}`)
		this.setState({ hasSubmitted: true });
		return this.io.emit('answer submission', {
			answer,
			username: this.state.username || 'Anonymous',
		});
	};

	vote = (student, vote) => {
		console.log(`Voting ${vote} for ${student}'s answer`);
		this.io.emit('vote submission', {
			student,
			vote
		});
	}

	render() {
		return (
			<div className={"student " + (this.state.hasQuizStarted ? "quiz-started" : "quiz-not-started")}>
				<Podium students={this.state.students}></Podium>
				<div className="quiz-question-container">
					<QuizQuestion hasSubmitted={this.state.hasSubmitted} prompt={this.state.prompt} type={this.state.type} placeholder={this.state.placeholder} handleSubmit={this.submit}></QuizQuestion>
				</div>
				<VoteGallery prompt={this.state.prompt} type={this.state.type} answers={this.state.answers} onVote={this.vote} />
			</div>
		);
	}
}

export default Student;