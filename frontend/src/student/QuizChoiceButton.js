import React, { Component } from "react";

/**
 * Props:
 * - value: string
 * - onClick: function
 */
class QuizChoiceButton extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<button className="quiz-choice-button" onClick={this.props.onClick}>
				{this.props.value}
			</button>
		);
	}
}

export default QuizChoiceButton;