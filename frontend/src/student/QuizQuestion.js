import React, { Component } from "react";
import QuizChoiceButton from "./QuizChoiceButton";

class QuizQuestion extends Component {
	constructor(props) {
		super(props);
	}

	getInner = () => {
		if (this.props.type === 'multiple-choice') {
			return this.props.answers.map(answer => (
				<QuizChoiceButton value={answer}></QuizChoiceButton>
			));
		} else {
			// TODO
			return null;
		}
	}

	render() {
		return (
			<div className="quiz-question">
				<div className="prompt">
					<h2>Q: {this.props.prompt}</h2>
				</div>
				<div className="answer-container">
					{this.getInner()}
				</div>
			</div>
		)
	}
}

export default QuizQuestion;