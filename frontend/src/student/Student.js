import React, { Component } from "react";
import QuizQuestion from "./QuizQuestion";
import "./Student.css";
import { server_endpoint, socket_endpoint } from '../config.json';
import io from 'socket.io-client';

class Student extends Component {
	constructor(props) {
		super(props);

		// For testing purposes. Delete later.
		this.state = {
			username: 'sirknightj',
			prompt: "What is 1 + 1?",
			type: "multiple-choice",
			answers: ["1 Lorem Ipsum is simply dummy text of the printing and typesetting industry", "2", "3", "4"],
		};

		this.props.onPageSet('student');

		this.state.username = prompt('What is your username?') || 'sirknightj';

		this.props.onNameSet(this.state.username);

		// Opens up a socket to the database
		const socket = io(socket_endpoint, { autoConnect: true });

		this.io = socket;

		socket.on("connect", () => {
			this.props.setConnectionStatus(true);
			this.io.emit('new student', {
				username: this.state.username || 'Anonymous',
				teacher: 'mrs-teacher-name',
			});
			console.log("Successfully connected to the database!");
		});

		socket.on("new question", (questionData) => {
			console.log(questionData);
			this.setState({
				prompt: questionData.prompt,
				answers: questionData.answers,
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
		});

		socket.on("quiz end", () => {

		})
	}

	submit = (answer) => {
		return this.io.emit('answer submission', {
			answer,
			username: this.state.username || 'Anonymous',
		});
	};

	render() {
		return (
			<div className="student">
				<div>
					<QuizQuestion prompt={this.state.prompt} answers={this.state.answers} type={this.state.type} placeholder={this.state.placeholder} handleSubmit={this.submit}></QuizQuestion>
				</div>
			</div>
		);
	}
}

export default Student;