import React, { Component } from "react";

class Student extends Component {
	render() {
		return (
			<div className="student">
				<h1>Student component</h1>
				<QuizQuestion />
			</div>
		);
	}
}

class QuizQuestion extends Component {
	constructor(props) {
		super(props);
		this.state = {
			prompt: "What is 1 + 1?",
			answers: ["1", "2", "3", "4"],
		}
	}

	render() {
		const { prompt, answers } = this.state;
		return (
			<div className="quiz-question">
				<div className="prompt">
					{prompt}
				</div>
				<div className="answer-container">
					{answers.map(answer => (
						<p id={answer.id}>
							{answer}
						</p>
					))}
				</div>
			</div>
		)
	}
}

export default Student;