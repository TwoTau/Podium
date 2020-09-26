import React, { Component } from "react";
import QuizQuestion from "./QuizQuestion";
import "./Student.css";

class Student extends Component {
	constructor(props) {
		super(props);

		this.state = {
			prompt: "What is 1 + 1?",
			answers: ["1 Lorem Ipsum is simply dummy text of the printing and typesetting industry", "2", "3", "4"],
		};
	}

	render() {
		return (
			<div className="student">
				<QuizQuestion prompt="What is the capital of Washington?" type="short-answer"></QuizQuestion>
				<QuizQuestion prompt={this.state.prompt} answers={this.state.answers} type="multiple-choice"></QuizQuestion>
			</div>
		);
	}
}

export default Student;