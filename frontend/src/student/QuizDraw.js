import React, { Component } from "react";

/**
 * Props:
 * - onSubmit: function
 */
class QuizDraw extends Component {
	constructor(props) {
		super(props);
	}

	onSubmit = (event) => {
		const answer = null; // TODO
		this.props.onSubmit(answer);
	}

	render() {
		return (
			<div className="quiz-short-answer">
				{/* TODO */}
				<button onClick={this.onSubmit}>Submit drawing</button>
			</div>
		);
	}
}

export default QuizDraw;