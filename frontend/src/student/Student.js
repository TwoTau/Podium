import React, { Component } from "react";
import QuizQuestion from "./QuizQuestion";
import "./Student.css";
import { server_endpoint, socket_endpoint } from '../config.json';
import io from 'socket.io-client';

class Student extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: window.prompt("Enter username"),
			teacher: window.prompt("Enter teacher's username")
		};

		this.props.onPageSet('student');
		this.props.onNameSet(this.state.username);

		// Opens up a socket to the database
		const socket = io(socket_endpoint, { autoConnect: true });

		this.io = socket;

		socket.emit("new student", {
			username: this.state.username,
			teacher: this.state.teacher
		});

		socket.on("connect", () => {
			this.io.emit('new student', {
				username: this.state.username || 'Anonymous'
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

		socket.on("disconnect", (reason) => {
			alert('Your connection to the server has been lost.')
			console.log(`Your connection to the server has been lost: ${reason}`);
			socket.open();
		});
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
				<QuizQuestion prompt={this.state.prompt} answers={this.state.answers} type={this.state.type} placeholder={this.state.placeholder} handleSubmit={this.submit}></QuizQuestion>
			</div>
		);
	}
}

export default Student;