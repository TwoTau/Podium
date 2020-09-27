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
        this.props.onQuizStart(this.props.name);
    }

    onEditButtonClicked = () => {
        this.props.onQuizEdit(this.props.name);
    }

    render() {
        return (
            <div className="quiz-list-item information-text">
                <div>
                    <h2>{this.props.name}</h2>
                    <h3>Last modified on {this.props.date}</h3>
                    <button className='start-quiz' onClick={this.onStartButtonClicked}>Start quiz</button>
                    <button className='edit-quiz' onClick={this.onEditButtonClicked}>Edit quiz</button>
                </div>
            </div>
        );
    }
}

export default QuizListItem;