import React, { Component } from "react";
import QuizDraw from "./QuizDraw";
import QuizShortAnswer from "./QuizShortAnswer";

class QuizQuestion extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hasSubmitted: false,
		}
	}

	getInner = () => {
		const type = this.props.type;

		if (type === 'short-answer') {
			return <QuizShortAnswer hasSubmitted={this.state.hasSubmitted} placeholder={this.props.placeholder} onClick={this.onAnswerSelected}></QuizShortAnswer>;
		} else if (type === 'draw') {
			return <QuizDraw hasSubmitted={this.state.hasSubmitted} onSubmit={this.onAnswerSelected}></QuizDraw>
		}
		console.error(`Unknown question type ${type}`);
		return null;
	}

	onAnswerSelected = (answerChoice) => {
		this.state.hasSubmitted = true;
		this.props.handleSubmit(answerChoice);
	}

	render() {
		return (
			<div className="quiz-question">
				<div className="prompt">
					<h2>{this.props.prompt}</h2>
				</div>
				<div className="answer-container">
					{this.getInner()}
				</div>
			</div>
		)
	}
}

export default QuizQuestion;