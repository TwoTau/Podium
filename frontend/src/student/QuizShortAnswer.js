import React, { Component } from "react";

/**
 * Props:
 * - placeholder: string
 * - onClick: function
 */
class QuizShortAnswer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: '',
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.prompt !== prevProps.prompt) {
			this.setState({
				value: '',
			});
		}
	}

	onSubmit = (event) => {
		this.props.onClick(this.state.value);
	}

	onChange = (event) => {
		this.setState({
			value: event.target.value,
		});
	}

	render() {
		let submitText = this.props.hasSubmitted ? 'Submitted!' : 'Submit';
		return (
			<div className="quiz-short-answer">
				<input disabled={this.props.hasSubmitted} ref={input => this.answerInput = input} type="text" placeholder={this.props.placeholder || 'no-placeholder'} value={this.state.value} onChange={this.onChange} />
				<button disabled={this.props.hasSubmitted} ref={button => this.submitButton = button} onClick={this.onSubmit}>{submitText}</button>
			</div>
		);
	}
}

export default QuizShortAnswer;