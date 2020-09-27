import React, { Component } from 'react';

/**
 * Props
 * - name: string
 * - date: string
 * - onQuizStart: function with string parameter quizName
 * - onQuizEdit: function with string parameter quizName
 */
class QuizListItem extends Component {
    constructor(props) {
        super(props);
    }

    onStartButtonClicked = () => {
        this.props.onQuizStart(this.props.prompt);
    }

    onEditButtonClicked = () => {
        this.props.onQuizEdit(this.props.prompt);
    }

    render() {
        return (
            <div className="quiz-list-item information-text">
                <div>
                    <h2>{this.props.prompt || 'No prompt'}</h2>
                    <h3>{this.props.answers || 'No answers'}</h3>
                    <button className='start-quiz' onClick={this.onStartButtonClicked}>Start quiz</button>
                    <button className='edit-quiz' onClick={this.onEditButtonClicked}>Edit quiz</button>
                </div>
            </div>
        );
    }
}

export default QuizListItem;