import React, { Component } from "react";

/**
 * Props:
 * - placeholder: string
 * - onClick: function
 */
class QuizShortAnswer extends Component {
	constructor(props) {
		super(props);
	}

	onSubmit = (event) => {
		const answer = document.querySelector(".quiz-short-answer input").value;
		this.props.onClick(answer);
	}

	render() {
		return (
			<div className="quiz-short-answer">
				<input type="text" placeholder={this.props.placeholder || 'no-placeholder'} />
				<button onClick={this.onSubmit}>Submit</button>
			</div>
		);
	}
}

export default QuizShortAnswer;