import React, { Component } from "react";
import QuizQuestion from "./QuizQuestion";
import "./Student.css";
import io from 'socket.io-client';

class Student extends Component {
	constructor(props) {
		super(props);

		// Opens up a socket to the database
		const socket = io(`http://localhost:8000`, { autoConnect: true });

		this.io = socket;

		socket.on("connect", () => {
			console.log("Successfully connected to the database!");
		});

		socket.on("new-question", (questionData) => {
			this.setState({name: this.state.name || 'Anonymous', ...questionData});
		})

		socket.on("disconnect", (reason) => {
			alert('Your connection to the server has been lost.')
			console.log(reason);
			socket.open();
		});

		this.state = {
			prompt: "What is 1 + 1?",
			answers: ["1 Lorem Ipsum is simply dummy text of the printing and typesetting industry", "2", "3", "4"],
		};
	}

	submit = (answer) => {
		return this.io.send({
			student: this.state.name || 'Anonymous',
			prompt: this.state.prompt || 'No prompt',
			answer: answer,
		});
	};

	render() {
		return (
			<div className="student">
				<QuizQuestion prompt="What is the capital of Washington?" type="short-answer" handleSubmit={this.submit}></QuizQuestion>
				<QuizQuestion prompt={this.state.prompt} answers={this.state.answers} type="multiple-choice" handleSubmit={this.submit}></QuizQuestion>
			</div>
		);
	}
}

export default Student;