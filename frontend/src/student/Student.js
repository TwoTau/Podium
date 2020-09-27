import React, { Component } from "react";
import QuizQuestion from "./QuizQuestion";
import Podium from "./Podium";
import "./Student.css";
import { server_endpoint, socket_endpoint } from '../config.json';
import io from 'socket.io-client';
import axios from "axios";

class Student extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: prompt("Enter username"),
			teacher: prompt("Enter teacher's username"),
			students: []
		};

		this.setStudentList();

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
	}

	submit = (answer) => {
		return this.io.emit('answer submission', {
			answer,
			username: this.state.username || 'Anonymous',
		});
	};

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

	render() {
		return (
			<div className="student">
				<Podium students={this.state.students}/>
			</div>
		);
	}
}

export default Student;