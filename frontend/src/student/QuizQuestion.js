import React, { Component } from "react";
import QuizChoiceButton from "./QuizChoiceButton";
import QuizShortAnswer from "./QuizShortAnswer";

class QuizQuestion extends Component {
	constructor(props) {
		super(props);
	}

	getInner = () => {
		const type = this.props.type;

		if (type === 'multiple-choice') {
			return this.props.answers.map(answer => (
				<QuizChoiceButton value={answer} onClick={this.onAnswerSelected} key={answer}></QuizChoiceButton>
			));
		} else if (type === 'short-answer') {
			// TODO
			return <QuizShortAnswer placeholder={this.props.placeholder} onClick={this.onAnswerSelected}></QuizShortAnswer>;
		} else if (type === 'draw') {
			// TODO
			return null;
		}
		console.error(`Unknown question type ${type}`);
		return null;
	}

	onAnswerSelected = (answerChoice) => {
		alert(`Student selected "${answerChoice}"`);
		this.props.handleSubmit(answerChoice);
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