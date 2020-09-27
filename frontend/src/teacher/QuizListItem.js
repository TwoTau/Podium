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

    render() {
        return (
            <div className="quiz-list-item information-text">
                <div>
                    <h2>{this.props.prompt}</h2>
                    <h3>{this.props.answers}</h3>
                    <button className='start-quiz' onClick={this.onQuizStart}>Start quiz</button>
                    <button className='edit-quiz' onClick={this.onQuizEdit}>Edit quiz</button>
                </div>
            </div>
        );
    }
}

export default QuizListItem;